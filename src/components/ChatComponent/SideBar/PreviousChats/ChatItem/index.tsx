import classes from './index.module.css'
import { ReactComponent as MoreIcon } from 'src/images/svg/more.svg'

export const ChatItem = () => {
  return (
    <li>
      <div className={classes['chat-item']}>
        <span>Some text long long text of the chat here</span>
        <div className={classes['chat-item_hover']}>
          <span className={classes['chat-item_show-popup']} title='More'>
            <MoreIcon />
          </span>
        </div>
      </div>
    </li>
  )
}
