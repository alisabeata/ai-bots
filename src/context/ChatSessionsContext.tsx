import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from 'react'

interface ChatSession {
  access_key: string
  name: string
}

type botType = {
  id: string
  name: string
}

interface ContextType {
  chatSessions: ChatSession[]
  isLoading: boolean
  initSession: () => void
  bot: botType
}

// Create Context
const ChatSessionsContext = createContext<ContextType>({
  chatSessions: [],
  isLoading: false,
  initSession: () => {},
  bot: { id: '', name: '' },
})

interface ChatSessionsProviderProps {
  children: ReactNode
  bot: botType
}

// Create Provider
const ChatSessionsProvider = ({ children, bot }: ChatSessionsProviderProps) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { id } = bot

  useEffect(() => {
    // Load Sessions
    const loadData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/personas/${id}/chat_sessions`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch chat sessions')
        }

        const data: { chat_sessions: ChatSession[] } = await response.json()
        setChatSessions(data.chat_sessions)
      } catch (error) {
        console.log('Error: ', error)
        setChatSessions([])
      }
      setIsLoading(false)
    }

    loadData()
  }, [id])

  // Init Session
  const initSession = useCallback(async () => {
    setIsLoading(true)
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

      const data: { chat_sessions: ChatSession[] } = await response.json()
      setChatSessions(data.chat_sessions)
    } catch (error) {
      console.log('Error: ', error)
      setChatSessions([])
    }
    setIsLoading(false)
  }, [id])

  return (
    <ChatSessionsContext.Provider
      value={{ chatSessions, isLoading, initSession, bot }}
    >
      {children}
    </ChatSessionsContext.Provider>
  )
}

// Custom hook for consuming the context
const useChatSessions = () => useContext(ChatSessionsContext)

export { useChatSessions, ChatSessionsProvider }
