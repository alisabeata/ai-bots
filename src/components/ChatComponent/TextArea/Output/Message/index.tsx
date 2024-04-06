import React, { useEffect, useRef } from 'react'
import classes from './index.module.css'
import { ReactComponent as FileIcon } from 'src/images/svg/file.svg'

import type { TypeMessageType } from 'src/context/MessageContext'

interface MessageProps {
  children: React.ReactNode
  sender: string
  type: TypeMessageType
}

export const Message: React.FC<MessageProps> = ({ children, sender, type }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <div className={classes.message}>
      <div className={classes['message-logo']}>
        <img src={sender} alt="" />
      </div>
      {type === 'file' && (
        <div
          className={`${classes['message-text']} ${classes['message-text__file']}`}
        >
          <span className={classes['message-text__file-content']}>
            <FileIcon />
            <span>{children}</span>
          </span>
        </div>
      )}
      {type === 'text' && (
        <div className={classes['message-text']}>{children}</div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
