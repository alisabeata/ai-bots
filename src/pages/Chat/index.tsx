import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChatComponent } from 'src/components/ChatComponent'
import classes from './index.module.css'

export const Chat = () => {
  const [loading, setIsLoading] = useState(false)
  const params = useParams()
  const id = params.id

  useEffect(() => {
    document.body.classList.add('dark-mode')

    return () => {
      document.body.classList.remove('dark-mode')
    }
  }, [])

  return (
    <div className={classes['chat-content']}>
      <ChatComponent />
    </div>
  )
}
