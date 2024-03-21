import { within, render, screen } from '@testing-library/react'

import FplTeamDetails from '.'
import { FPL_TEAM_1 } from 'test/fixtures'
import { RouteWithOutletContext, blank__ } from 'test/helpers'

import {
  LEAGUES_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'


describe('FplTeamDetails', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      fplTeam: FPL_TEAM_1,
      setTab: blank__,
      setAction: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <FplTeamDetails  />
      </RouteWithOutletContext>
    )
  }

  const tableRows = () => screen.getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')

  it('renders the fpl team details page', () => {
    customRender()

    expect(tableCell(0, 0)).toHaveTextContent('League')
    expect(link(0, 1)).toHaveAttribute('href', `${LEAGUES_URL}/${FPL_TEAM_1.league.id}`)
    expect(link(0, 1)).toHaveTextContent(FPL_TEAM_1.league.name)

    expect(tableCell(5, 0)).toHaveTextContent('Owner')
    expect(tableCell(5, 1)).toHaveTextContent(FPL_TEAM_1.owner.username)
  })

  it('renders the edit league button if isOwner = true', () => {
    customRender()

    expect(screen.getByText('Edit Fpl Team')).toHaveAttribute('href',`${FPL_TEAMS_URL}/${FPL_TEAM_1.id}/details/edit` )
  })

  it('does not render the edit league button if isOwner = false', () => {
    customRender({ fplTeam: { ...FPL_TEAM_1, isOwner: false } })

    expect(screen.queryByText('Edit FplTeam')).toBeNull()
  })
})
