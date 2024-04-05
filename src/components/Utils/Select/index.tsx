import React, { useState } from 'react'
import { ReactComponent as ArrowIcon } from './../../../images/svg/arrow.svg'
import classes from './index.module.css'

interface SelectProps {
  items: string[]
  callback?: (p: string) => void
}

export const Select: React.FC<SelectProps> = ({ items, callback }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Select an option')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectOption = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)

    if (callback) {
      callback(selectedOption)
    }
  }

  let openIconClasses = classes['select-selected']

  if (isOpen) {
    openIconClasses += ` ${classes['open']}`
  }

  return (
    <div className={classes['custom-select']}>
      <div className={openIconClasses} onClick={toggleDropdown}>
        {/* selectedOption */}
        <div className={classes['select-icon']}>
          <ArrowIcon />
        </div>
      </div>
      {isOpen && (
        <ul className={classes['select-items']}>
          {items.map((option, index) => (
            <li
              key={index}
              className={classes['select-item']}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
