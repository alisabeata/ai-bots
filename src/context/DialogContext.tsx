import React, {
  createContext,
  useCallback,
  useReducer,
  useState,
  useContext,
  ReactNode,
} from 'react'
import img2 from 'src/images/img2.png'
import { readStream } from 'src/utils/readStream'

// TODO: change to the actual data
export const initMessage: MessageType = {
  id: Date.now(),
  text: 'Hey, cuttie! What’s on your mind?',
  sender: img2,
  type: 'text',
}

// Types
export type TypeMessageType = 'text' | 'file' | 'audio' | 'video'

export type MessageType = {
  id: number
  text: string
  sender: string
  type: TypeMessageType
}

type State = {
  messages: MessageType[]
}

type Action = {
  type: 'ADD_MESSAGE' | 'ADD_STREAM_MESSAGE' | 'ADD_CLOSE_MESSAGE'
  payload: MessageType | string
}

const initialState: State = {
  messages: [],
}

// Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload as MessageType],
      }
    case 'ADD_STREAM_MESSAGE':
      // Check if there are any messages in the array
      if (state.messages.length === 0) {
        return state // No messages to update
      }

      // Create a copy of the messages array
      const updatedMessages: MessageType[] = [...state.messages]

      // Create a copy of the last message object
      const lastMessageIndex = updatedMessages.length - 1

      const updatedLastMessage = {
        ...updatedMessages[lastMessageIndex],
        text: updatedMessages[lastMessageIndex].text + action.payload,
      }

      // Replace the last message in the copied array with the updated one
      updatedMessages[lastMessageIndex] = updatedLastMessage

      return {
        ...state,
        messages: updatedMessages,
      }
    case 'ADD_CLOSE_MESSAGE':
      // Check if there are any messages in the array
      if (state.messages.length === 0) {
        return state // No messages to update
      }

      // Create a copy of the messages array
      const closeMessages: MessageType[] = [...state.messages]

      // Create a copy of the last message object
      const lastCloseMessageIndex = closeMessages.length - 1

      const newCloseMessage: MessageType = {
        ...closeMessages[lastCloseMessageIndex],
        text: action.payload as string,
      }

      // Replace the last message in the copied array with the new close message
      closeMessages[lastCloseMessageIndex] = newCloseMessage

      return {
        ...state,
        messages: closeMessages,
      }
    default:
      return state
  }
}

type sessionBotType = { access_key: string; name: string }

interface DialogContextType {
  state: State
  addMessage: (message: MessageType, access_key: string) => void
  showBotMessage: (message: string, type: string) => void
  initSession: (message: MessageType) => Promise<void>
  sessionBot: sessionBotType
}

const initSessionBot = { access_key: '', name: '' }

const initDialogContext = {
  state: initialState,
  addMessage: (message: MessageType) => {},
  showBotMessage: (message: string, type: string) => {},
  initSession: async (message: MessageType) => {},
  sessionBot: initSessionBot,
}

// Create Context
export const DialogContext = createContext<DialogContextType>(initDialogContext)

type DialogProviderProps = {
  children: ReactNode
  id: string
}

const DialogProvider = ({ children, id }: DialogProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [sessionBot, setSessionBot] = useState(initSessionBot)

  const showBotMessage = useCallback(
    (message: string, type: 'open' | 'close' | 'stream' | any) => {
      if (type === 'open') {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: { ...initMessage, text: message },
        })
      }
      if (type === 'stream') {
        dispatch({ type: 'ADD_STREAM_MESSAGE', payload: message })
      }

      if (type === 'close') {
        dispatch({ type: 'ADD_CLOSE_MESSAGE', payload: message })
      }
    },
    [],
  )

  const addMessage = useCallback(
    async (message: MessageType, access_key: string) => {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: message,
      })

      try {
        // Async POST request to the backend
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/chat_sessions/${access_key}/messages`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
            body: JSON.stringify({ message: message.text[0] }),
          },
        )

        if (!response.ok) {
          throw new Error('Failed to add message')
        }

        if (!response.body) {
          throw new Error('ReadableStream not supported')
        }

        showBotMessage('', 'open')

        // Read Stream
        try {
          let lastElement = ''
          // Iterate over the async generator
          for await (let text of readStream(response)) {
            showBotMessage(text, 'stream')
            lastElement = text
          }

          if (lastElement) {
            showBotMessage(lastElement, 'close')
          }
        } catch (error) {
          console.error('Error consuming stream:', error)
        }
      } catch (error) {
        console.error('Error adding message:', error)
      }
    },
    [showBotMessage],
  )

  // Init Session
  const initSession = useCallback(
    async (message: MessageType) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/personas/${id}/chat_sessions`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('Failed to send a new chat session')
        }

        const data = await response.json()
        setSessionBot(data.chat_session)

        // send message
        addMessage(message, data.chat_session.access_key)
      } catch (error) {
        console.log('Error: ', error)
        setSessionBot(initSessionBot)
      }
    },
    [addMessage, id],
  )

  return (
    <DialogContext.Provider
      value={{ state, addMessage, showBotMessage, initSession, sessionBot }}
    >
      {children}
    </DialogContext.Provider>
  )
}

// Custom hook for consuming the context
const useDialog = () => useContext(DialogContext)

export { useDialog, DialogProvider }
