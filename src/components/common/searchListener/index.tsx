import { useRef, useEffect, createContext } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'qs'

type Props = {
  children: any,
  id?: string,
  initialFilterState: Object,
  fetchAction: Function
}

export const SearchContext = createContext<any>({})

const SearchListener = (props: Props) => {
  const {
    id,
    fetchAction,
    initialFilterState
  } = props

  const { search } = useLocation()

  const searchQuery = useRef(qs.parse(search.substring(1)))

  useEffect(() => {
    searchQuery.current = qs.parse(search.substring(1))

    fetchAction({ id, ...initialFilterState, ...searchQuery.current })
  }, [search, id])

  return (
    <SearchContext.Provider
      value={{
        search: { ...initialFilterState, ...searchQuery.current }
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchListener
