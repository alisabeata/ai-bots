import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useDialog } from 'src/context/DialogContext'
import { useURL } from 'src/hooks/useURL'
import classes from './index.module.css'
import { ReactComponent as MoreIcon } from 'src/images/svg/more.svg'

interface ChatItemProps {
  children: ReactNode
  hash: string
}

export const ChatItem: React.FC<ChatItemProps> = ({ children, hash }) => {
  const { resetChat } = useDialog()
  const { pathname, search } = useURL()

  const handleClick = () => {
    resetChat()
  }

  return (
    <li>
      <div className={classes['chat-item']}>
        <Link to={`${pathname}${search}#${hash}`} onClick={handleClick}>
          {children}
        </Link>
        <div className={classes['chat-item_hover']}>
          <span className={classes['chat-item_show-popup']} title="More">
            <MoreIcon />
          </span>
        </div>
      </div>
    </li>
  )
}
