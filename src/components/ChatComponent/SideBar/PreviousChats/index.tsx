import { useDialogSessions } from 'src/context/ChatSessionsContext'
import { Loading } from 'src/components/Loading'
import { ChatItem } from './ChatItem'
import classes from './index.module.css'

export const PreviousChats = () => {
  const { chatSessions, isLoading } = useDialogSessions()

  return (
    <div className={classes['previous-chats']}>
      <div className={classes['previous-chats_scroll']}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={classes['previous-chats_section']}>
            {chatSessions.length > 0 && (
              <h5 className={classes['previous-chats_title']}>Today</h5>
            )}
            <ol className={classes['previous-chats_list']}>
              {chatSessions.map((session) => (
                <ChatItem key={session.access_key}>{session.name}</ChatItem>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
