import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import { ReactComponent as FileIcon } from 'src/images/svg/file.svg'
import type { MessageType } from 'src/context/DialogContext'

export const Message: React.FC<MessageType> = ({ sender, type, text }) => {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setShowText(true)
    }, 500)

    return () => {
      clearTimeout(id)
    }
  }, [])

  let messageClasses = classes.message

  if ((!showText && sender.type === 'bot') || text.length === 0) {
    messageClasses += ` ${classes['message_typing']}`
  }

  return (
    <div className={messageClasses}>
      <div className={classes['message-logo']}>
        <img src={sender.url} alt="" />
      </div>
      {type === 'file' && (
        <div
          className={`${classes['message-text']} ${classes['message-text__file']}`}
        >
          <span className={classes['message-text__file-content']}>
            <FileIcon />
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </span>
        </div>
      )}
      {type === 'text' && (
        <div className={classes['message-text']}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      )}
    </div>
  )
}
