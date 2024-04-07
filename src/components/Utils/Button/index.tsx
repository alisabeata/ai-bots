import React, { ReactNode, CSSProperties } from 'react'
import classes from './index.module.css'

interface ButtonProps {
  children: ReactNode | string
  onClick?: () => void
  white?: boolean
  whiteBorder?: boolean
  fullSize?: boolean
  style?: CSSProperties
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  white,
  whiteBorder,
  fullSize,
  style,
  className,
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

  if (className) {
    buttonClasses += ` ${className}`
  }

  return (
    <button className={buttonClasses} onClick={onClick} style={style}>
      {children}
    </button>
  )
}
