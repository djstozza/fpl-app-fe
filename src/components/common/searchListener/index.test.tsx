import { createMount } from '@material-ui/core/test-utils'

import SearchListener from '.'
import { blank__ } from 'test/helpers'

const pathname = '/players'
const search = '?filter%5BpositionId%5D%5B0%5D=1&filter%5BpositionId%5D%5B1%5D=4'
const sort = { totalPoints: 'desc' }


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname, search })
}))

delete window.location
global.window = Object.create(window)
global.window.location = { pathname }

describe('searchListener', () => {
  const render = (props = {}) => createMount()(
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
    const wrapper = render({ fetchAction, initialFilterState: { sort } })

    expect(fetchAction).toHaveBeenCalledWith({ sort, filter: { positionId: ['1', '4'] } })
  })
})
