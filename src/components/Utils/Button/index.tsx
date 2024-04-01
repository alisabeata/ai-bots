import React, { ReactNode } from 'react'
import classes from './index.module.css'

interface ButtonProps {
  children: ReactNode | string
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  )
}
