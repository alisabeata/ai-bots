import { Conversation } from './Conversation'
import classes from './index.module.css'

export const Output = () => {
  return (
    <div className={classes.output}>
      <Conversation />
    </div>
  )
}
