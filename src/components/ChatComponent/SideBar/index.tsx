import { Bot } from './Bot'
import { PreviousChats } from './PreviousChats'
import classes from './index.module.css'

export const SideBar = () => {
  return (
    <div className={classes['side-bar']}>
      <Bot />
      <PreviousChats />
    </div>
  )
}
