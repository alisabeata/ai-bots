import { useEffect } from 'react'
import { Message } from '../Message'
import { useChat } from 'src/context/MessageContext'
import classes from './index.module.css'
import img2 from 'src/images/img2.png'
import type { MessageType } from 'src/context/MessageContext'

const initMessage: MessageType = {
  id: Date.now(),
  text: 'Hey, cuttie! What’s on your mind?',
  sender: img2,
  type: 'text',
}

let isSent: boolean = false

export const Conversation: React.FC = () => {
  const { state, addMessage } = useChat()

  useEffect(() => {
    if (!isSent) {
      addMessage(initMessage)
      isSent = true
    }
  }, [addMessage])

  let conversationClasses = classes.conversation

  if (state.messages.length > 1) {
    conversationClasses += ` ${classes['conversation__offset']}`
  }

  return (
    <div className={conversationClasses}>
      {(state.messages as MessageType[]).map((message) => (
        <Message key={message.id} sender={message.sender} type={message.type}>
          <div dangerouslySetInnerHTML={{ __html: message.text }} />
        </Message>
      ))}
    </div>
  )
}
