import { useEffect } from 'react'
import { DialogProvider } from 'src/context/DialogContext'
import { ChatSessionsProvider } from 'src/context/ChatSessionsContext'
import { Navigation } from 'src/components/Navigation'
import { ChatComponent } from 'src/components/ChatComponent'
import { useURL } from 'src/hooks/useURL'
import classes from './index.module.css'

export const Chat = () => {
  const { id } = useURL()

  useEffect(() => {
    document.body.classList.add('chat', 'dark-mode')

    return () => {
      document.body.classList.remove('chat', 'dark-mode')
    }
  }, [])

  if (!id) {
    return null
  }

  return (
    <ChatSessionsProvider id={id}>
      <DialogProvider id={id}>
        <Navigation hideOnMobile />
        <main className={classes['chat-content']}>
          <ChatComponent />
        </main>
      </DialogProvider>
    </ChatSessionsProvider>
  )
}
