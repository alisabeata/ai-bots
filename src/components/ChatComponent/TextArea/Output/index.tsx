import React, { useEffect, useRef } from 'react'
import { useDialog } from 'src/context/DialogContext'
import { Dialog } from './Dialog'
import classes from './index.module.css'

export const Output: React.FC = () => {
  const { state } = useDialog()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Scroll to bottom
  useEffect(() => {
    scrollToBottom()
  }, [])

  // Type text
  useEffect(() => {
    const id = setTimeout(() => {
      scrollToBottom()
    }, 100)

    return () => {
      clearTimeout(id)
    }
  }, [state.messages])

  return (
    <div className={classes.output}>
      <div className={classes['output-scroll']}>
        <Dialog />
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
