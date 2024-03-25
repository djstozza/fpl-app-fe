import { within, render, screen } from '@testing-library/react'

import LeagueDetails from '.'
import { LIVE_LEAGUE } from 'test/fixtures'
import { RouteWithOutletContext, blank__ } from 'test/helpers'

describe('LeagueDetails', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      league: LIVE_LEAGUE,
      setTab: blank__,
      setAction: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <LeagueDetails />
      </RouteWithOutletContext>
    )
  }


  
  const tableRows = () => screen.getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]


  it('renders the league details page', () => {
    customRender()

    expect(tableCell(0, 0)).toHaveTextContent('Status')
    expect(tableCell(0, 1)).toHaveTextContent(LIVE_LEAGUE.status)

    expect(tableCell(1, 0)).toHaveTextContent('Owner')
    expect(tableCell(1, 1)).toHaveTextContent(LIVE_LEAGUE.owner.username)
  })

  it('triggers setTab and setAction on load', () => {
    const setTab = jest.fn()
    const setAction = jest.fn()
    customRender({ setTab, setAction })

    expect(setTab).toHaveBeenCalledWith('details')
    expect(setAction).toHaveBeenCalledWith()
  })
})
