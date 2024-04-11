import { useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

export const useURL = () => {
  const params = useParams() // Get URL parameters
  const location = useLocation() // Get current location
  const history = useNavigate() // History

  const url = useMemo(() => {
    const id = (params.id || '').split('&')[0]
    const name = (params.id || '').split('&')[1] || '' // queryParams
    const hash = location.hash.substring(1)
    const pathname = location.pathname

    const updateHash = (newHash: string) => {
      history(`${pathname}${location.search}#${newHash}`, { replace: true })
    }

    return {
      id,
      name,
      hash,
      pathname,
      updateHash,
    }
  }, [params.id, location.hash, location.pathname, location.search, history])

  return url
}
