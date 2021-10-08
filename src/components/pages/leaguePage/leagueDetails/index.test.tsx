import { createMount } from '@material-ui/core/test-utils'

import LeagueDetails from '.'
import { LIVE_LEAGUE } from 'test/fixtures'
import { MockedRouter, blank__ } from 'test/helpers'

describe('LeagueDetails', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <LeagueDetails
        league={LIVE_LEAGUE}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )

  it('renders the league details page', () => {
    const wrapper = render()

    expect(tableCell(wrapper, 0, 0).text()).toEqual('Status')
    expect(tableCell(wrapper, 0, 1).text()).toEqual(LIVE_LEAGUE.status)

    expect(tableCell(wrapper, 1, 0).text()).toEqual('Owner')
    expect(tableCell(wrapper, 1, 1).text()).toEqual(LIVE_LEAGUE.owner.username)
  })
})
