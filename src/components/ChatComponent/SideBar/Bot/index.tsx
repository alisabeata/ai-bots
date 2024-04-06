import { Button } from 'src/components/Utils/Button'
import { Select } from 'src/components/Utils/Select'
import img2 from 'src/images/img2.png'
import { ReactComponent as PlusIcon } from 'src/images/svg/plus.svg'
import classes from './index.module.css'

export const Bot = () => {
  return (
    <div className={classes.bot}>
      <div className={classes.card}>
        <div className={classes.identity}>
          <img src={img2} alt="" />
          <div className={classes['card_descr']}>
            <h2>Monique</h2>
            <p>Some text here...</p>
          </div>
        </div>
        <Select items={['Item 1', 'Item 2', 'Item 3']} />
      </div>

      <Button whiteBorder fullSize style={{ marginBottom: '10px' }}>
        share Monique
      </Button>

      <Button white fullSize>
        <PlusIcon /> new chat
      </Button>
    </div>
  )
}
