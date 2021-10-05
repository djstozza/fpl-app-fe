import { createMount } from '@material-ui/core/test-utils'

import PlayerDetails from '.'
import { PLAYER_SUMMARIES } from 'test/fixtures'

describe('PlayerDetails', () => {
  const render = (props = {}) => createMount()(
    <PlayerDetails
      player={PLAYER_SUMMARIES[0]}
      {...props}
    />
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )

  it('renders the player details page', () => {
    const wrapper = render()

    expect(tableCell(wrapper, 2, 0).text()).toEqual('Total Points')
    expect(tableCell(wrapper, 2, 1).text()).toEqual(String(PLAYER_SUMMARIES[0].totalPoints))

    expect(tableCell(wrapper, 6, 0).text()).toEqual('Red Cards')
    expect(tableCell(wrapper, 6, 1).text()).toEqual(String(PLAYER_SUMMARIES[0].redCards))
  })
})
