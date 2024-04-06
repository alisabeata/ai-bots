import { useEffect, useRef, useCallback } from 'react'
import { Conversation } from './Conversation'
import classes from './index.module.css'

interface OutputProps {}

export const Output: React.FC<OutputProps> = () => {
  return (
    <div className={classes.output}>
      <div className={classes['output-scroll']}>
        <Conversation />
      </div>
    </div>
  )
}
