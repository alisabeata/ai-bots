import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'

export interface PersonaType {
  id: string
  name: string
  descr: string
  image: string
}

interface PersonasContextType {
  charactersData: PersonaType[]
  isLoading: boolean
}

const initialContext: PersonasContextType = {
  charactersData: [],
  isLoading: false,
}

// Create Context
const PersonasContext = createContext<PersonasContextType>(initialContext)

interface PersonasProviderProps {
  children: ReactNode
}

// Create Provider
const PersonasProvider: React.FC<PersonasProviderProps> = ({ children }) => {
  const [charactersData, setCharactersData] = useState<PersonaType[]>(
    initialContext.charactersData,
  )
  const [isLoading, setIsLoading] = useState<boolean>(initialContext.isLoading)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const cachedData = localStorage.getItem('charactersData')
        if (cachedData) {
          setCharactersData(JSON.parse(cachedData))

          setIsLoading(false)
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT as string}/personas`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_KEY as string}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch personas')
        }

        const data = await response.json()

        // Check if the data has changed
        const isDataChanged = JSON.stringify(data.personas) !== cachedData
        if (isDataChanged) {
          setCharactersData(data.personas)
          localStorage.setItem('charactersData', JSON.stringify(data.personas))
        }
      } catch (error) {
        console.log('Error: ', error)
      }
      setIsLoading(false)
    }

    loadData()

    // Update data every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <PersonasContext.Provider value={{ charactersData, isLoading }}>
      {children}
    </PersonasContext.Provider>
  )
}

// Custom hook for consuming the context
const usePersonas = () => useContext(PersonasContext)

export { usePersonas, PersonasProvider }
