import React, { CSSProperties } from 'react'
import classes from './index.module.css'
import { ReactComponent as LoadingIcon } from 'src/images/svg/loading.svg'

interface LoadingProps {
  style?: CSSProperties
}

export const Loading: React.FC<LoadingProps> = ({ style }) => {
  return (
    <div className={classes.loading} style={style}>
      <LoadingIcon />
    </div>
  )
}
