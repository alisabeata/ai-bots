import classes from './index.module.css'
import { AIList } from '../AIList'
import { MOCK_CHARACTERS } from '../Mocks'
import { MOCK_BOTS } from '../Mocks'

export const Content = () => {
  return (
    <div className={classes.content}>
      <AIList
        title={'Iris Characters'}
        descr={'AIs created by Iris team'}
        items={MOCK_CHARACTERS}
      />
      <AIList
        title={'Purpose Bots'}
        descr={'AIs created to achieve your goals'}
        items={MOCK_BOTS}
      />
    </div>
  )
}
