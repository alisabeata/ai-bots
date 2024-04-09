import { Message } from '../Message'
import { useDialog } from 'src/context/DialogContext'
import classes from './index.module.css'
import type { MessageType } from 'src/context/DialogContext'

export const Dialog: React.FC = () => {
  const { state } = useDialog()
  const messages: MessageType[] = state.messages

  let dialogClasses = classes.dialog

  if (messages.length > 1) {
    dialogClasses += ` ${classes['dialog__offset']}`
  }

  return (
    <div className={dialogClasses} data-testid="dialog">
      {messages.map((message: MessageType, id) => (
        <Message key={id} {...message} />
      ))}
    </div>
  )
}
