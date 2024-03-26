import { fireEvent, within, render, screen } from '@testing-library/react'

import ConnectedLeaguesPage, { LeaguesPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import {
  PROFILE_URL,
  LEAGUES_URL,
  NEW_LEAGUE_URL,
  JOIN_LEAGUE_URL
} from 'utilities/constants'
import { LEAGUES } from 'test/fixtures'
import { initialFilterState } from 'state/leagues/reducer'

describe('LeaguesPage', () => {
  const connectedRender = (state = {}) => render(
    <MockedRouterStore
      defaultState={{
        leagues: { data: LEAGUES },
        ...state
      }}
    >
      <ConnectedLeaguesPage />
    </MockedRouterStore>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <LeaguesPage
        leagues={LEAGUES}
        fetchLeagues={blank__}
        updateSort={blank__}
        fetching={false}
        {...props}
      />
    </MockedRouter>
  )

  // const tableCell = (wrapper, i, j) => (
  //   wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  // )
  // const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  // const buttonLink = wrapper => wrapper.find('ButtonLink')


  const sortTable = () => screen.getByTestId('SortTable')
  const tableRows = () => within(sortTable()).getAllByRole('row')
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const sortButton = (text) => within(screen.getByText(text)).getByRole('button')

  it('renders button links', () => {
    customRender({ leagues: undefined })

    expect(screen.getByText('New League')).toHaveAttribute('href', `${PROFILE_URL}${NEW_LEAGUE_URL}`)
    expect(screen.getByText('Join a League')).toHaveAttribute('href', `${PROFILE_URL}${JOIN_LEAGUE_URL}`)
  })

  it('renders the league table', () => {
    connectedRender()

    expect(tableRows()).toHaveLength(LEAGUES.length + 1)

    expect(tableCell(1, 2)).toHaveTextContent(LEAGUES[0].owner.username)

    expect(link(2, 0)).toHaveAttribute('href', `${LEAGUES_URL}/${LEAGUES[1].id}`)
    expect(link(2, 0)).toHaveTextContent(LEAGUES[1].name)
  })


  it('triggers the fetchLeagues function on load', () => {
    const fetchLeagues = jest.fn()
    customRender({ fetchLeagues })

    expect(fetchLeagues).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers updateSort', () => {
    const updateSort = jest.fn()
    customRender({ updateSort })

    fireEvent.click(sortButton('N'))

    expect(updateSort).toHaveBeenCalledWith({ name: 'desc' })
  })
})
