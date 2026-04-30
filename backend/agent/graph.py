from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from typing import TypedDict, Annotated, List
import operator
import os
from dotenv import load_dotenv
from agent.tools import ALL_TOOLS, set_db_session

load_dotenv()

class AgentState(TypedDict):
    messages: Annotated[List, operator.add]

SYSTEM_PROMPT = """You are an AI assistant for a pharmaceutical CRM system helping field sales representatives manage their Healthcare Professional (HCP) interactions.

You have access to these tools:
1. log_interaction - Save a new interaction with a doctor
2. edit_interaction - Update an existing interaction
3. search_hcp_interactions - Find past interactions with a doctor
4. get_follow_up_tasks - Get pending follow-up tasks
5. generate_interaction_summary - Create professional summaries from raw notes

When a user describes a meeting or interaction, extract all relevant details and use log_interaction to save it.
Always be helpful, professional, and concise. When logging interactions, confirm what was saved."""

def create_agent(db_session=None):
    if db_session:
        set_db_session(db_session)
    
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY"),
        temperature=0.1
    )
    
    llm_with_tools = llm.bind_tools(ALL_TOOLS)
    
    def agent_node(state: AgentState):
        messages = state["messages"]
        if not any(isinstance(m, SystemMessage) for m in messages):
            messages = [SystemMessage(content=SYSTEM_PROMPT)] + messages
        
        response = llm_with_tools.invoke(messages)
        return {"messages": [response]}
    
    tool_node = ToolNode(ALL_TOOLS)
    
    def should_continue(state: AgentState):
        last_message = state["messages"][-1]
        if hasattr(last_message, "tool_calls") and last_message.tool_calls:
            return "tools"
        return END
    
    graph = StateGraph(AgentState)
    graph.add_node("agent", agent_node)
    graph.add_node("tools", tool_node)
    
    graph.set_entry_point("agent")
    graph.add_conditional_edges("agent", should_continue)
    graph.add_edge("tools", "agent")
    
    return graph.compile()