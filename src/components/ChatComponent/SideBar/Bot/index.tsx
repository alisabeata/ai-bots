import { Button } from 'src/components/Utils/Button'
import { SelectChat } from 'src/components/Utils/SelectChat'
import { useChatSessions } from 'src/context/ChatSessionsContext'
import img2 from 'src/images/img2.png'
import { ReactComponent as PlusIcon } from 'src/images/svg/plus.svg'
import { ReactComponent as CloseIcon } from 'src/images/svg/close.svg'
import { ReactComponent as LogoIcon } from 'src/images/svg/logo.svg'
import classes from './index.module.css'
import { usePersonas } from 'src/context/PersonasContext'

interface BotProps {
  onClose: () => void
}

export const Bot: React.FC<BotProps> = ({ onClose }) => {
  const { bot } = useChatSessions()

  return (
    <div className={classes.bot}>
      <div className={classes.card}>
        <a href="/" className={classes.logo}>
          <LogoIcon />
        </a>
        <div className={classes.identity}>
          <img src={img2} alt="" />
          <div className={classes['card_descr']}>
            <h2>{bot.name}</h2>
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

      <Button whiteBorder fullSize className={classes['share-chat']}>
        share {bot.name.length < 11 ? bot.name : 'chat'}
      </Button>

      <Button white fullSize className={classes['new-chat']}>
        <PlusIcon /> new chat
      </Button>
    </div>
  )
}
