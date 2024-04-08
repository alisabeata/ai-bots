import React, { ReactNode } from 'react'
import classes from './index.module.css'
import { ReactComponent as MoreIcon } from 'src/images/svg/more.svg'

interface ChatItemProps {
  children: ReactNode
}

export const ChatItem: React.FC<ChatItemProps> = ({ children }) => {
  return (
    <li>
      <div className={classes['chat-item']}>
        <span>{children}</span>
        <div className={classes['chat-item_hover']}>
          <span className={classes['chat-item_show-popup']} title="More">
            <MoreIcon />
          </span>
        </div>
      </div>
    </li>
  )
}
