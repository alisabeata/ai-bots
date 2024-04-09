import React from 'react'
import classes from './index.module.css'
import { ReactComponent as FileIcon } from 'src/images/svg/file.svg'
import type { MessageType } from 'src/context/DialogContext'

export const Message: React.FC<MessageType> = ({ sender, type, text }) => {
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
