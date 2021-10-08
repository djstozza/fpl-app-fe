import { createMount } from '@material-ui/core/test-utils'
import moment from 'moment'
import reactRouterDom from 'react-router-dom'

import ConnectedFplTeamPage, { FplTeamPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { FPL_TEAM_1, FPL_TEAM_LISTS, INITIALIZED_LEAGUE } from 'test/fixtures'
import {
  FPL_TEAMS_URL
} from 'utilities/constants'

const search = ''
const pathname = '/teamLists'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname, search })
}))


describe('FplTeamPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        fplTeam: { data: FPL_TEAM_1, errors: [] },
        fplTeamLists: { data: FPL_TEAM_LISTS },
        fplTeamList: { outListPosition: undefined },
        interTeamTradeGroup: { data: undefined },
        ...state
      }}
    >
      <ConnectedFplTeamPage
        match={{ params: { fplTeamId: FPL_TEAM_1.id } }}
        {...props}
      />
    </MockedRouterStore>
  )

  const render = (props = {}, initialEntries = ['/']) => createMount()(
    <MockedRouter
      initialEntries={initialEntries}
    >
      <FplTeamPage
        fplTeam={FPL_TEAM_1}
        fplTeamLists={{ data: FPL_TEAM_LISTS }}
        fplTeamList={{ outListPosition: undefined }}
        interTeamTradeGroup={{ data: undefined }}
        fetchFplTeam={blank__}
        fetchFplTeamLists={blank__}
        fetchFplTeamList={blank__}
        fetchListPositions={blank__}
        match={{ params: { fplTeamId: FPL_TEAM_1.id, tab: 'details' } }}
        {...props}
      />
    </MockedRouter>
  )

  const tabs = wrapper => wrapper.find('Tabs').find('WithStyles(ForwardRef(Tab))')
  const header = wrapper => wrapper.find('h4')
  const fplTeamAlert = wrapper => wrapper.find('FplTeamAlert')

  it('renders the details page by default', () => {
    const wrapper = connectedRender()

    expect(tabs(wrapper)).toHaveLength(5)
    expect(tabs(wrapper).at(0).props().selected).toEqual(true)
    expect(tabs(wrapper).at(0).text()).toEqual('Details')
    expect(header(wrapper).text()).toEqual(FPL_TEAM_1.name)
  })

  it('only shows the details tab if isOwner = false and the league is not live', () => {
    const wrapper = connectedRender(
      {},
      { fplTeam: { data: { ...FPL_TEAM_1, isOwner: false, league: INITIALIZED_LEAGUE } } }
    )

    expect(tabs(wrapper).text()).toEqual('Details')
  })

  it('only shows the teamLists and details tabs if the league is live and isOwner = false', () => {
    const wrapper = connectedRender({}, { fplTeam: { data: { ...FPL_TEAM_1, isOwner: false } } })

    expect(tabs(wrapper)).toHaveLength(2)
    expect(tabs(wrapper).at(1).text()).toEqual('Lists')
  })

  it('triggers fetchFplTeam on render', () => {
    const fetchFplTeam = jest.fn()

    render({ fetchFplTeam })

    expect(fetchFplTeam).toHaveBeenCalledWith(FPL_TEAM_1.id)
  })

  it('triggers fetchFplTeamLists on render', () => {
    const fetchFplTeamLists = jest.fn()

    render({ fetchFplTeamLists })

    expect(fetchFplTeamLists).toHaveBeenCalledWith(FPL_TEAM_1.id)
  })

  it('renders nothing if there is no fplTeam', () => {
    const wrapper = render({ fplTeam: undefined })
    expect(wrapper.html()).toEqual('')
  })

  describe('extraTitleInfo', () => {
    it('shows the round and the total score on the teamLists tab if present', () => {
      const wrapper = render({
        fplTeamList: { outListPosition: undefined, data: FPL_TEAM_LISTS[0] },
        match: { params: { fplTeamId: FPL_TEAM_1.id, tab: 'teamLists' } }
      })
      expect(header(wrapper).text())
        .toEqual(`${FPL_TEAM_1.name} - ${FPL_TEAM_LISTS[0].round.name} - ${FPL_TEAM_LISTS[0].totalScore} Points`)
    })
  })

  describe('selectedFplTeamListId', () => {
    it('does not get set if there are no fplTeamLists', () => {
      const fetchFplTeamList = jest.fn()
      const fetchListPositions = jest.fn()

      render({ fetchFplTeamList, fetchListPositions, fplTeamLists: { data: [] } })

      expect(fetchFplTeamList).not.toHaveBeenCalled()
      expect(fetchListPositions).not.toHaveBeenCalled()
    })

    it('uses the fplTeamListId in the params if present', () => {
      const fetchFplTeamList = jest.fn()
      const fetchListPositions = jest.fn()

      render({
        fetchFplTeamList,
        fetchListPositions,
        match: { params: { fplTeamId: FPL_TEAM_1.id, fplTeamListId: FPL_TEAM_LISTS[1].id } }
      })

      expect(fetchFplTeamList).toHaveBeenCalledWith(FPL_TEAM_LISTS[1].id)
      expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LISTS[1].id)
    })

    it('defaults to the currentFplTeamListId if present and there is no fplTeamListId in the params', () => {
      const fetchFplTeamList = jest.fn()
      const fetchListPositions = jest.fn()

      render({ fetchFplTeamList, fetchListPositions })

      expect(fetchFplTeamList).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
      expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
    })

    it('defaults to the last fplTeamList if present and there is no fplTeamListId and no currentFplTeamList', () => {
      const fetchFplTeamList = jest.fn()
      const fetchListPositions = jest.fn()

      const fplTeamLists = [
        {
          ...FPL_TEAM_LISTS[0],
          round: {
            ...FPL_TEAM_LISTS[0].round,
            current: false
          }
        },
        FPL_TEAM_LISTS[1],
        FPL_TEAM_LISTS[2]
      ]

      render({ fetchFplTeamList, fetchListPositions, fplTeamLists: { data: fplTeamLists } })

      expect(fetchFplTeamList).toHaveBeenCalledWith(FPL_TEAM_LISTS[2].id)
      expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LISTS[2].id)
    })
  })

  describe('deadlineTime', () => {
    it('gets set as the waiverDeadline if it has not passed', () => {
      const waiverDeadline = moment().subtract(1, 'day').toDate()
      const deadlineTime = moment().add(3, 'days').toDate()

      const fplTeamLists = [
        {
          ...FPL_TEAM_LISTS[0],
          round: {
            ...FPL_TEAM_LISTS[0].round,
            current: false
          }
        },
        FPL_TEAM_LISTS[1],
        {
          ...FPL_TEAM_LISTS[2],
          round: {
            ...FPL_TEAM_LISTS[2].round,
            current: true,
            deadlineTime,
            waiverDeadline
          }
        }
      ]

      const wrapper = render({ fplTeamLists: { data: fplTeamLists } })

      expect(fplTeamAlert(wrapper).props()).toMatchObject({
        deadline: new Date(deadlineTime),
        isWaiver: false
      })
    })

    it('gets set as the deadlineTime it has not passed but the waiverDeadline has', () => {
      const waiverDeadline = moment().subtract(2, 'days').toDate()
      const deadlineTime = moment().subtract(1, 'day').toDate()

      const fplTeamLists = [
        {
          ...FPL_TEAM_LISTS[0],
          round: {
            ...FPL_TEAM_LISTS[0].round,
            current: false
          }
        },
        FPL_TEAM_LISTS[1],
        {
          ...FPL_TEAM_LISTS[2],
          round: {
            ...FPL_TEAM_LISTS[2].round,
            current: true,
            deadlineTime,
            waiverDeadline
          }
        }
      ]

      const wrapper = render({ fplTeamLists: { data: fplTeamLists } })

      expect(fplTeamAlert(wrapper).props()).toMatchObject({
        deadline: undefined,
        isWaiver: false
      })
    })

    it('does not get set if both the waiverDeadline and the deadlineTime have passed', () => {
      const waiverDeadline = moment().subtract(2, 'days').toDate()
      const deadlineTime = moment().subtract(1, 'day').toDate()

      const fplTeamLists = [
        {
          ...FPL_TEAM_LISTS[0],
          round: {
            ...FPL_TEAM_LISTS[0].round,
            current: false
          }
        },
        FPL_TEAM_LISTS[1],
        {
          ...FPL_TEAM_LISTS[2],
          round: {
            ...FPL_TEAM_LISTS[2].round,
            current: true,
            deadlineTime,
            waiverDeadline
          }
        }
      ]

      const wrapper = render({ fplTeamLists: { data: fplTeamLists } })

      expect(fplTeamAlert(wrapper).props()).toMatchObject({
        deadline: undefined,
        isWaiver: false
      })
    })

    it('does not get set if there is no currentFplTeamList', () => {
      const fplTeamLists = [
        {
          ...FPL_TEAM_LISTS[0],
          round: {
            ...FPL_TEAM_LISTS[0].round,
            current: false
          }
        },
        FPL_TEAM_LISTS[1],
        FPL_TEAM_LISTS[2]
      ]

      const wrapper = render({ fplTeamLists: { data: fplTeamLists } })

      expect(fplTeamAlert(wrapper).props()).toMatchObject({
        deadline: undefined,
        isWaiver: false
      })
    })
  })
})
