import { Dialog } from './Dialog'
import classes from './index.module.css'

export const Output: React.FC = () => {
  return (
    <div className={classes.output}>
      <div className={classes['output-scroll']}>
        <Dialog />
      </div>
    </div>
  )
}
