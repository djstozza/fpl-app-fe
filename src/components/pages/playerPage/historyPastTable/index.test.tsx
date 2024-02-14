import { createMount } from '@material-ui/core/test-utils'

import HistoryPastTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { PLAYER_HISTORY_PAST } from 'test/fixtures'
import { initialFilterState } from 'state/player/reducer'
import { PLAYERS_URL } from 'utilities/constants'

const playerId = '1'

describe('HistoryPastTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <HistoryPastTable
        hasHistoryPast
        historyPast={PLAYER_HISTORY_PAST}
        fetchPlayerHistoryPast={blank__}
        updatePlayerHistoryPastSort={blank__}
        playerId={playerId}
        tab='historyPast'
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )

  it('redirects to the player details page if hasHistoryPast = false', () => {
    const wrapper = render({ hasHistoryPast: false, historyPast: undefined })

    expect(wrapper.find('Navigate').props().to).toEqual(`${PLAYERS_URL}/${playerId}`)
  })

  it('renders the team fixtures table', () => {
    const wrapper = render()

    expect(tableCell(wrapper, 2, 6).text()).toEqual(String(PLAYER_HISTORY_PAST[1].redCards))
    expect(tableCell(wrapper, 3, 2).text()).toEqual(String(PLAYER_HISTORY_PAST[2].totalPoints))
  })

  it('triggers fetchPlayerHistoryPast on render', () => {
    const fetchPlayerHistoryPast = jest.fn()
    render({ fetchPlayerHistoryPast })

    expect(fetchPlayerHistoryPast).toHaveBeenCalledWith({ id: '1', ...initialFilterState })
  })

  it('triggers updatePlayerHistoryPastSort', () => {
    const updatePlayerHistoryPastSort = jest.fn()
    const wrapper = render({ updatePlayerHistoryPastSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')

    expect(updatePlayerHistoryPastSort).toHaveBeenCalledWith({ tab: 'historyPast', sort: { seasonName: 'asc' } })
  })
})
