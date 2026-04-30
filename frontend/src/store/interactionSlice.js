import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:8000/api'

export const fetchInteractions = createAsyncThunk(
  'interactions/fetchAll',
  async () => {
    const res = await axios.get(`${API}/interactions/`)
    return res.data
  }
)

export const createInteraction = createAsyncThunk(
  'interactions/create',
  async (data) => {
    const res = await axios.post(`${API}/interactions/`, data)
    return res.data
  }
)

export const updateInteraction = createAsyncThunk(
  'interactions/update',
  async ({ id, data }) => {
    const res = await axios.put(`${API}/interactions/${id}`, data)
    return res.data
  }
)

export const chatWithAgent = createAsyncThunk(
  'interactions/chat',
  async ({ message, conversation_history }) => {
    const res = await axios.post(`${API}/agent/chat`, {
      message,
      conversation_history
    })
    return res.data
  }
)

const interactionSlice = createSlice({
  name: 'interactions',
  initialState: {
    list: [],
    loading: false,
    error: null,
    chatMessages: [],
    chatLoading: false,
    activeTab: 'form'
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload)
    },
    clearChat: (state) => {
      state.chatMessages = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInteractions.pending, (state) => { state.loading = true })
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(createInteraction.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
      .addCase(chatWithAgent.pending, (state) => { state.chatLoading = true })
      .addCase(chatWithAgent.fulfilled, (state, action) => {
        state.chatLoading = false
        state.chatMessages.push({
          role: 'assistant',
          content: action.payload.response
        })
      })
  }
})

export const { setActiveTab, addChatMessage, clearChat } = interactionSlice.actions
export default interactionSlice.reducer