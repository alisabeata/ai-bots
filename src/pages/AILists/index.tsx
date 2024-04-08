import { Navigation } from 'src/components/Navigation'
import { AIList } from 'src/components/AIList'
import { MOCK_BOTS } from 'src/components/Mocks'
import { usePersonas } from 'src/context/PersonasContext'
import classes from './index.module.css'

export const AILists = () => {
  const { charactersData, isLoading } = usePersonas()

  return (
    <>
      <Navigation />
      <main className={classes.content}>
        <AIList
          title={'Iris Characters'}
          descr={'AIs created by Iris team'}
          items={charactersData}
          isLoading={isLoading}
        />
        <AIList
          title={'Purpose Bots'}
          descr={'AIs created to achieve your goals'}
          items={MOCK_BOTS}
        />
      </main>
    </>
  )
}
