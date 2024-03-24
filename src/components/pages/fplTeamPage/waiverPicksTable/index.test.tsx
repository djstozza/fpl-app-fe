import { fireEvent, render, screen, within } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'

import WaiverPicksTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { WAIVER_PICKS, TRADES, FPL_TEAM_LISTS } from 'test/fixtures'
import {
  PLAYERS_URL,
  TEAMS_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'

const fplTeamId = '3'

const changeWaiverPickOrder = jest.fn()

const errors = [
  {
    detail: 'You cannot draft players at this time',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  },
  {
    detail: 'You cannot pick out of turn',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  },
  {
    detail: 'Player has already been taken',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  }
]

describe('WaiverPicksTable', () => {
  const originalWindowLocation = window.location
  
  const customRender = (context = {}, path = "/") => {
    const baseContext = {
      fplTeamId: fplTeamId,
      fplTeam: { isOwner: true },
      selectedFplTeamListId: FPL_TEAM_LISTS[0].id, 
      waiverPicks: { data: WAIVER_PICKS, errors: [] },
      fplTeamList: { data: FPL_TEAM_LISTS[0] },
      fplTeamLists: { data: FPL_TEAM_LISTS },
      trades: { data: TRADES, errors: [] },
      changeWaiverPickOrder: changeWaiverPickOrder,
      isWaiver: true,
      fetchWaiverPicks: blank__,
      fetchTrades: blank__, 
      setTab: blank__,
      setAction: blank__,
      ...context
    }
  
    return render(
      <RouteWithOutletContext context={baseContext} path={path}>
        <SnackbarProvider maxSnack={3}>
          <WaiverPicksTable />
        </SnackbarProvider>
      </RouteWithOutletContext>
    )
  }

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalWindowLocation,
    })
  })

  const tabPanelTabs = () => within(screen.getByRole('tablist')).getAllByRole('tab')
  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const combobox = (i, j) => within(tableCell(i, j)).getByRole('combobox')
  const listboxOptions = () => within(screen.getByRole('listbox')).getAllByRole('option')

  const alert = () => screen.getAllByRole('alert')

  describe('showTrades = false', () => {
    const path = `${FPL_TEAMS_URL}/${FPL_TEAM_LISTS[0].id}/waiverPicks`
    beforeEach(() => {
      const expectedUrl = `https://www.example.com${path}`
      window.location.href = expectedUrl
    })

    it('renders the waiver picks table and the round selectors', () => {
      customRender({}, path)

      expect(tableCells(1)).toHaveLength(6)
      expect(tabPanelTabs()).toHaveLength(FPL_TEAM_LISTS.length)

      expect(link(1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${WAIVER_PICKS[0].outPlayer.id}`)
      expect(link(1, 1))
        .toHaveTextContent(`${WAIVER_PICKS[0].outPlayer.firstName} ${WAIVER_PICKS[0].outPlayer.lastName}`)
      expect(link(1, 3))
        .toHaveTextContent(`${WAIVER_PICKS[0].inPlayer.firstName} ${WAIVER_PICKS[0].inPlayer.lastName}`)
      expect(tableCell(1, 5)).toHaveTextContent(WAIVER_PICKS[0].status)

      expect(tableCell(2, 0)).toHaveTextContent(String(WAIVER_PICKS[1].pickNumber))

      expect(link(2, 2)).toHaveAttribute('href', `${TEAMS_URL}/${WAIVER_PICKS[1].outTeam.id}/`)
      expect(link(2, 2)).toHaveTextContent(`${WAIVER_PICKS[1].outTeam.shortName}`)

      expect(link(2, 4)).toHaveAttribute('href', `${TEAMS_URL}/${WAIVER_PICKS[1].inTeam.id}/`)
      expect(link(2, 4)).toHaveTextContent(`${WAIVER_PICKS[1].inTeam.shortName}`)
    })

    it('triggers fetchWaiverPicks, setAction and setTab, on render', () => {
      const fetchWaiverPicks = jest.fn()
      const setAction = jest.fn()
      const setTab = jest.fn()
      customRender({ fetchWaiverPicks, setAction, setTab }, path)

      expect(fetchWaiverPicks).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
      expect(setTab).toHaveBeenCalledWith('waiverPicks')
      expect(setAction).toHaveBeenCalledWith()
    })

    it('triggers changeWaiverPickOrder when the picknumbers are clicked if before waiverDeadline', () => {
      customRender({}, path)
      
      fireEvent.keyDown(combobox(1, 0), { key: 'ArrowDown', code: 'ArrowDown' })
      
      fireEvent.click(listboxOptions()[listboxOptions().length - 1])

      expect(changeWaiverPickOrder)
        .toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id, WAIVER_PICKS[0].id, WAIVER_PICKS[1].pickNumber)
    })

    it('does not allow the switching of waiver picks if isOwner = false', () => {
      customRender({ fplTeam: { isOwner: false } }, path)
     
      expect(screen.queryAllByRole('combobox')).toHaveLength(0)
    })

    it('does not allow the switching of waiver picks if the round is not current', () => {
      customRender({ fplTeamList: { data: { round: { current: false } } } }, path)

      expect(screen.queryAllByRole('combobox')).toHaveLength(0)
    })

    it('does not allow the switching of waiver picks if no fplTeamListData', () => {
      customRender({ fplTeamList: { data: undefined } }, path)

      expect(screen.queryAllByRole('combobox')).toHaveLength(0)
    })

    it('does not allow the switching of waiver picks if isWaiver = false', () => {
      customRender({ isWaiver: false }, path)

      expect(screen.queryAllByRole('combobox')).toHaveLength(0)
    })

    it('renders errors if present', () => {
      customRender({ waiverPicks: { data: WAIVER_PICKS, errors } }, path)

      expect(alert()).toHaveLength(3)
    })

    it('returns nothing if selectedFplTeamListId is undefiend', () => {
      customRender({ selectedFplTeamListId: undefined }, path)

      expect(screen.queryByTestId('WaiverPicksTable')).not.toBeInTheDocument()
    })
  })

  describe('showTrades = true', () => {
    const path = `${FPL_TEAMS_URL}/${FPL_TEAM_LISTS[0].id}/trades`
    
    beforeEach(() => {
      const expectedUrl = `https://www.example.com${path}`
      window.location.href = expectedUrl
    })

    it('renders the waiver picks table and the round selectors', () => {
      customRender({ isWaiver: false }, path)

      expect(tableCells(1)).toHaveLength(4)
      expect(tabPanelTabs()).toHaveLength(FPL_TEAM_LISTS.length)

      expect(link(1, 0)).toHaveAttribute('href', `${PLAYERS_URL}/${TRADES[0].outPlayer.id}`)
      expect(link(1, 0)).toHaveTextContent(`${TRADES[0].outPlayer.firstName} ${TRADES[0].outPlayer.lastName}`)

      expect(link(1, 2)).toHaveAttribute('href', `${PLAYERS_URL}/${TRADES[0].inPlayer.id}`)
      expect(link(1, 2)).toHaveTextContent(`${TRADES[0].inPlayer.firstName} ${TRADES[0].inPlayer.lastName}`)

      expect(link(2, 1)).toHaveAttribute('href', `${TEAMS_URL}/${TRADES[1].outTeam.id}/`)
      expect(link(2, 1)).toHaveTextContent(`${TRADES[1].outTeam.shortName}`)

      expect(link(2, 3)).toHaveAttribute('href', `${TEAMS_URL}/${TRADES[1].inTeam.id}/`)
      expect(link(2, 3)).toHaveTextContent(`${TRADES[1].inTeam.shortName}`)
    })

    it('triggers fetchTrades on render', () => {
      const fetchTrades = jest.fn()
      customRender({ fetchTrades }, path)

      expect(fetchTrades).toHaveBeenCalled()
    })

    it('returns nothing if selectedFplTeamListId is undefiend', () => {
      customRender({ selectedFplTeamListId: undefined }, path)

      expect(screen.queryByTestId('WaiverPicksTable')).not.toBeInTheDocument()
    })
  })
})
