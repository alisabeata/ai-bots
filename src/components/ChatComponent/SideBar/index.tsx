import { Navigation } from 'src/components/Navigation'
import { Bot } from './Bot'
import { PreviousChats } from './PreviousChats'
import classes from './index.module.css'

interface SideBarProps {
  isOpen: boolean
  onClose: () => void
}

export const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  let sideBarClasses = classes['side-bar']

  if (isOpen) {
    sideBarClasses += ` ${classes['side-bar__open']}`
  }

  return (
    <>
      <div className={sideBarClasses}>
        <Bot onClose={onClose} />
        <PreviousChats />
        <Navigation className={classes['side-bar_navigation']} />
      </div>
      <div className={classes['side-bar_background']} onClick={onClose}></div>
    </>
  )
}
