import { render, screen, within } from '@testing-library/react'

import { RouteWithOutletContext, blank__ } from 'test/helpers'
import TeamDetails from '.'
import { LEEDS } from 'test/fixtures'

describe('TeamDetails', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      team: { data: LEEDS },
      setTab: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <TeamDetails />
      </RouteWithOutletContext>
    )
  }

  const tableRows = () => screen.getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]

  it('renders the team details page', () => {
    customRender()

    expect(tableCell(2, 0)).toHaveTextContent('Wins')
    expect(tableCell(2, 1)).toHaveTextContent(String(LEEDS.wins))

    expect(tableCell(6, 0)).toHaveTextContent('Goals Against')
    expect(tableCell(6, 1)).toHaveTextContent(String(LEEDS.goalsAgainst))
  })

  it('triggers setTab on render', () => {
    const setTab = jest.fn()
    customRender({ setTab })

    expect(setTab).toHaveBeenCalledWith('details')
  })
})
