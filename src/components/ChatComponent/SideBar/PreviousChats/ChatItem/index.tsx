import classes from './index.module.css'
import { ReactComponent as MoreIcon } from './../../../../../images/svg/more.svg'

export const ChatItem = () => {
  return (
    <li>
      <div className={classes['chat-item']}>
        <a href="/">Some text long long text of the chat here</a>
        <div className={classes['chat-item_hover']}>
          <span className={classes['chat-item_show-popup']} title='More'>
            <MoreIcon />
          </span>
        </div>
      </div>
    </li>
  )
}
