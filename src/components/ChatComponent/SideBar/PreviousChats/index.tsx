import { ChatItem } from './ChatItem'
import classes from './index.module.css'

export const PreviousChats = () => {
  return (
    <div className={classes['previous-chats']}>
      <div className={classes['previous-chats_section']}>
        <h5 className={classes['previous-chats_title']}>Today</h5>
        <ol className={classes['previous-chats_list']}>
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </ol>
      </div>
    </div>
  )
}
