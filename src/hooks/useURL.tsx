import { useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'

export const useURL = () => {
  const params = useParams() // Get URL parameters
  const location = useLocation() // Get current location

  const url = useMemo(() => {
    const id = params.id!.split('&')[0]
    const name = params.id!.split('&')[1] // queryParams
    const hash = location.hash.substring(1)
    const pathname = location.pathname

    const updateHash = (newHash: string) => {
      // add hash
      window.location.hash = newHash

      if (!newHash) {
        // remove hash
        window.history.pushState(
          '',
          document.title,
          window.location.pathname + window.location.search,
        )
      }
    }

    return {
      id,
      name,
      hash,
      pathname,
      updateHash,
    }
  }, [params, location.hash, location.pathname])

  return url
}
