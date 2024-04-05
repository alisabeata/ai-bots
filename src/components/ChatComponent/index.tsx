import { SideBar } from './SideBar'
import { TextArea } from './TextArea'
import classes from './index.module.css'

export const ChatComponent = () => {
  return (
    <div className={classes['chat-component']}>
      <SideBar />
      <TextArea />
    </div>
  )
}
