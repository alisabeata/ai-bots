import { useEffect, useState } from 'react'
import { Message } from '../Message'
import { useChat } from 'src/context/MessageContext'
import classes from './index.module.css'
import img2 from 'src/images/img2.png'
import type { MessageType } from 'src/context/MessageContext'

const initMessage: MessageType = {
  id: Date.now(),
  text: 'Hey, cuttie! What’s on your mind?',
  sender: img2,
}

let isSent: boolean = false

export const Conversation = () => {
  const { state, addMessage } = useChat()

  useEffect(() => {
    if (!isSent) {
      addMessage(initMessage)
      isSent = true
    }
  }, [addMessage])

  return (
    <div className={classes.conversation}>
      {(state.messages as MessageType[]).map((message) => (
        <Message key={message.id} sender={message.sender}>
          {message.text}
        </Message>
      ))}
    </div>
  )
}
