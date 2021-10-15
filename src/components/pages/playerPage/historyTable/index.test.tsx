import { createMount } from '@material-ui/core/test-utils'

import HistoryTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { PLAYER_HISTORY } from 'test/fixtures'
import { initialFilterState } from 'state/player/reducer'
import { PLAYERS_URL } from 'utilities/constants'

const playerId = '1'

describe('HistoryTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <HistoryTable
        hasHistory
        history={PLAYER_HISTORY}
        fetchPlayerHistory={blank__}
        updatePlayerHistorySort={blank__}
        playerId={playerId}
        tab='history'
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )

  it('redirects to the player details page if hasHistory = false', () => {
    const wrapper = render({ hasHistory: false, history: undefined })

    expect(wrapper.find('Redirect').props().to).toEqual(`${PLAYERS_URL}/${playerId}`)
  })

  it('renders the team fixtures table', () => {
    const wrapper = render()

    expect(tableCell(wrapper, 2, 4).text()).toEqual(String(PLAYER_HISTORY[1].totalPoints))
    expect(tableCell(wrapper, 3, 6).text()).toEqual(String(PLAYER_HISTORY[2].assists))
  })

  it('triggers fetchPlayerHistory on render', () => {
    const fetchPlayerHistory = jest.fn()
    render({ fetchPlayerHistory })

    expect(fetchPlayerHistory).toHaveBeenCalledWith({ id: '1', ...initialFilterState })
  })

  it('triggers updatePlayerHistorySort', () => {
    const updatePlayerHistorySort = jest.fn()
    const wrapper = render({ updatePlayerHistorySort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')

    expect(updatePlayerHistorySort).toHaveBeenCalledWith({ tab: 'history', sort: { 'rounds.deadlineTime': 'asc' } })
  })
})
