import { useState } from 'react'
import { SideBar } from './SideBar'
import { TextArea } from './TextArea'
import { ChatProvider } from 'src/context/MessageContext'
import { SelectChat } from 'src/components/Utils/SelectChat'
import classes from './index.module.css'
import { ReactComponent as ShowMenuIcon } from 'src/images/svg/show-menu.svg'
import { ReactComponent as EditIcon } from 'src/images/svg/edit.svg'

export const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <ChatProvider>
      <div className={classes['chat-component']}>
        <div className={classes['chat-component_nav']}>
          <button className={classes['show-menu']} onClick={handleOpen}>
            <ShowMenuIcon />
          </button>
          <SelectChat items={['Monique', 'Item 1', 'Item 2', 'Item 3']} />
          <button className={classes['new-chat']}>
            <EditIcon />
          </button>
        </div>
        <SideBar isOpen={isOpen} onClose={handleClose} />
        <TextArea />
      </div>
    </ChatProvider>
  )
}
