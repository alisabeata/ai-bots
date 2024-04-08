import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ChatProvider } from 'src/context/MessageContext'
import { ChatSessionsProvider } from 'src/context/ChatSessionsContext'
import { Navigation } from 'src/components/Navigation'
import { ChatComponent } from 'src/components/ChatComponent'
import classes from './index.module.css'

export const Chat = () => {
  const params = useParams()
  const location = useLocation()
  const id = params.id
  const name = decodeURIComponent(location.hash).slice(1)

  useEffect(() => {
    document.body.classList.add('chat', 'dark-mode')

    return () => {
      document.body.classList.remove('chat', 'dark-mode')
    }
  }, [])

  if (!id || !name) {
    return null
  }

  return (
    <ChatSessionsProvider bot={{ id, name }}>
      <ChatProvider>
        <Navigation hideOnMobile />
        <main className={classes['chat-content']}>
          <ChatComponent />
        </main>
      </ChatProvider>
    </ChatSessionsProvider>
  )
}
