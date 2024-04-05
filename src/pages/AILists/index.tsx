import { useEffect, useState } from 'react'
import classes from './index.module.css'
import { AIList } from '../../components/AIList'
import { MOCK_CHARACTERS } from '../../components/Mocks'
import { MOCK_BOTS } from '../../components/Mocks'
import { ItemsProps } from '../../components/AIList'

export const AILists = () => {
  const [charactersData, setCharactersData] = useState<ItemsProps[]>([])
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT as string}/personas`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_KEY as string}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data = await response.json()

        setCharactersData(data.personas)
      } catch (error) {
        console.log('Error: ', error)

        // TODO: delete later, only for demo if there the CORS error
        setCharactersData(MOCK_CHARACTERS)
      }
      setIsLoading(false)
    }

    loadData()
  }, [])

  return (
    <main className={classes.content}>
      <AIList
        title={'Iris Characters'}
        descr={'AIs created by Iris team'}
        items={charactersData}
        isLoading={loading}
      />

      <AIList
        title={'Purpose Bots'}
        descr={'AIs created to achieve your goals'}
        items={MOCK_BOTS}
      />
    </main>
  )
}
