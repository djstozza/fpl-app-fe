import { createMount } from '@material-ui/core/test-utils'
import { SnackbarProvider } from 'notistack'

import AddPlayer from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIST_POSITIONS, FPL_TEAM_LIST_1, INTER_TEAM_TRADE_GROUP_1 } from 'test/fixtures'

const name = 'name'
const teamTradeId = '10'

const errors = [
  {
    code: 'is invalid',
    detail: 'You cannot make a trade at this time',
    source: 'name',
    title: 'Is Invalid'
  }
]

describe('AddPlayer', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <AddPlayer
          isOwner
          currentFplTeamList={FPL_TEAM_LIST_1}
          interTeamTradeGroup={INTER_TEAM_TRADE_GROUP_1}
          fetchInterTeamTradeGroup={blank__}
          teamTradeId={teamTradeId}
          selectedFplTeamListId={FPL_TEAM_LIST_1.id}
          fplTeamList={{ listPositions: LIST_POSITIONS }}
          fetchListPositions={blank__}
          deadline={new Date()}
          outListPosition={LIST_POSITIONS[3]}
          setOutListPosition={blank__}
          listPosition={{ tradeableListPositions: LIST_POSITIONS }}
          fetchTradeableListPositions={blank__}
          updateTradeableListPositionsFilter={blank__}
          updateTradeableListPositionsSort={blank__}
          fetchTradeableListPositionFacets={blank__}
          addToInterTeamTradeGroup={blank__}
          interTeamTradeGroups={{ errors: [] }}
          name={name}
          {...props}
        />
      </SnackbarProvider>
    </MockedRouter>
  )

  const snackBarItem = wrapper => wrapper.find('WithStyles(SnackbarItem)')

  it('only does not render the listPositionsTable if outListPosition is present', () => {
    const wrapper = render()

    expect(wrapper.find('ListPositionsTable')).toHaveLength(0)
    expect(wrapper.find('OutListPosition').html()).not.toEqual(null)
    expect(wrapper.find('TradeableListPositionsTable')).toHaveLength(1)
  })

  it('only renders the ListPositionsTable if outListPosition is undefined', () => {
    const wrapper = render({ outListPosition: undefined })

    expect(wrapper.find('ListPositionsTable')).toHaveLength(1)
    expect(wrapper.find('OutListPosition').html()).toEqual(null)
    expect(wrapper.find('TradeableListPositionsTable')).toHaveLength(0)
  })

  it('calls fetchInterTeamTradeGroup if there is a selectedFplTeamListId', () => {
    const fetchInterTeamTradeGroup = jest.fn()

    render({ fetchInterTeamTradeGroup })

    expect(fetchInterTeamTradeGroup).toHaveBeenCalledWith(FPL_TEAM_LIST_1.id, teamTradeId)
  })

  it('does not call fetchInterTeamTradeGroup if there is no selectedFplTeamListId', () => {
    const fetchInterTeamTradeGroup = jest.fn()

    render({ fetchInterTeamTradeGroup, selectedFplTeamListId: undefined })

    expect(fetchInterTeamTradeGroup).not.toHaveBeenCalled()
  })

  it('calls fetchListPositions if there is a selectedFplTeamListId', () => {
    const fetchListPositions = jest.fn()

    render({ fetchListPositions })

    expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LIST_1.id, INTER_TEAM_TRADE_GROUP_1)
  })

  it('does not call fetchListPositions if there is no currentFplTeamList', () => {
    const fetchListPositions = jest.fn()

    render({ fetchListPositions, currentFplTeamList: undefined })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('does not call fetchListPositions if there is no interTeamTradeGroup', () => {
    const fetchListPositions = jest.fn()

    render({ fetchListPositions, interTeamTradeGroup: undefined })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('shows errors with the snackbar when present', () => {
    const wrapper = render({ interTeamTradeGroups: { errors } })

    expect(snackBarItem(wrapper)).toHaveLength(1)
  })

  it('renders nothing if there are no listPositions', () => {
    const wrapper = render({ fplTeamList: { listPositions: [] } })

    expect(wrapper.html()).toEqual('')
  })
})
