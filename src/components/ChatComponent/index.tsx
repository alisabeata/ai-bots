import { SideBar } from './SideBar'
import { TextArea } from './TextArea'
import { ChatProvider } from 'src/context/MessageContext'
import classes from './index.module.css'

export const ChatComponent = () => {
  return (
    <ChatProvider>
      <div className={classes['chat-component']}>
        <SideBar />
        <TextArea />
      </div>
    </ChatProvider>
  )
}
