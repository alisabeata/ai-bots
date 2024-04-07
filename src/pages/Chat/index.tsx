import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navigation } from 'src/components/Navigation'
import { ChatComponent } from 'src/components/ChatComponent'
import classes from './index.module.css'

export const Chat = () => {
  const [loading, setIsLoading] = useState(false)
  const params = useParams()
  const id = params.id

  useEffect(() => {
    document.body.classList.add('chat', 'dark-mode')

    return () => {
      document.body.classList.remove('chat', 'dark-mode')
    }
  }, [])

  return (
    <>
      <Navigation hideOnMobile />
      <main className={classes['chat-content']}>
        <ChatComponent />
      </main>
    </>
  )
}
