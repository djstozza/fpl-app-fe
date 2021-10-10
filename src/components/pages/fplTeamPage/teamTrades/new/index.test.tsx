import { createMount } from '@material-ui/core/test-utils'
import { SnackbarProvider } from 'notistack'

import NewTeamTrade from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIST_POSITIONS, FPL_TEAM_LIST_1, INTER_TEAM_TRADE_GROUPS } from 'test/fixtures'

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

describe('NewTeamTrade', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <NewTeamTrade
          isOwner
          fplTeamList={{ listPositions: LIST_POSITIONS }}
          currentFplTeamList={FPL_TEAM_LIST_1}
          selectedFplTeamListId={FPL_TEAM_LIST_1.id}
          interTeamTradeGroups={{ data: INTER_TEAM_TRADE_GROUPS, errors: [] }}
          fetchListPositions={blank__}
          fetchInterTeamTradeGroup={blank__}
          deadline={new Date()}
          outListPosition={LIST_POSITIONS[3]}
          setOutListPosition={blank__}
          fetchTradeableListPositions={blank__}
          listPosition={{ tradeableListPositions: LIST_POSITIONS }}
          createInterTeamTradeGroup={blank__}
          updateTradeableListPositionsFilter={blank__}
          updateTradeableListPositionsSort={blank__}
          fetchTradeableListPositionFacets={blank__}
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

  it('calls fetchListPositions if there is a selectedFplTeamListId', () => {
    const fetchListPositions = jest.fn()

    render({ fetchListPositions })

    expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LIST_1.id)
  })

  it('does not call fetchListPositions if there is no currentFplTeamList', () => {
    const fetchListPositions = jest.fn()

    render({ fetchListPositions, currentFplTeamList: undefined })

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
