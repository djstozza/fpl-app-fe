import { createMount } from '@material-ui/core/test-utils'

import TeamCrestLink from '.'
import { MockedRouter } from 'test/helpers'
import { TEAMS_URL } from 'utilities/constants'
import { TEAM_BASE } from 'test/fixtures'

describe('TeamCrestLink', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <TeamCrestLink
        team={TEAM_BASE}
        {...props}
      />
    </MockedRouter>
  )

  const link = wrapper => wrapper.find('Link')

  it('renders a link wih the team crest', () => {
    const wrapper = render()

    expect(link(wrapper).at(0).text()).toEqual(TEAM_BASE.shortName)
    expect(link(wrapper).find('img')).toHaveLength(1)
    expect(link(wrapper).at(0).props().to).toEqual(`${TEAMS_URL}/${TEAM_BASE.id}/`)
  })

  it('adds a tab to the url if one is provided', () => {
    const wrapper = render({ tab: 'players' })

    expect(link(wrapper).at(0).props().to).toEqual(`${TEAMS_URL}/${TEAM_BASE.id}/players`)
  })
})
