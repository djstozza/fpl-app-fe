import { within, render, screen, fireEvent } from '@testing-library/react'

import ListPositionsTable, { listPositionTableCells } from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIST_POSITIONS } from 'test/fixtures'
import { PLAYERS_URL, TEAMS_URL } from 'utilities/constants'

describe('ListPositionsTable', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <ListPositionsTable
        fetching={false}
        listPositions={LIST_POSITIONS}
        isOwner={false}
        setOutListPosition={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const sortTable = () => screen.getByTestId('SortTable')
  const tableRows = () => within(sortTable()).getAllByRole('row')
  const columnHeaders = () => screen.getAllByRole('columnheader')
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const selectPlayerButton = (i, j) => within(tableCell(i, j)).getByRole('button')
  const listPositionCellNumber = Object.values(listPositionTableCells()).length

  it('renders the table', () => {
    customRender()
    expect(columnHeaders()).toHaveLength(listPositionCellNumber)

    expect(link(2, 0)).toHaveAttribute('href', `${PLAYERS_URL}/${LIST_POSITIONS[1].player.id}`)
    expect(link(2, 0)).toHaveTextContent(LIST_POSITIONS[1].player.lastName)

    expect(link(1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${LIST_POSITIONS[0].player.id}`)
    expect(link(1, 1)).toHaveTextContent(LIST_POSITIONS[0].player.firstName)

    expect(link(3, 2)).toHaveAttribute('href', `${TEAMS_URL}/${LIST_POSITIONS[2].team.id}/`)
    expect(link(3, 2)).toHaveTextContent(LIST_POSITIONS[2].team.shortName)

    expect(link(3, 2).childNodes[0]).toHaveAttribute('alt', LIST_POSITIONS[2].team.shortName)
  })

  it('allows users to set the outListPosition for waiver picks if deadline is present and isOwner = true', () => {
    const setOutListPosition = jest.fn()
    customRender({ isOwner: true, isWaiver: true, deadline: new Date(), setOutListPosition })

    expect(columnHeaders()).toHaveLength(listPositionCellNumber + 1)
    const button = selectPlayerButton(1, listPositionCellNumber)
    expect(button).toHaveTextContent('Waiver out')

    fireEvent.click(button)

    expect(setOutListPosition).toHaveBeenCalledWith(LIST_POSITIONS[0])
  })

  it('allows users to set the outListPosition for trades if deadline is present and isOwner = true', () => {
    const setOutListPosition = jest.fn()
    customRender({ isOwner: true, isWaiver: false, deadline: new Date(), setOutListPosition })

    expect(columnHeaders()).toHaveLength(listPositionCellNumber + 1)
    const button = selectPlayerButton(1, listPositionCellNumber)

    expect(button).toHaveTextContent('Trade out')
    fireEvent.click(button)

    expect(setOutListPosition).toHaveBeenCalledWith(LIST_POSITIONS[0])
  })
})
