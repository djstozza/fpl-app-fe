import { within, fireEvent, render, screen } from '@testing-library/react'

import FplTeamsTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { LIVE_LEAGUE, INITIALIZED_LEAGUE, FPL_TEAMS } from 'test/fixtures'
import { initialFilterState } from 'state/league/reducer'
import { FPL_TEAMS_URL } from 'utilities/constants'

describe('FplTeamsTable', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      leagueId: LIVE_LEAGUE.id,
      league: LIVE_LEAGUE,
      fplTeams: FPL_TEAMS,
      fetchFplTeams: blank__,
      generateDraftPicks: blank__,
      createDraft: blank__,
      updateFplTeamsSort: blank__,
      setTab: blank__,
      setAction: blank__,
      ...context
    }

    return render(
      <RouteWithOutletContext context={baseContext}>
        <FplTeamsTable />
      </RouteWithOutletContext>
    )
  }

  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')

  const sortButton = (text) => within(screen.getByText(text)).getByRole('button')

  it('renders the fpl teams table', () => {
    customRender()

    expect(link(1, 0)).toHaveAttribute('href', `${FPL_TEAMS_URL}/${FPL_TEAMS[0].id}`)
    expect(link(1, 0)).toHaveTextContent(FPL_TEAMS[0].name)

    expect(tableCell(2, 1)).toHaveTextContent(String(FPL_TEAMS[1].rank))

    expect(tableCell(3, 2)).toHaveTextContent(String(FPL_TEAMS[2].totalScore))
  })

  it('shows all columns', () => {
    customRender()

    expect(screen.queryByLabelText('Draft Pick')).toBeInTheDocument()
    expect(screen.queryByLabelText('Minidraft Pick')).toBeInTheDocument()
    expect(screen.queryByLabelText('Rank')).toBeInTheDocument()
    expect(screen.queryByLabelText('Total Score')).toBeInTheDocument()

  })
  it('does not show the draftPickNumber column if showDraftPickColumn = false', () => {
    customRender({ leagueId: INITIALIZED_LEAGUE.id, league: INITIALIZED_LEAGUE })
    expect(screen.queryByLabelText('Draft Pick')).not.toBeInTheDocument()
  })

  it('does not show the live columns if showLiveColumns = false', () => {
    customRender({ leagueId: INITIALIZED_LEAGUE.id, league: INITIALIZED_LEAGUE, fplTeams: undefined })
    
    expect(screen.queryByLabelText('Minidraft Pick')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Rank')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Total Score')).not.toBeInTheDocument()
  })

  it('triggers fetchFplTeams, setTab and setAction on render', () => {
    const fetchFplTeams = jest.fn()
    const setTab = jest.fn()
    const setAction = jest.fn()
    customRender({ fetchFplTeams, setTab, setAction })

    expect(fetchFplTeams).toHaveBeenCalledWith({ id: LIVE_LEAGUE.id, ...initialFilterState })
    expect(setTab).toHaveBeenCalledWith('fplTeams')
    expect(setAction).toHaveBeenCalledWith()
  })

  it('triggers updateFplTeamsSort', () => {
    const updateFplTeamsSort = jest.fn()
    customRender({ updateFplTeamsSort })

    fireEvent.click(sortButton('N'))
    expect(updateFplTeamsSort).toHaveBeenCalledWith({ sort: { name: 'desc' } })
  })
})
