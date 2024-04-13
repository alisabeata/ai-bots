import { useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

export const useURL = () => {
  const params = useParams() // get URL parameters
  const location = useLocation() // get current location
  const history = useNavigate() // get History

  const url = useMemo(() => {
    const { hash, pathname, search } = location
    const hashVal = hash.substring(1)
    const queryParams = new URLSearchParams(location.search) // get queryParams
    const id = params.id
    const name = queryParams.get('name')

    const updateHash = (newHash: string) => {
      history(`${pathname}${search}#${newHash}`, { replace: true })
    }

    return {
      id,
      name,
      hash: hashVal,
      pathname,
      search,
      updateHash,
    }
  }, [location, params.id, history])

  return url
}
