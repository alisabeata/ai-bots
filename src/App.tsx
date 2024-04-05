import { Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { AILists } from './pages/AILists'
import { Chat } from './pages/Chat'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="*" element={<AILists />} />
      </Routes>
    </>
  )
}

export default App
