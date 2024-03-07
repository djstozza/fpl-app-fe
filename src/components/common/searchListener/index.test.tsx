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
  const customRender = (props = {}) => render(
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

  it('triggers the fetch action based on the search query and the initial filter state', () => {
    const fetchAction = jest.fn()
    customRender({ fetchAction, initialFilterState: { sort } })

    expect(fetchAction).toHaveBeenCalledWith({ sort, filter: { positionId: ['1', '4'] } })
  })
})
