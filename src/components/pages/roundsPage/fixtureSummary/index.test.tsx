import { createMount } from '@material-ui/core/test-utils'
import timezoneMock from 'timezone-mock'

import FixtureSummary from '.'
import { MockedRouter } from 'test/helpers'
import {
  IN_PROGRESS_FIXTURE,
  UPCOMING_FIXTURE,
  FINISHED_FIXTURE,
  MANCHESTER_UNITED_TEAM_BASE,
  LEEDS_TEAM_BASE,
  ARSENAL_TEAM_BASE,
  BRENTFORD_TEAM_BASE,
  MANCHESTER_CITY_TEAM_BASE,
  SPURS_TEAM_BASE
} from 'test/fixtures'
import { TEAMS_URL } from 'utilities/constants'

describe('FixtureSummary', () => {
  timezoneMock.register('Australia/Adelaide')

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <FixtureSummary
        fixture={IN_PROGRESS_FIXTURE}
        {...props}
      />
    </MockedRouter>
  )

  const link = wrapper => wrapper.find('Link')
  const expandMoreIcon = wrapper => wrapper.find('WithStyles(ForwardRef(IconButton))')

  describe('in progress fixtures', () => {
    it('shows the details in bold', () => {
      const wrapper = render()

      expect(link(wrapper).at(0).props().to).toEqual(`${TEAMS_URL}/${MANCHESTER_UNITED_TEAM_BASE.id}`)
      expect(link(wrapper).at(0).find('Styled(MuiBox)').props().fontWeight).toEqual('fontWeightBold')
      expect(link(wrapper).at(0).find('Styled(MuiBox)').text()).toEqual(MANCHESTER_UNITED_TEAM_BASE.shortName)

      expect(wrapper.find('Styled(MuiBox)').at(1).props().fontWeight).toEqual('fontWeightBold')
      expect(wrapper.find('Styled(MuiBox)').at(1).text()).toEqual('21:00')

      expect(wrapper.find('Styled(MuiBox)').at(2).props().fontWeight).toEqual('fontWeightBold')
      expect(wrapper.find('Styled(MuiBox)').at(2).text())
        .toEqual(`${IN_PROGRESS_FIXTURE.homeTeamScore} - ${IN_PROGRESS_FIXTURE.awayTeamScore}`)

      expect(wrapper.find('Styled(MuiBox)').at(3).props().fontWeight).toEqual('fontWeightBold')
      expect(wrapper.find('Styled(MuiBox)').at(3).text()).toEqual(`(${IN_PROGRESS_FIXTURE.minutes})`)

      expect(link(wrapper).at(1).props().to).toEqual(`${TEAMS_URL}/${LEEDS_TEAM_BASE.id}`)
      expect(link(wrapper).at(1).find('Styled(MuiBox)').props().fontWeight).toEqual('fontWeightBold')
      expect(link(wrapper).at(1).find('Styled(MuiBox)').text()).toEqual(LEEDS_TEAM_BASE.shortName)
    })

    it('shows the expand button', () => {
      const wrapper = render()

      expect(expandMoreIcon(wrapper)).toHaveLength(1)
    })
  })

  describe('finished fixtures', () => {
    it('shows details in normal font', () => {
      const wrapper = render({ fixture: FINISHED_FIXTURE })

      expect(wrapper.find('Styled(MuiBox)')).toHaveLength(5)

      expect(link(wrapper).at(0).props().to).toEqual(`${TEAMS_URL}/${BRENTFORD_TEAM_BASE.id}`)
      expect(link(wrapper).at(0).find('Styled(MuiBox)').props().fontWeight).toEqual('fontWeightRegular')
      expect(link(wrapper).at(0).find('Styled(MuiBox)').text()).toEqual(BRENTFORD_TEAM_BASE.shortName)

      expect(wrapper.find('Styled(MuiBox)').at(1).props().fontWeight).toEqual('fontWeightRegular')
      expect(wrapper.find('Styled(MuiBox)').at(1).text()).toEqual('04:30')

      expect(wrapper.find('Styled(MuiBox)').at(2).props().fontWeight).toEqual('fontWeightRegular')
      expect(wrapper.find('Styled(MuiBox)').at(2).text())
        .toEqual(`${FINISHED_FIXTURE.homeTeamScore} - ${FINISHED_FIXTURE.awayTeamScore}`)

      expect(wrapper.find('Styled(MuiBox)').at(3).props().fontWeight).toEqual('fontWeightRegular')
      expect(wrapper.find('Styled(MuiBox)').at(3).text()).toEqual(`(${FINISHED_FIXTURE.minutes})`)

      expect(link(wrapper).at(1).props().to).toEqual(`${TEAMS_URL}/${ARSENAL_TEAM_BASE.id}`)
      expect(link(wrapper).at(1).find('Styled(MuiBox)').props().fontWeight).toEqual('fontWeightRegular')
      expect(link(wrapper).at(1).find('Styled(MuiBox)').text()).toEqual(ARSENAL_TEAM_BASE.shortName)
    })

    it('shows the expand button', () => {
      const wrapper = render({ fixture: FINISHED_FIXTURE })

      expect(expandMoreIcon(wrapper)).toHaveLength(1)
    })
  })

  describe('upcoming fixtures', () => {
    it('only shows the team links and times - in normal font', () => {
      const wrapper = render({ fixture: UPCOMING_FIXTURE })

      expect(wrapper.find('Styled(MuiBox)')).toHaveLength(3)

      expect(link(wrapper).at(0).props().to).toEqual(`${TEAMS_URL}/${SPURS_TEAM_BASE.id}`)
      expect(link(wrapper).at(0).find('Styled(MuiBox)').props().fontWeight).toEqual('fontWeightRegular')
      expect(link(wrapper).at(0).find('Styled(MuiBox)').text()).toEqual(SPURS_TEAM_BASE.shortName)

      expect(wrapper.find('Styled(MuiBox)').at(1).props().fontWeight).toEqual('fontWeightRegular')
      expect(wrapper.find('Styled(MuiBox)').at(1).text()).toEqual('01:00')

      expect(link(wrapper).at(1).props().to).toEqual(`${TEAMS_URL}/${MANCHESTER_CITY_TEAM_BASE.id}`)
      expect(link(wrapper).at(1).find('Styled(MuiBox)').props().fontWeight).toEqual('fontWeightRegular')
      expect(link(wrapper).at(1).find('Styled(MuiBox)').text()).toEqual(MANCHESTER_CITY_TEAM_BASE.shortName)
    })

    it('does not show the expand button', () => {
      const wrapper = render({ fixture: UPCOMING_FIXTURE })

      expect(expandMoreIcon(wrapper)).toHaveLength(0)
    })
  })
})
