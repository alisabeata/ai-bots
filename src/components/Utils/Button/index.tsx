import React, { ReactNode, CSSProperties } from 'react'
import classes from './index.module.css'

interface ButtonProps {
  children: ReactNode | string
  onClick?: () => void
  white?: boolean
  whiteBorder?: boolean
  fullSize?: boolean
  style?: CSSProperties
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  white,
  whiteBorder,
  fullSize,
  style
}) => {
  let buttonClasses = `${classes.button}`

  if (white) {
    buttonClasses += ` ${classes.white}`
  }

  if (whiteBorder) {
    buttonClasses += ` ${classes['white-border']}`
  }

  if (fullSize) {
    buttonClasses += ` ${classes['full-size']}`
  }

  return (
    <button className={buttonClasses} onClick={onClick} style={style}>
      {children}
    </button>
  )
}
