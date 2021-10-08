import { createMount } from '@material-ui/core/test-utils'
import { SnackbarProvider } from 'notistack'

import NewMiniDraftPick from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIST_POSITIONS, PLAYER_SUMMARIES, MINI_DRAFT_PICK_STATUS } from 'test/fixtures'

const fplTeamListId = '5'

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

describe('NewMiniDraftPick', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <NewMiniDraftPick
          miniDraftPicks={{ ...MINI_DRAFT_PICK_STATUS, errors: [] }}
          fetchListPositions={blank__}
          fplTeamList={{ listPositions: LIST_POSITIONS }}
          isWaiver={false}
          deadline={new Date()}
          outListPosition={undefined}
          setOutListPosition={blank__}
          fetchTradeablePlayers={blank__}
          updateTradeablePlayersFilter={blank__}
          updateTradeablePlayersSort={blank__}
          updateTradeablePlayersPage={blank__}
          players={{ data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length } }}
          fetchPlayerFacets={blank__}
          createMiniDraftPick={blank__}
          {...props}
        />
      </SnackbarProvider>
    </MockedRouter>
  )

  const snackBarItem = wrapper => wrapper.find('WithStyles(SnackbarItem)')

  it('only renders the ListPositionsTable if outListPosition is undefined', () => {
    const wrapper = render()

    expect(wrapper.find('ListPositionsTable')).toHaveLength(1)
    expect(wrapper.find('OutListPosition').html()).toEqual(null)
    expect(wrapper.find('TradeablePlayersTable')).toHaveLength(0)
  })

  it('renders the TradeableListPositionsTable and OutListPosition if outListPosition is present', () => {
    const wrapper = render({ outListPosition: LIST_POSITIONS[0] })

    expect(wrapper.find('ListPositionsTable')).toHaveLength(0)
    expect(wrapper.find('OutListPosition').html()).not.toEqual(null)
    expect(wrapper.find('TradeablePlayersTable')).toHaveLength(1)
  })

  it('triggers fetchListPositions on render if the fplTeamListId is present', () => {
    const fetchListPositions = jest.fn()

    render({
      miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, errors: [], fplTeamListId },
      fetchListPositions
    })

    expect(fetchListPositions).toHaveBeenCalledWith(fplTeamListId)
  })

  it('does not fetchListPositions on render if the fplTeamListId is undefined', () => {
    const fetchListPositions = jest.fn()

    render({
      miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, errors: []},
      fetchListPositions
    })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('shows errors with the snackbar when present', () => {
    const wrapper = render({ miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, errors } })

    expect(snackBarItem(wrapper)).toHaveLength(3)
  })

  it('renders nothing if there are no list positions present', () => {
    const wrapper = render({ fplTeamList: { listPositions: [] } })

    expect(wrapper.html()).toEqual('')
  })
})
