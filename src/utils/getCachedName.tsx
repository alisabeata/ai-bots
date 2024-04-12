import { PersonaType } from 'src/context/PersonasContext'

export const getCachedName = (id: number | string = ''): string => {
  const cachedData = localStorage.getItem('charactersData')
  
  if (cachedData && id) {
    const parsedData: PersonaType[] = JSON.parse(cachedData)
    const persona = parsedData.find((item) => String(item.id) === String(id))
    return persona ? persona.name : ''
  } else {
    return ''
  }
}
