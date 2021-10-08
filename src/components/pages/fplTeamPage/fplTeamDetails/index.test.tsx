import { createMount } from '@material-ui/core/test-utils'

import FplTeamDetails from '.'
import { FPL_TEAM_1 } from 'test/fixtures'
import { MockedRouter, blank__ } from 'test/helpers'
import {
  LEAGUES_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'

describe('FplTeamDetails', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <FplTeamDetails
        fplTeam={FPL_TEAM_1}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)

  it('renders the fpl team details page', () => {
    const wrapper = render()

    expect(tableCell(wrapper, 0, 0).text()).toEqual('League')
    expect(link(wrapper, 0, 1).props().to).toEqual(`${LEAGUES_URL}/${FPL_TEAM_1.league.id}`)
    expect(link(wrapper, 0, 1).text()).toEqual(FPL_TEAM_1.league.name)

    expect(tableCell(wrapper, 5, 0).text()).toEqual('Owner')
    expect(tableCell(wrapper, 5, 1).text()).toEqual(FPL_TEAM_1.owner.username)
  })

  it('renders the edit league button if isOwner = true', () => {
    const wrapper = render()

    expect(wrapper.find('ButtonLink').props().to).toEqual(`${FPL_TEAMS_URL}/${FPL_TEAM_1.id}/details/edit`)
  })

  it('does not render the edit league button if isOwner = false', () => {
    const wrapper = render({ fplTeam: { ...FPL_TEAM_1, isOwner: false } })

    expect(wrapper.find('ButtonLink')).toHaveLength(0)
  })
})
