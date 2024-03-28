import { render, screen, within } from '@testing-library/react'

import { RouteWithOutletContext, blank__ } from 'test/helpers'
import PlayerDetails from '.'
import { PLAYER_SUMMARIES } from 'test/fixtures'

describe('PlayerDetails', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      player: { data: PLAYER_SUMMARIES[0] },
      setTab: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <PlayerDetails />
      </RouteWithOutletContext>
    )
  }

  const tableRows = () => screen.getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]

  it('renders the player details page', () => {
    customRender()

    expect(tableCell(2, 0)).toHaveTextContent('Total Points')
    expect(tableCell(2, 1)).toHaveTextContent(String(PLAYER_SUMMARIES[0].totalPoints))

    expect(tableCell(6, 0)).toHaveTextContent('Red Cards')
    expect(tableCell(6, 1)).toHaveTextContent(String(PLAYER_SUMMARIES[0].redCards))
  })

  it('calls setTab on render', () => {
    const setTab = jest.fn()
    customRender({ setTab })

    expect(setTab).toHaveBeenCalledWith('details')
  })
})
