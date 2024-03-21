import { within, render, screen, fireEvent, act } from '@testing-library/react'
import WS from 'jest-websocket-mock'
import { SnackbarProvider } from 'notistack'
import moment from 'moment'

import FplTeamListChart from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { LIST_POSITIONS, FPL_TEAM_LISTS, WEST_HAM_TEAM_BASE } from 'test/fixtures'

const fplTeamId = '1'

const errors = [
  {
    detail: 'You cannot substitute players at this time',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  }
]


jest.mock('@rails/actioncable', () => ({
  createConsumer: () => ({
    subscriptions: {
      create: (_, handlers) => {
        // Save the received handler so we can call it later
        global.receivedHandler = handlers.received
      }
    }
  })
}))

afterEach(() => {
  jest.clearAllMocks();
})

describe('FplTeamListChart', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      fplTeam: { isOwner: true },
      fplTeamId: fplTeamId,
      fplTeamLists: { data: FPL_TEAM_LISTS },
      fplTeamList: { data: FPL_TEAM_LISTS[0], listPositions: LIST_POSITIONS, errors: [] },
      listPosition: { validSubstitutions: undefined, fetching: false },
      selectedFplTeamListId: FPL_TEAM_LISTS[0].id,
      fetchValidSubstitutions: blank__,
      processSubstitution: blank__,
      clearValidSubstitutions: blank__,
      fetchFplTeamList: blank__,
      setTab: blank__,
      setAction: blank__,
      ...context
    }
    
    return render(
      <RouteWithOutletContext context={baseContext}>
        <SnackbarProvider maxSnack={3}>
          <FplTeamListChart />
        </SnackbarProvider>
      </RouteWithOutletContext>
    )
  }

  const starting = () => screen.getAllByTestId('starting')
  const substitute = () => screen.getByTestId('substitute')
  const startingPlayers = i => within(starting()[i]).getAllByTestId('ListPositionBox')
  const substitutePlayers = () => within(substitute()).getAllByTestId('ListPositionBox')
  const alerts = () => screen.queryAllByRole('alert')
  
  it('renders the chart', () => {
    customRender()

    expect(starting()).toHaveLength(4)
    expect(substitute()).toBeInTheDocument()
    
    expect(starting()[0].className).toContain('startingRow')
    expect(startingPlayers(0)).toHaveLength(3)
    expect(startingPlayers(0)[0]).toHaveTextContent((
      `${LIST_POSITIONS[0].player.lastName}${LIST_POSITIONS[0].opponent.shortName} ` +
        `(${LIST_POSITIONS[0].leg})${LIST_POSITIONS[0].totalPoints}`
    ))
    expect(startingPlayers(0)[1]).toHaveTextContent(
      `${LIST_POSITIONS[1].player.lastName}${LIST_POSITIONS[1].opponent.shortName} ` +
        `(${LIST_POSITIONS[1].leg})${LIST_POSITIONS[1].totalPoints}`
    )
    expect(startingPlayers(0)[2]).toHaveTextContent(
      `${LIST_POSITIONS[2].player.lastName}${LIST_POSITIONS[2].opponent.shortName} ` +
        `(${LIST_POSITIONS[2].leg})${LIST_POSITIONS[2].totalPoints}`
    )

    expect(starting()[1].className).toContain('startingRow')
    expect(startingPlayers(1)).toHaveLength(4)
    expect(startingPlayers(1)[0]).toHaveTextContent(
      `${LIST_POSITIONS[3].player.lastName}${LIST_POSITIONS[3].opponent.shortName} ` +
        `(${LIST_POSITIONS[3].leg})${LIST_POSITIONS[3].totalPoints}`
    )
    expect(startingPlayers(1)[1]).toHaveTextContent(
      `${LIST_POSITIONS[4].player.lastName}${LIST_POSITIONS[4].opponent.shortName} ` +
        `(${LIST_POSITIONS[4].leg})${LIST_POSITIONS[4].totalPoints}`
    )
    expect(startingPlayers(1)[2]).toHaveTextContent(
      `${LIST_POSITIONS[5].player.lastName}${LIST_POSITIONS[5].opponent.shortName} ` +
        `(${LIST_POSITIONS[5].leg})${LIST_POSITIONS[5].totalPoints}`
    )
    expect(startingPlayers(1)[3]).toHaveTextContent(
      `${LIST_POSITIONS[6].player.lastName}${LIST_POSITIONS[6].opponent.shortName} ` +
        `(${LIST_POSITIONS[6].leg})${LIST_POSITIONS[6].totalPoints}`
    )

    expect(starting()[2].className).toContain('startingRow')
    expect(startingPlayers(2)).toHaveLength(3)
    expect(startingPlayers(2)[0]).toHaveTextContent(
      `${LIST_POSITIONS[7].player.lastName}${LIST_POSITIONS[7].opponent.shortName} ` +
        `(${LIST_POSITIONS[7].leg})${LIST_POSITIONS[7].totalPoints}`
    )
    expect(startingPlayers(2)[1]).toHaveTextContent(
      `${LIST_POSITIONS[8].player.lastName}${LIST_POSITIONS[8].opponent.shortName} ` +
        `(${LIST_POSITIONS[8].leg})${LIST_POSITIONS[8].totalPoints}`
    )
    expect(startingPlayers(2)[2]).toHaveTextContent(
      `${LIST_POSITIONS[9].player.lastName}${LIST_POSITIONS[9].opponent.shortName} ` +
        `(${LIST_POSITIONS[9].leg})${LIST_POSITIONS[9].totalPoints}`
    )

    expect(starting()[3].className).toContain('startingRow')
    expect(startingPlayers(3)[0]).toHaveTextContent(
      `${LIST_POSITIONS[10].player.lastName}${LIST_POSITIONS[10].opponent.shortName} ` +
        `(${LIST_POSITIONS[10].leg})${LIST_POSITIONS[10].totalPoints}`
    )

    expect(substitute().className).toContain('substitutesContainer')
    expect(substitutePlayers()).toHaveLength(4)

    expect(substitutePlayers()[0]).toHaveTextContent(
      `${LIST_POSITIONS[11].player.lastName}${LIST_POSITIONS[11].opponent.shortName} ` +
        `(${LIST_POSITIONS[11].leg})${LIST_POSITIONS[11].totalPoints}`
    )
    expect(substitutePlayers()[1]).toHaveTextContent(
      `${LIST_POSITIONS[12].player.lastName}${LIST_POSITIONS[12].opponent.shortName} ` +
        `(${LIST_POSITIONS[12].leg})${LIST_POSITIONS[12].totalPoints}`
    )
    expect(substitutePlayers()[2]).toHaveTextContent(
      `${LIST_POSITIONS[13].player.lastName}${LIST_POSITIONS[13].opponent.shortName} ` +
        `(${LIST_POSITIONS[13].leg})${LIST_POSITIONS[13].totalPoints}`
    )
    expect(substitutePlayers()[3]).toHaveTextContent(
      `${LIST_POSITIONS[14].player.lastName}${LIST_POSITIONS[14].opponent.shortName} ` +
        `(${LIST_POSITIONS[14].leg})${LIST_POSITIONS[14].totalPoints}`
    )
  })

  it('consolidates fixtures if a player has more than one fixture in a round', () => {
    const listPositions = [
      ...LIST_POSITIONS,
      {
        ...LIST_POSITIONS[0],
        leg: 'H',
        totalPoints: 3,
        opponent: WEST_HAM_TEAM_BASE
      }]

    customRender({ fplTeamList: { data: FPL_TEAM_LISTS[0], listPositions, errors: [] } })

    expect(startingPlayers(0)[0]).toHaveTextContent(
      `${LIST_POSITIONS[0].player.lastName}${LIST_POSITIONS[0].opponent.shortName} ` +
        `(${LIST_POSITIONS[0].leg})${listPositions[15].opponent.shortName} (${listPositions[15].leg})` +
        `${LIST_POSITIONS[0].totalPoints + listPositions[15].totalPoints}`
    )
  })

  it('consolidates fixtures if a player has more than one fixture in a round', () => {
    const listPositions = [
      ...LIST_POSITIONS,
      {
        ...LIST_POSITIONS[0],
        leg: 'H',
        totalPoints: undefined,
        opponent: WEST_HAM_TEAM_BASE,
        minutes: undefined,
      }]

    customRender({ fplTeamList: { data: FPL_TEAM_LISTS[0], listPositions, errors: [] } })

    expect(startingPlayers(0)[0]).toHaveTextContent(
      `${LIST_POSITIONS[0].player.lastName}${LIST_POSITIONS[0].opponent.shortName} ` +
        `(${LIST_POSITIONS[0].leg})${listPositions[15].opponent.shortName} (${listPositions[15].leg})` +
        `${LIST_POSITIONS[0].totalPoints}`
    )
  })

  it('processes substitutions if valid', () => {
    const scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    const deadlineTime = moment().add(2, 'days').toDate()
    const fplTeamList = {
      ...FPL_TEAM_LISTS[0],
      round: {
        ...FPL_TEAM_LISTS[0].round,
        deadlineTime
      }
    }

    const fetchValidSubstitutions = jest.fn()
    const processSubstitution = jest.fn()

    const validSubstitutions = [LIST_POSITIONS[11].id, LIST_POSITIONS[12].id, LIST_POSITIONS[13].id]

    customRender({
      fplTeamList: { data: fplTeamList, listPositions: LIST_POSITIONS, errors: [] },
      listPosition: { validSubstitutions, fetching: false },
      fetchValidSubstitutions,
      processSubstitution
    })

    fireEvent.click(startingPlayers(0)[1])

    expect(fetchValidSubstitutions).toHaveBeenCalledWith(LIST_POSITIONS[1].id)
    expect(scrollIntoViewMock).toHaveBeenCalled()
    expect(startingPlayers(0)[1].className).toContain('selected')

    expect(substitutePlayers()[0].className).toContain('validSubstitution')
    expect(substitutePlayers()[1].className).toContain('validSubstitution')
    expect(substitutePlayers()[2].className).toContain('validSubstitution')

    // Can't process
    expect(startingPlayers(2)[0].className).not.toContain('validSubstitution')
    fireEvent.click(startingPlayers(2)[0])
    expect(processSubstitution).not.toHaveBeenCalled()

    fireEvent.click(substitutePlayers()[2])
  
    expect(processSubstitution).toHaveBeenCalledWith(
      FPL_TEAM_LISTS[0].id,
      LIST_POSITIONS[1].id,
      LIST_POSITIONS[13].id
    )

    expect(startingPlayers(0)[1].className).not.toContain('selected')
  })

  it('unselects the selected list position if clicked twice', () => {
    const deadlineTime = moment().add(2, 'days').toDate()
    const fplTeamList = {
      ...FPL_TEAM_LISTS[0],
      round: {
        ...FPL_TEAM_LISTS[0].round,
        deadlineTime
      }
    }
    customRender({
      fplTeamList: { data: fplTeamList, listPositions: LIST_POSITIONS, errors: [] },
    })

    fireEvent.click(substitutePlayers()[0])
    expect(substitutePlayers()[0].className).toContain('selected')

    fireEvent.click(substitutePlayers()[0])
    expect(substitutePlayers()[0].className).not.toContain('selected')
  })

  it('does not select a list position if the deadline time has passed', () => {
    const deadlineTime = moment().subtract(2, 'days').toDate()
    const fplTeamList = {
      ...FPL_TEAM_LISTS[0],
      round: {
        ...FPL_TEAM_LISTS[0].round,
        deadlineTime
      }
    }
    const fetchValidSubstitutions = jest.fn()
    const processSubstitution = jest.fn()

    customRender({
      fplTeamList: { data: fplTeamList, listPositions: LIST_POSITIONS, errors: [] },
      fetchValidSubstitutions,
      processSubstitution
    })

    fireEvent.click(startingPlayers(1)[1])
    expect(fetchValidSubstitutions).not.toHaveBeenCalled()
    expect(processSubstitution).not.toHaveBeenCalled()
  })

  it('renders nothing if there is no fplTeamList', () => {
    customRender({ fplTeamList: { data: undefined, errors: [] } })
    expect(screen.queryByTestId('FplTeamListChart')).not.toBeInTheDocument()
  })

  it('renders nothing if there are no listPositions', () => {
    customRender({ fplTeamList: { data: FPL_TEAM_LISTS[0], listPositions: [], errors: [] } })

    expect(screen.queryByTestId('FplTeamListChart')).not.toBeInTheDocument()
  })

  it('renders nothing if there is no selectedFplTeamListId', () => {
    customRender({ selectedFplTeamListId: undefined })

    expect(screen.queryByTestId('FplTeamListChart')).not.toBeInTheDocument()
  })

  it('shows errors with the snackbar when present', () => {
    customRender({ fplTeamList: { data: FPL_TEAM_LISTS[0], listPositions: LIST_POSITIONS, errors } })

    expect(alerts()[0]).toHaveTextContent('You cannot substitute players at this time')
  })

  it('sets the tab and the action', () => {
    const setTab = jest.fn()
    const setAction = jest.fn()
    customRender({ setTab, setAction })

    expect(setTab).toHaveBeenCalledWith('teamLists')
    expect(setAction).toHaveBeenCalled()
  })

  describe('receiving and handles WebSocket messages',  () => {
    const server = new WS("ws://localhost:1234")
    new WebSocket("ws://localhost:1234")

    const message = 'This is a test message'

    beforeEach(async () => { await server.connected })

    afterEach(() => server.close())

    it('calls fetchFplTeamList', async () => {
      const fetchFplTeamList = jest.fn()
      customRender({ fetchFplTeamList })
  
      act(() => global.receivedHandler({ updatedAt: 1, message }))

      expect(fetchFplTeamList).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
    })

    it('does not call fetchFplTeamList if updatedAt < fplTeamListUpdatedAt', () => {
      const fetchFplTeamList = jest.fn()
      customRender({ fetchFplTeamList })
  
      act(() => global.receivedHandler({ updatedAt: -1, message }))

      expect(fetchFplTeamList).not.toHaveBeenCalled()
    })
  })
})
