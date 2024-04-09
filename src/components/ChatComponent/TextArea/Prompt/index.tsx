import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { useDialog } from 'src/context/DialogContext'
import { useURL } from 'src/hooks/useURL'
import { useMic } from 'src/hooks/useMic'
import { useVideo } from 'src/hooks/useVideo'
import { ReactComponent as SendIcon } from 'src/images/svg/arrow-send.svg'
import { ReactComponent as AudioIcon } from 'src/images/svg/mic.svg'
import { ReactComponent as VideoIcon } from 'src/images/svg/camera.svg'
import { ReactComponent as FileIcon } from 'src/images/svg/file.svg'
// import { ReactComponent as PauseIcon } from 'src/images/svg/pause.svg'
import imgAvatar from 'src/images/ghost-avatar.png'
import classes from './index.module.css'
import type { MessageType, TypeMessageType } from 'src/context/DialogContext'

interface PromptProps {}

export const Prompt: React.FC<PromptProps> = () => {
  const { initSession, addMessage } = useDialog()
  const { hash } = useURL()
  const { activateMic } = useMic()
  const { activateVideo } = useVideo()
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const sendMessage = useCallback(
    (messageContent: string, type?: TypeMessageType) => {
      if (messageContent.trim().length > 0) {
        const newMessage: MessageType = {
          id: Date.now(),
          text: messageContent.trim(),
          sender: { url: imgAvatar, type: 'user' },
          type: type ? type : 'text',
        }

        if (!hash) {
          initSession(newMessage)
        } else {
          addMessage(newMessage, hash)
        }
        resetTextArea()
      }
    },
    [hash, addMessage, initSession],
  )

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        setSelectedFile(file)
        // add file
        setMessage(file.name)
        sendMessage(file.name, 'file')
      }
    },
    [sendMessage],
  )

  const handleTextType = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value)

      if (event.target.value === '') {
        resetTextArea()
      }
    },
    [],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage(message)
    }
  }

  const autoResize = () => {
    const textarea = textareaRef.current!

    // Changing the height of the textarea field when sending text messages
    textarea.style.height = '50px'
    if (textarea.scrollHeight >= 50) {
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const resetTextArea = () => {
    // Reset textarea height after sending form
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px'
    }
    setMessage('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(message)
  }

  const handleMicActivation = () => {
    activateMic()
  }

  const handleVideoActivation = () => {
    activateVideo()
  }

  useEffect(() => {
    autoResize()
  }, [])

  return (
    <form
      className={classes.prompt}
      onSubmit={handleSubmit}
      ref={formRef}
      aria-label="form"
    >
      <button
        className={classes['prompt-audio-button']}
        aria-label="audio-button"
        onClick={handleMicActivation}
      >
        <AudioIcon />
      </button>
      <div className={classes['prompt-input']}>
        <label htmlFor="fileInput" className={classes['prompt-input_file']}>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            aria-label="file-input"
          />
          <FileIcon />
        </label>
        <textarea
          ref={textareaRef}
          placeholder="Type or speak anything.."
          className={classes['prompt-input_text']}
          onChange={handleTextType}
          onKeyDown={(event) => {
            autoResize()
            handleKeyDown(event)
          }}
          value={message}
          aria-label="message-textarea"
        />
      </div>
      <button
        className={classes['prompt-submit']}
        type="submit"
        aria-label="submit-button"
      >
        <SendIcon />
      </button>
      <button
        className={classes['prompt-video-button']}
        aria-label="video-button"
        onClick={handleVideoActivation}
      >
        <VideoIcon />
      </button>
      {/* <button
        className={classes['prompt-stop-reading-stream']}
        onClick={handleStopReadingStream}
      >
        <PauseIcon />
      </button> */}
    </form>
  )
}
