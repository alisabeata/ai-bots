import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from 'react'

// Types
export type TypeMessageType = 'text' | 'file' | 'audio' | 'video'

export type MessageType = {
  id: number
  text: string
  sender: string
  type: TypeMessageType
}

type StateType = {
  messages: MessageType[]
}

type ActionType = { type: 'ADD_MESSAGE'; payload: MessageType }

type InitStateType = {
  state: StateType
  addMessage: (
    message: MessageType,
    access_key?: string,
    callback?: () => void,
  ) => void
}

// Initial State
const initialState: StateType = {
  messages: [],
}

// Reducer
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    default:
      return state
  }
}

// Create Context
const ChatContext = createContext<InitStateType>({
  state: initialState,
  addMessage: () => {},
})

// Provider Component
const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Memoize addMessage function
  const addMessage = useCallback(
    async (
      message: MessageType,
      access_key?: string,
      callback?: () => void,
    ) => {
      try {
        // Async POST request to the backend
        const response = await fetch(`/chat_sessions/${access_key}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        })
        if (!response.ok) {
          throw new Error('Failed to add message')
        }
        const data = await response.json()
        // Dispatch action after successful addition
        dispatch({ type: 'ADD_MESSAGE', payload: data.message })
        if (callback) {
          callback()
        }
      } catch (error) {
        console.error('Error adding message')
      }
    },
    [],
  )

  // Memoize context value
  const contextValue = useMemo(
    () => ({ state, addMessage }),
    [state, addMessage],
  )

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
}

// Custom hook for consuming the context
const useChat = () => useContext(ChatContext)

export { ChatProvider, useChat }
