import { createMount } from '@material-ui/core/test-utils'

import ListPositionsTable, { listPositionTableCells } from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIST_POSITIONS } from 'test/fixtures'
import { PLAYERS_URL, TEAMS_URL } from 'utilities/constants'

describe('ListPositionsTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <ListPositionsTable
        listPositions={LIST_POSITIONS}
        isOwner={false}
        setOutListPosition={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const headerCells = wrapper => wrapper.find('HeaderCell')
  const listPositionCellNumber = Object.values(listPositionTableCells()).length
  const selectPlayerButton = (wrapper, i, j) => tableCell(wrapper, i, j).find('button')

  it('renders the table', () => {
    const wrapper = render()
    expect(headerCells(wrapper)).toHaveLength(listPositionCellNumber)

    expect(link(wrapper, 2, 0).props().to).toEqual(`${PLAYERS_URL}/${LIST_POSITIONS[1].player.id}`)
    expect(link(wrapper, 2, 0).text()).toEqual(LIST_POSITIONS[1].player.lastName)

    expect(link(wrapper, 1, 1).props().to).toEqual(`${PLAYERS_URL}/${LIST_POSITIONS[0].player.id}`)
    expect(link(wrapper, 1, 1).text()).toEqual(LIST_POSITIONS[0].player.firstName)

    expect(link(wrapper, 3, 2).props().to).toEqual(`${TEAMS_URL}/${LIST_POSITIONS[2].team.id}/`)
    expect(link(wrapper, 3, 2).text()).toEqual(LIST_POSITIONS[2].team.shortName)
    expect(link(wrapper, 3, 2).find('img').props().alt).toEqual(LIST_POSITIONS[2].team.shortName)
  })

  it('allows users to set the outListPosition for waiver picks if deadline is present and isOwner = true', () => {
    const setOutListPosition = jest.fn()
    const wrapper = render({ isOwner: true, isWaiver: true, deadline: new Date(), setOutListPosition })

    expect(headerCells(wrapper)).toHaveLength(listPositionCellNumber + 1)
    const button = selectPlayerButton(wrapper, 1, listPositionCellNumber)
    expect(button.text()).toEqual('Waiver out')
    button.simulate('click')

    expect(setOutListPosition).toHaveBeenCalledWith(LIST_POSITIONS[0])
  })

  it('allows users to set the outListPosition for trades if deadline is present and isOwner = true', () => {
    const setOutListPosition = jest.fn()
    const wrapper = render({ isOwner: true, isWaiver: false, deadline: new Date(), setOutListPosition })

    expect(headerCells(wrapper)).toHaveLength(listPositionCellNumber + 1)
    const button = selectPlayerButton(wrapper, 1, listPositionCellNumber)
    expect(button.text()).toEqual('Trade out')
    button.simulate('click')

    expect(setOutListPosition).toHaveBeenCalledWith(LIST_POSITIONS[0])
  })
})
