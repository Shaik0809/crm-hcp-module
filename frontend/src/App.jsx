import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Navbar from './components/Navbar'
import LogInteractionScreen from './components/LogInteractionScreen'
import InteractionList from './components/InteractionList'

function App() {
  const [currentPage, setCurrentPage] = useState('log')

  return (
    <Provider store={store}>
      <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh',
                    backgroundColor: '#f0f4f8' }}>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
          {currentPage === 'log' && <LogInteractionScreen />}
          {currentPage === 'history' && <InteractionList />}
        </div>
      </div>
    </Provider>
  )
}

export default App