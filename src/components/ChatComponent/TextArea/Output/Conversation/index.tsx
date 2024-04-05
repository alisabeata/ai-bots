import { Message } from '../Message'
import classes from './index.module.css'

export const Conversation = () => {
  return (
    <div className={classes.conversation}>
      <Message>Some text</Message>
      <Message>Some text</Message>
    </div>
  )
}
