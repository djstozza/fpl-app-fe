import { createMount } from '@material-ui/core/test-utils'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import moment from 'moment'

import ConnectedMiniDraftPage, { MiniDraftPage } from '.'

import { CABLE_URL, cable } from 'utilities/constants'
import {
  LIVE_LEAGUE,
  PLAYER_SUMMARIES,
  MINI_DRAFT_PICKS,
  FPL_TEAM_LIST_1,
  LIST_POSITIONS,
  ROUND_1
} from 'test/fixtures'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'


const errors = [
  {
    details: 'You cannot draft players at this time',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  },
  {
    details: 'You cannot pick out of turn',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  },
  {
    details: 'Player has already been taken',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  }
]

const fplTeamListId = '1'

describe('MiniDraftPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        league: { data: LIVE_LEAGUE },
        players: { data: PLAYER_SUMMARIES },
        miniDraftPicks: { data: MINI_DRAFT_PICKS, errors: [], fplTeamListId },
        listPositions: { data: LIST_POSITIONS },
        fplTeamList: { outListPosition: undefined },
        ...state
      }}
    >
      <SnackbarProvider maxSnack={3}>
        <ConnectedMiniDraftPage
          fetchLeague={blank__}
          fetchMiniDraftPicksStatus={blank__}
          fetchListPositions={blank__}
          match={{ params: { leagueId: LIVE_LEAGUE.id, tab: 'miniDraftPicks' } }}
          {...props}
        />
      </SnackbarProvider>
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <MiniDraftPage
          league={LIVE_LEAGUE}
          players={{ data: PLAYER_SUMMARIES }}
          miniDraftPicks={{ data: MINI_DRAFT_PICKS, errors: [], fplTeamListId }}
          fplTeamList={{ outListPosition: undefined }}
          fetchLeague={blank__}
          fetchMiniDraftPicksStatus={blank__}
          listPositions={{ data: LIST_POSITIONS }}
          fetchListPositions={blank__}
          match={{ params: { leagueId: LIVE_LEAGUE.id  } }}
          {...props}
        />
      </SnackbarProvider>
    </MockedRouter>
  )

  const tabs = wrapper => wrapper.find('Tabs').find('WithStyles(ForwardRef(Tab))')
  const snackBarItem = wrapper => wrapper.find('WithStyles(SnackbarItem)')

  it('renders the draft picks tab by default', () => {
    const wrapper = connectedRender()

    expect(tabs(wrapper)).toHaveLength(2)
    expect(tabs(wrapper).at(1).props().selected).toEqual(true)
    expect(tabs(wrapper).at(1).text()).toEqual('Mini Draft Picks')
    expect(wrapper.find('h4').text()).toEqual(`${LIVE_LEAGUE.name} Mini Draft`)
  })

  it('triggers fetchLeague on render', () => {
    const fetchLeague = jest.fn()
    const wrapper = render({ fetchLeague })

    expect(fetchLeague).toHaveBeenCalledWith(LIVE_LEAGUE.id)
  })

  it('triggers fetchMiniDraftPicksStatus on render', () => {
    const fetchMiniDraftPicksStatus = jest.fn()
    const wrapper = render({ fetchMiniDraftPicksStatus })

    expect(fetchMiniDraftPicksStatus).toHaveBeenCalledWith(LIVE_LEAGUE.id)
  })

  it('shows errors with the snackbar when present', () => {
    const wrapper = render({ miniDraftPicks: { data: MINI_DRAFT_PICKS, errors } })

    expect(snackBarItem(wrapper)).toHaveLength(3)
  })

  it('triggers fetchListPositions on render', () => {
    const fetchListPositions = jest.fn()
    const wrapper = render({ fetchListPositions })

    expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LIST_1.id)
  })

  it('does not trigger fetchListPositions if fplTeamListId is undefined', () => {
    const fetchListPositions = jest.fn()
    const wrapper = render({ fetchListPositions, miniDraftPicks: { data: MINI_DRAFT_PICKS, errors: [] } })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('sets the deadline time as the waiverDeadline if waiverDeadline < the current time', () => {
    const waiverDeadline = moment().add(2, 'days').toDate()

    const round = {
      ...ROUND_1,
      waiverDeadline
    }

    const wrapper = render({ miniDraftPicks: { data: MINI_DRAFT_PICKS, errors: [], round, fplTeamListId } })
    expect(wrapper.find('UserCanPickAlert').props().deadline).toEqual(new Date(waiverDeadline))
  })

  it('sets the deadline time as undefined if waiverDeadline > the current time', () => {
    const waiverDeadline = moment().subtract(2, 'days').toDate()

    const round = {
      ...ROUND_1,
      waiverDeadline
    }

    const wrapper = render({ miniDraftPicks: { data: MINI_DRAFT_PICKS, errors: [], round, fplTeamListId } })
    expect(wrapper.find('UserCanPickAlert').props().deadline).toEqual(undefined)
  })

  it('renders nothing if there is no league', () => {
    const wrapper = render({ league: undefined })

    expect(wrapper.html()).toEqual('')
  })
})
