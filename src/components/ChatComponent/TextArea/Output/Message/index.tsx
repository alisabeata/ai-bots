import React from 'react'
import img2 from './../../../../../images/img2.png'
import classes from './index.module.css'

interface MessageProps {
  children: React.ReactNode
}

export const Message: React.FC<MessageProps> = ({ children }) => {
  return (
    <div className={classes.message}>
      <div className={classes['message-logo']}>
        <img src={img2} alt="" />
      </div>
      <div className={classes['message-text']}>{children}</div>
    </div>
  )
}
