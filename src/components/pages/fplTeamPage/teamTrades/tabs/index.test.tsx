import { fireEvent, render, screen, within } from '@testing-library/react'
import * as rrd from 'react-router-dom'

import TeamTradeTabs from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { INTER_TEAM_TRADE_GROUPS, FPL_TEAM_LISTS } from 'test/fixtures'
import { PLAYERS_URL, TEAMS_URL, FPL_TEAMS_URL } from 'utilities/constants'

const fplTeamId = '3'
const fplTeamName = 'Fpl Team Name'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(), // Mock the useParams hook
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('TeamTradeTabs', () => {
  beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({}))

  const customRender = (context = {}) => {
    const baseContext = {
      fplTeam: { isOwner: true },
      interTeamTradeGroups: { data: INTER_TEAM_TRADE_GROUPS },
      fplTeamList: { data: FPL_TEAM_LISTS[0] },
      fplTeamLists: { data: FPL_TEAM_LISTS },
      deadline: new Date(),
      selectedFplTeamListId: FPL_TEAM_LISTS[0].id,
      fplTeamId: fplTeamId,
      fplTeamName: fplTeamName,
      fetchInterTeamTradeGroups: blank__,
      removeTrade: blank__,
      setTab: blank__,
      setAction: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <TeamTradeTabs />
      </RouteWithOutletContext>  
    )
  }

  const teamTradeTabList = () => screen.getAllByRole('tablist')[1]
  const teamTradeTabs = () => within(teamTradeTabList()).getAllByRole('tab')

  const table = (i) => screen.getAllByRole('table')[i]
  const tableRows = (i) => within(table(i)).getAllByRole('row')
  const tableCells = (i, j) => within(tableRows(i)[j]).getAllByRole('cell')
  const tableCell = (i, j, k) => tableCells(i, j)[k]
  
  const cancel = (i, j, k) => within(tableCell(i, j, k)).getByRole('button', { name: /cancel/i })
  const cancelQuery = (i, j, k) => within(tableCell(i, j, k)).queryByRole('button', { name: /cancel/i })
  
  const addPlayer = (i, j, k)  => within(tableCell(i, j, k)).getByRole('link', { name: /add player/i })
  const addPlayerQuery = (i, j, k)  => within(tableCell(i, j, k)).queryByRole('link', { name: /add player/i })
  
  const submit = (i, j, k)  => within(tableCell(i, j, k)).getByRole('button', { name: /submit/i })
  const submitQuery = (i, j, k)  => within(tableCell(i, j, k)).queryByRole('button', { name: /submit/i })

  const removePlayer = (i, j, k)  => within(tableCell(i, j, k)).getByRole('button', { name: /remove player/i })

  const approve = (i, j, k)  => within(tableCell(i, j, k)).getByRole('button', { name: /approve/i })
  const approveQuery = (i, j, k)  => within(tableCell(i, j, k)).queryByRole('button', { name: /approve/i })

  const decline = (i, j, k)  => within(tableCell(i, j, k)).getByRole('button', { name: /decline/i })
  const declineQuery = (i, j, k)  => within(tableCell(i, j, k)).queryByRole('button', { name: /decline/i })
  
  const expandRow = (i, j) => within(tableCell(i, j, 0)).getByRole('button')
  
  const link = (i, j, k) => within(tableCell(i, j, k)).getByRole('link')
  
  const presentation = () => screen.queryAllByRole('presentation')
  const dialog = () => presentation()[1]
  const confirm = () => within(dialog()).getByRole('button', { name: /confirm/i })
  const cancelDialog = () => within(dialog()).getByRole('button', { name: /cancel/i })
  
  it('renders the outTrades by default', () => {
    customRender()

    expect(teamTradeTabs()).toHaveLength(2)
    expect(teamTradeTabs()[0]).toHaveAttribute('aria-selected', 'true')

    const { outTradeGroups } = INTER_TEAM_TRADE_GROUPS
    
    expect(tableCell(0, 1, 1)).toHaveTextContent(outTradeGroups[0].inFplTeam.name)
    expect(tableCell(0, 1, 2)).toHaveTextContent(outTradeGroups[0].status)
    
    // Submitted so canCancel = true but canApprove and canSubmit are false
    expect(cancel(0, 1, 3)).toBeInTheDocument()
    expect(addPlayerQuery(0, 1, 3)).not.toBeInTheDocument()
    expect(submitQuery(0, 1, 3)).not.toBeInTheDocument()

    expect(tableCell(0, 2, 1)).toHaveTextContent(outTradeGroups[1].inFplTeam.name)
    expect(tableCell(0, 2, 2)).toHaveTextContent(outTradeGroups[1].status)
    // Pending so canApprove, canSubmit and canCancel are all true
    expect(cancel(0, 2, 3)).toBeInTheDocument()
    expect(addPlayer(0, 2, 3)).toHaveAttribute('href', `${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/${outTradeGroups[1].id}/addPlayer`)
    expect(submit(0, 2, 3)).toBeInTheDocument()
 
    expect(tableCell(0, 3, 1)).toHaveTextContent(outTradeGroups[2].inFplTeam.name)
    expect(tableCell(0, 3, 2)).toHaveTextContent(outTradeGroups[2].status)
    // Approved so canApprove, canSubmit and canCancel are all false
    expect(cancelQuery(0, 3, 3)).not.toBeInTheDocument()
    expect(addPlayerQuery(0, 3, 3)).not.toBeInTheDocument()
    expect(submitQuery(0, 3, 3)).not.toBeInTheDocument()

    fireEvent.click(expandRow(0, 1)) // Expand to show trades

    expect(tableCells(1, 1)).toHaveLength(7)

    expect(link(1, 1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${outTradeGroups[0].trades[0].outPlayer.id}`)
    expect(link(1, 1, 1))
      .toHaveTextContent(`${outTradeGroups[0].trades[0].outPlayer.firstName} ${outTradeGroups[0].trades[0].outPlayer.lastName}`)

    expect(link(1, 1, 2)).toHaveAttribute('href', `${TEAMS_URL}/${outTradeGroups[0].trades[0].outTeam.id}/`)
    expect(link(1, 1, 2)).toHaveTextContent(`${outTradeGroups[0].trades[0].outTeam.shortName}`)

    expect(link(1, 1, 3)).toHaveAttribute('href', `${PLAYERS_URL}/${outTradeGroups[0].trades[0].inPlayer.id}`)
    expect(link(1, 1, 3))
      .toHaveTextContent(`${outTradeGroups[0].trades[0].inPlayer.firstName} ${outTradeGroups[0].trades[0].inPlayer.lastName}`)

    expect(link(1, 1, 4)).toHaveAttribute('href', `${TEAMS_URL}/${outTradeGroups[0].trades[0].inTeam.id}/`)
    expect(link(1, 1, 4)).toHaveTextContent(`${outTradeGroups[0].trades[0].inTeam.shortName}`)

    expect(tableCell(1, 1, 5)).toHaveTextContent(`${outTradeGroups[0].trades[0].position}`)

    expect(removePlayer(1, 1, 6)).toBeInTheDocument() // Can cancel = true

    expect(link(1, 2, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${outTradeGroups[0].trades[1].outPlayer.id}`)
    expect(link(1, 2, 1))
      .toHaveTextContent(`${outTradeGroups[0].trades[1].outPlayer.firstName} ${outTradeGroups[0].trades[1].outPlayer.lastName}`)

    expect(link(1, 2, 2)).toHaveAttribute('href', `${TEAMS_URL}/${outTradeGroups[0].trades[1].outTeam.id}/`)
    expect(link(1, 2, 2)).toHaveTextContent(`${outTradeGroups[0].trades[1].outTeam.shortName}`)

    expect(link(1, 2, 3)).toHaveAttribute('href', `${PLAYERS_URL}/${outTradeGroups[0].trades[1].inPlayer.id}`)
    expect(link(1, 2, 3))
      .toHaveTextContent(`${outTradeGroups[0].trades[1].inPlayer.firstName} ${outTradeGroups[0].trades[1].inPlayer.lastName}`)

    expect(link(1, 2, 4)).toHaveAttribute('href', `${TEAMS_URL}/${outTradeGroups[0].trades[1].inTeam.id}/`)
    expect(link(1, 2, 4)).toHaveTextContent(`${outTradeGroups[0].trades[1].inTeam.shortName}`)

    expect(tableCell(1, 2, 5)).toHaveTextContent(`${outTradeGroups[0].trades[1].position}`)

    // Submitted so canCancel = true
    expect(removePlayer(1, 2, 6)).toBeInTheDocument()

    fireEvent.click(expandRow(0, 1)) // Close expanable row

    fireEvent.click(expandRow(0, 3))

    expect(tableCells(1, 1)).toHaveLength(6) // Status is approved so remove player cell not present

    expect(link(1, 1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${outTradeGroups[2].trades[0].outPlayer.id}`)
    expect(link(1, 1, 1))
      .toHaveTextContent(`${outTradeGroups[2].trades[0].outPlayer.firstName} ${outTradeGroups[2].trades[0].outPlayer.lastName}`)

    expect(link(1, 1, 2)).toHaveAttribute('href', `${TEAMS_URL}/${outTradeGroups[2].trades[0].outTeam.id}/`)
    expect(link(1, 1, 2)).toHaveTextContent(`${outTradeGroups[2].trades[0].outTeam.shortName}`)

    expect(link(1, 1, 3)).toHaveAttribute('href', `${PLAYERS_URL}/${outTradeGroups[2].trades[0].inPlayer.id}`)
    expect(link(1, 1, 3))
      .toHaveTextContent(`${outTradeGroups[2].trades[0].inPlayer.firstName} ${outTradeGroups[2].trades[0].inPlayer.lastName}`)

    expect(link(1, 1, 4)).toHaveAttribute('href', `${TEAMS_URL}/${outTradeGroups[2].trades[0].inTeam.id}/`)
    expect(link(1, 1, 4)).toHaveTextContent(`${outTradeGroups[2].trades[0].inTeam.shortName}`)

    expect(tableCell(1, 1, 5)).toHaveTextContent(`${outTradeGroups[2].trades[0].position}`)
  })

  it('can submit an inter team trade', () => {
    const submitInterTeamTradeGroup = jest.fn()
    customRender({ submitInterTeamTradeGroup })

    fireEvent.click(submit(0, 2, 3))

    const { outTradeGroups } = INTER_TEAM_TRADE_GROUPS
    const { trades } = outTradeGroups[1]
    const {
      outPlayer: { firstName: outFirstName, lastName: outLastName },
      inPlayer: { firstName: inFirstName, lastName: inLastName }
    } = trades[0]

    expect(dialog())
      .toHaveTextContent(`Confirm SubmitOut: ${outFirstName} ${outLastName}In: ${inFirstName} ${inLastName}`)

    fireEvent.click(confirm())

    expect(dialog().style.opacity).toEqual('0') // Dialog closed

    expect(submitInterTeamTradeGroup).toHaveBeenCalledWith(outTradeGroups[1].id)
  })

  it('can close the dialog without triggering the confirm action', () => {
    const submitInterTeamTradeGroup = jest.fn()
    customRender({ submitInterTeamTradeGroup })

    fireEvent.click(submit(0, 2, 3))
    
    fireEvent.click(cancelDialog())
    
    expect(dialog().style.opacity).toEqual('0') // Dialog closed

    expect(submitInterTeamTradeGroup).not.toHaveBeenCalled()
  })

  it('closes the draft dialog when the backdrop is clicked without triggering the confirm action', () => {
    const submitInterTeamTradeGroup = jest.fn()
    customRender({ submitInterTeamTradeGroup })

    fireEvent.click(submit(0, 2, 3))

    const backdrop = document.querySelector('.MuiBackdrop-root')

    if (backdrop) {
      fireEvent.click(backdrop)
    } else {
      throw new Error('.MuiBackdrop-root not found')
    }

    expect(dialog().style.opacity).toEqual('0')

    expect(submitInterTeamTradeGroup).not.toHaveBeenCalled()
  })

  it('can cancel an inter team trade', () => {
    const cancelInterTeamTradeGroup = jest.fn()
    customRender({ cancelInterTeamTradeGroup })

    fireEvent.click(cancel(0, 2, 3))

    const { outTradeGroups } = INTER_TEAM_TRADE_GROUPS
    const { trades } = outTradeGroups[1]
    const {
      outPlayer: { firstName: outFirstName, lastName: outLastName },
      inPlayer: { firstName: inFirstName, lastName: inLastName }
    } = trades[0]

    expect(dialog())
      .toHaveTextContent(`Confirm CancelOut: ${outFirstName} ${outLastName}In: ${inFirstName} ${inLastName}`)

    fireEvent.click(confirm())
    expect(dialog().style.opacity).toEqual('0')

    expect(cancelInterTeamTradeGroup).toHaveBeenCalledWith(outTradeGroups[1].id)
  })

  it('can remove a trade from an inter team trade group', () => {
    const removeTrade = jest.fn()
    customRender({ removeTrade })
    
    fireEvent.click(expandRow(0, 1)) // Expand to show trades
    fireEvent.click(removePlayer(1, 2, 6)) // Click remove player

    const { outTradeGroups } = INTER_TEAM_TRADE_GROUPS
    const { trades } = outTradeGroups[0]
    const {
      outPlayer: { firstName: outFirstName, lastName: outLastName },
      inPlayer: { firstName: inFirstName, lastName: inLastName }
    } = trades[1]

    expect(dialog())
      .toHaveTextContent(`Confirm Remove TradeOut: ${outFirstName} ${outLastName}In: ${inFirstName} ${inLastName}`)

    fireEvent.click(confirm())
    expect(dialog().style.opacity).toEqual('0')

    expect(removeTrade).toHaveBeenCalledWith(trades[1].id)
  })

  it('triggers fetchInterTeamTradeGroups on render', () => {
    const fetchInterTeamTradeGroups = jest.fn()

    customRender({ fetchInterTeamTradeGroups })

    expect(fetchInterTeamTradeGroups).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
  })

  it('renders nothing if selectedFplTeamListId is undefined', () => {
    const fetchInterTeamTradeGroups = jest.fn()
    customRender({ selectedFplTeamListId: undefined, fetchInterTeamTradeGroups })

    expect(screen.queryByTestId('TeamTradeTabs')).not.toBeInTheDocument()
    expect(fetchInterTeamTradeGroups).not.toHaveBeenCalled()
  })

  it('renders nothing if selectedFplTeamListId is undefined', () => {
    customRender({ selectedFplTeamListId: undefined })

    expect(screen.queryByTestId('TeamTradeTabs')).not.toBeInTheDocument()
  })

  it('renders an empty table when outTradeGroups is empty', () => {
    customRender({ interTeamTradeGroups: { data: { outTradeGroups: undefined } } })

    expect(tableRows(0)).toHaveLength(1) // Just the headercell row rendered
  })

  describe('when action = in', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ action: 'in' }))

    it('renders the inTrades if the action = in', () => {
      customRender()
      const { inTradeGroups } = INTER_TEAM_TRADE_GROUPS
      
      expect(tableCell(0, 1, 1)).toHaveTextContent(inTradeGroups[0].outFplTeam.name)
      expect(tableCell(0, 1, 2)).toHaveTextContent(inTradeGroups[0].status)
  
      expect(approve(0, 1, 3)).toBeInTheDocument()
      expect(decline(0, 1, 3)).toBeInTheDocument()
      
      expect(tableCells(0, 2)).toHaveLength(4)
      expect(tableCell(0, 2, 1)).toHaveTextContent(inTradeGroups[1].outFplTeam.name)
      expect(tableCell(0, 2, 2)).toHaveTextContent(inTradeGroups[1].status)
      // Status = Approved so can't approve or decline
      expect(approveQuery(0, 2, 3)).not.toBeInTheDocument()
      expect(declineQuery(0, 2, 3)).not.toBeInTheDocument()

      fireEvent.click(expandRow(0, 1)) // Open expanable row
  
      expect(link(1, 1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${inTradeGroups[0].trades[0].inPlayer.id}`)
      expect(link(1, 1, 1))
        .toHaveTextContent(`${inTradeGroups[0].trades[0].inPlayer.firstName} ${inTradeGroups[0].trades[0].inPlayer.lastName}`)
  
      expect(link(1, 1, 2)).toHaveAttribute('href', `${TEAMS_URL}/${inTradeGroups[0].trades[0].inTeam.id}/`)
      expect(link(1, 1, 2)).toHaveTextContent(`${inTradeGroups[0].trades[0].inTeam.shortName}`)
  
      expect(link(1, 1, 3)).toHaveAttribute('href', `${PLAYERS_URL}/${inTradeGroups[0].trades[0].outPlayer.id}`)
      expect(link(1, 1, 3))
        .toHaveTextContent(`${inTradeGroups[0].trades[0].outPlayer.firstName} ${inTradeGroups[0].trades[0].outPlayer.lastName}`)
  
      expect(link(1, 1, 4)).toHaveAttribute('href', `${TEAMS_URL}/${inTradeGroups[0].trades[0].outTeam.id}/`)
      expect(link(1, 1, 4)).toHaveTextContent(`${inTradeGroups[0].trades[0].outTeam.shortName}`)
  
      expect(tableCell(1, 1, 5)).toHaveTextContent(`${inTradeGroups[0].trades[0].position}`)
    })

    it('can approve an inter team trade', () => {
      const approveInterTeamTradeGroup = jest.fn()
      customRender({ approveInterTeamTradeGroup })

      fireEvent.click(approve(0, 1, 3))

      const { inTradeGroups } = INTER_TEAM_TRADE_GROUPS
      const { trades } = inTradeGroups[0]
      const {
        outPlayer: { firstName: outFirstName, lastName: outLastName },
        inPlayer: { firstName: inFirstName, lastName: inLastName }
      } = trades[0]

      expect(dialog())
        .toHaveTextContent(`Confirm ApproveOut: ${inFirstName} ${inLastName}In: ${outFirstName} ${outLastName}`)

      fireEvent.click(confirm())
      expect(dialog().style.opacity).toEqual('0')

      expect(approveInterTeamTradeGroup).toHaveBeenCalledWith(inTradeGroups[0].id)
    })

    it('can decline an inter team trade', () => {
      const declineInterTeamTradeGroup = jest.fn()
      customRender({ declineInterTeamTradeGroup })

      fireEvent.click(decline(0, 1, 3))

      const { inTradeGroups } = INTER_TEAM_TRADE_GROUPS
      const { trades } = inTradeGroups[0]
      const {
        outPlayer: { firstName: outFirstName, lastName: outLastName },
        inPlayer: { firstName: inFirstName, lastName: inLastName }
      } = trades[0]

      expect(dialog())
        .toHaveTextContent(`Confirm DeclineOut: ${inFirstName} ${inLastName}In: ${outFirstName} ${outLastName}`)

      fireEvent.click(confirm())
      expect(dialog().style.opacity).toEqual('0')

      expect(declineInterTeamTradeGroup).toHaveBeenCalledWith(inTradeGroups[0].id)
    })

    it('renders an empty table when inTradeGroups is empty', () => {
      customRender({ interTeamTradeGroups: { data: { inTradeGroups: undefined } } })
  
      expect(tableRows(0)).toHaveLength(1) // Just the headercell row rendered
    })
  })
})