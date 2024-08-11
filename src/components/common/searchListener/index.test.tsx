import { render } from '@testing-library/react'

import SearchListener from '.'
import { blank__ } from 'test/helpers'

const pathname = '/players'
const search = '?filter%5BpositionId%5D%5B0%5D=1&filter%5BpositionId%5D%5B1%5D=4'
const sort = { totalPoints: 'desc' }


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname, search })
}))

describe('searchListener', () => {
  const SearchListenerBase = (props = {}) => (
    <SearchListener
      initialFilterState={{}}
      fetchAction={blank__}
      {...props}
    >
      <div>
        Child component
      </div>
    </SearchListener>
  )
  
  const customRender = (props = {}) => render(SearchListenerBase(props))

  it('triggers the fetch action based on the search query and the initial filter state', () => {
    const fetchAction = jest.fn()
    customRender({ fetchAction, initialFilterState: { sort } })

    expect(fetchAction).toHaveBeenCalledWith({ sort, filter: { positionId: ['1', '4'] } })
  })

  it('refetches if a new id is supplied', () => {
    const originalId = 1
    const newId = 2
    const fetchAction = jest.fn()
    
    const { rerender } = customRender({ fetchAction, id: originalId, initialFilterState: { sort } })

    expect(fetchAction).toHaveBeenCalledWith({ id: originalId, sort, filter: { positionId: ['1', '4'] } })

    rerender(SearchListenerBase({ fetchAction, id: newId, initialFilterState: { sort } }))

    expect(fetchAction).toHaveBeenCalledWith({ id: newId, sort, filter: { positionId: ['1', '4'] } })
  })
})
