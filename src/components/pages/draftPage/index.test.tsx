import { createMount } from '@material-ui/core/test-utils'
import { SnackbarProvider } from 'notistack'

import ConnectedDraftPage, { DraftPage } from '.'

import { LIVE_LEAGUE, PLAYER_SUMMARIES, DRAFT_PICKS } from 'test/fixtures'
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
    details: 'You have already selected your position in the mini draft',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  }
]

describe('DraftPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        league: { data: LIVE_LEAGUE },
        players: { data: PLAYER_SUMMARIES },
        draftPicks: { data: DRAFT_PICKS, errors: [] },
        ...state
      }}
    >
      <SnackbarProvider maxSnack={3}>
        <ConnectedDraftPage
          fetchLeague={blank__}
          fetchDraftPicksStatus={blank__}
          match={{ params: { leagueId: LIVE_LEAGUE.id, tab: 'draftPicks' } }}
          {...props}
        />
      </SnackbarProvider>
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <DraftPage
          league={LIVE_LEAGUE}
          players={{ data: PLAYER_SUMMARIES }}
          draftPicks={{ data: DRAFT_PICKS, errors: [] }}
          fetchLeague={blank__}
          fetchDraftPicksStatus={blank__}
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
    expect(tabs(wrapper).at(1).text()).toEqual('Draft Picks')
    expect(wrapper.find('h4').text()).toEqual(`${LIVE_LEAGUE.name} Draft`)
  })

  it('triggers fetchLeague on render', () => {
    const fetchLeague = jest.fn()
    render({ fetchLeague })

    expect(fetchLeague).toHaveBeenCalledWith(LIVE_LEAGUE.id)
  })

  it('triggers fetchDraftPicksStatus on render', () => {
    const fetchDraftPicksStatus = jest.fn()
    render({ fetchDraftPicksStatus })

    expect(fetchDraftPicksStatus).toHaveBeenCalledWith(LIVE_LEAGUE.id)
  })

  it('shows errors with the snackbar when present', () => {
    const wrapper = render({ draftPicks: { data: DRAFT_PICKS, errors } })

    expect(snackBarItem(wrapper)).toHaveLength(3)
  })
})
