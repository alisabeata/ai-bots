import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'

interface ChatSession {
  access_key: string
  name: string
}

interface ContextType {
  chatSessions: ChatSession[]
  isLoading: boolean
}

// Create Context
const ChatSessionsContext = createContext<ContextType>({
  chatSessions: [],
  isLoading: false,
})

interface ChatSessionsProviderProps {
  children: ReactNode
  id: string
}

// Create Provider
const ChatSessionsProvider = ({ children, id }: ChatSessionsProviderProps) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

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

  return (
    <ChatSessionsContext.Provider value={{ chatSessions, isLoading }}>
      {children}
    </ChatSessionsContext.Provider>
  )
}

// Custom hook for consuming the context
const useDialogSessions = () => useContext(ChatSessionsContext)

export { useDialogSessions, ChatSessionsProvider }
