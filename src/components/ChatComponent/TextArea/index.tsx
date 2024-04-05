import { Output } from './Output'
import { Prompt } from './Prompt'
import classes from './index.module.css'

export const TextArea = () => {
  return (
    <div className={classes['text-area']}>
      <Output />
      <Prompt />
    </div>
  )
}
