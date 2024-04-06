import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react'
import { useChat } from 'src/context/MessageContext'
import { ReactComponent as SendIcon } from 'src/images/svg/arrow-send.svg'
import { ReactComponent as AudioIcon } from 'src/images/svg/mic.svg'
import { ReactComponent as VideoIcon } from 'src/images/svg/camera.svg'
import { ReactComponent as FileIcon } from 'src/images/svg/file.svg'
import imgAvatar from 'src/images/ghost-avatar.png'
import classes from './index.module.css'
import type { MessageType } from 'src/context/MessageContext'

interface PromptProps {}

export const Prompt: React.FC<PromptProps> = () => {
  const { addMessage } = useChat()
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const sendMessage = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const newMessage: MessageType = {
        id: Date.now(),
        text: message,
        sender: imgAvatar,
      }

      addMessage(newMessage)
      setMessage('')
    },
    [addMessage, message],
  )

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setSelectedFile(event.target.files[0])
        // add file
        setMessage(event.target.files[0].name)
      }
    },
    [],
  )

  const handleTextType = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }, [])

  return (
    <form className={classes.prompt} onSubmit={sendMessage}>
      <button className={classes['prompt-audio-button']}>
        <AudioIcon />
      </button>
      <div className={classes['prompt-input']}>
        <label htmlFor="fileInput" className={classes['prompt-input_file']}>
          <input type="file" id="fileInput" onChange={handleFileChange} />
          <FileIcon />
        </label>
        <input
          type="text"
          placeholder="Type or speak anything.."
          className={classes['prompt-input_text']}
          onChange={handleTextType}
          value={message}
        />
      </div>
      <button className={classes['prompt-submit']} type="submit">
        <SendIcon />
      </button>
      <button className={classes['prompt-video-button']}>
        <VideoIcon />
      </button>
    </form>
  )
}
