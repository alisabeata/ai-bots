import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as ArrowIcon } from 'src/images/svg/arrow.svg'
import classes from './index.module.css'

interface SelectProps {
  items: string[]
  callback?: (p: string) => void
}

export const Select: React.FC<SelectProps> = ({ items, callback }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Select an option')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // close the dropdown when clicking anywhere on the screen except within the dropdown area
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectOption = (option: string) => {
    setSelectedOption(option)
    //setIsOpen(false)

    if (callback) {
      callback(option)
    }
  }

  let openIconClasses = classes['select-selected']
  let selectItemsClasses = classes['select-items']

  if (isOpen) {
    openIconClasses += ` ${classes['select-selected__open']}`
    selectItemsClasses += ` ${classes['select-items__open']}`
  }

  return (
    <div className={classes['custom-select']} ref={dropdownRef}>
      <div className={openIconClasses} onClick={toggleDropdown}>
        {/* selectedOption */}
        <div className={classes['select-icon']}>
          <ArrowIcon />
        </div>
      </div>

      <ul className={selectItemsClasses}>
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
    </div>
  )
}
