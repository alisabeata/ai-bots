import React from 'react'
import classes from './index.module.css'

interface MessageProps {
  children: React.ReactNode
  sender: string
}

export const Message: React.FC<MessageProps> = ({ children, sender }) => {
  return (
    <div className={classes.message}>
      <div className={classes['message-logo']}>
        <img src={sender} alt="" />
      </div>
      <div className={classes['message-text']}>{children}</div>
    </div>
  )
}
