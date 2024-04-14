import { Button } from 'src/components/Utils/Button'
import { useURL } from 'src/hooks/useURL'
import { useDialog } from 'src/context/DialogContext'
import { SelectChat } from 'src/components/Utils/SelectChat'
import { getCachedName } from 'src/utils/getCachedName'
import img2 from 'src/images/img2.png'
import { ReactComponent as PlusIcon } from 'src/images/svg/plus.svg'
import { ReactComponent as CloseIcon } from 'src/images/svg/close.svg'
import { ReactComponent as LogoIcon } from 'src/images/svg/logo.svg'
import classes from './index.module.css'
import { SocialShare } from 'src/components/Utils/SocialShare'
import { useState } from 'react'

interface BotProps {
  onClose: () => void
}

export const Bot: React.FC<BotProps> = ({ onClose }) => {
  const { name, id } = useURL()
  const { addNewChat } = useDialog()
  const botName = name ? name : getCachedName(id)
  const [shownSharePopup, setIsShownSharePopup] = useState(false)

  const handleShowSharePopup = () => {
    setIsShownSharePopup(true)
  }

  const handleCloseSharePopup = () => {
    setIsShownSharePopup(false)
  }

  const handleNewChat = () => {
    addNewChat()
  }

  return (
    <div className={classes.bot}>
      <div className={classes.card}>
        <a href="/" className={classes.logo}>
          <LogoIcon />
        </a>
        <div className={classes.identity}>
          <img src={img2} alt="" />
          <div className={classes['card_descr']}>
            <h2>{botName}</h2>
            <p>Some text here...</p>
          </div>
        </div>
        <div className={classes['card_select']}>
          <SelectChat />
        </div>
        <button className={classes['card_close']} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <Button
        whiteBorder
        fullSize
        className={classes['share-chat']}
        onClick={handleShowSharePopup}
      >
        share {botName && botName.length < 11 ? botName : 'chat'}
      </Button>

      {shownSharePopup && <SocialShare onClose={handleCloseSharePopup} />}

      <Button
        white
        fullSize
        className={classes['new-chat']}
        onClick={handleNewChat}
      >
        <PlusIcon /> new chat
      </Button>
    </div>
  )
}
