import { createMount } from '@material-ui/core/test-utils'

import TeamDetails from '.'
import { LEEDS } from 'test/fixtures'

describe('TeamDetails', () => {
  const render = (props = {}) => createMount()(
    <TeamDetails
      team={LEEDS}
      {...props}
    />
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )

  it('renders the team details page', () => {
    const wrapper = render()

    expect(tableCell(wrapper, 2, 0).text()).toEqual('Wins')
    expect(tableCell(wrapper, 2, 1).text()).toEqual(String(LEEDS.wins))

    expect(tableCell(wrapper, 6, 0).text()).toEqual('Goals Against')
    expect(tableCell(wrapper, 6, 1).text()).toEqual(String(LEEDS.goalsAgainst))
  })
})
