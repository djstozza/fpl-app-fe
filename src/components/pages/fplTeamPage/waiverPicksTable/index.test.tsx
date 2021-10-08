import { createMount } from '@material-ui/core/test-utils'
import { SnackbarProvider } from 'notistack'
import moment from 'moment'
import { within } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import WaiverPicksTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
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
    details: 'You cannot draft players at this time',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  },
  {
    details: 'You cannot pick out of turn',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  },
  {
    details: 'Player has already been taken',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  }
]

describe('WaiverPicksTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <WaiverPicksTable
          fplTeamId={fplTeamId}
          selectedFplTeamListId={FPL_TEAM_LISTS[0].id}
          waiverPicks={{ data: WAIVER_PICKS, errors: [] }}
          fplTeamList={{ data: FPL_TEAM_LISTS[0] }}
          fplTeamLists={{ data: FPL_TEAM_LISTS }}
          trades={{ data: TRADES, errors: [] }}
          fetchWaiverPicks={blank__}
          changeWaiverPickOrder={changeWaiverPickOrder}
          fetchTrades={blank__}
          isWaiver
          isOwner
          {...props}
        />
      </SnackbarProvider>
    </MockedRouter>
  )

  const sortTable = wrapper => wrapper.find('SortTable')
  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const cellNames = wrapper => sortTable(wrapper).props().cells.map(({ cellId }) => cellId)
  const headerCell = wrapper => wrapper.find('HeaderCell')
  const tabPanelTabs = wrapper => wrapper.find('TabPanel').find('WithStyles(ForwardRef(Tab))')
  const snackBarItem = wrapper => wrapper.find('WithStyles(SnackbarItem)')

  describe('showTrades = false', () => {
    beforeAll(
      () => {
        delete window.location
        global.window = Object.create(window)
        global.window.location = { pathname: `${FPL_TEAMS_URL}/${FPL_TEAM_LISTS[0].id}/waiverPicks` }
      }
    )

    it('renders the waiver picks table and the round selectors', () => {
      const wrapper = render()

      expect(headerCell(wrapper)).toHaveLength(6)
      expect(tabPanelTabs(wrapper)).toHaveLength(FPL_TEAM_LISTS.length)

      expect(link(wrapper, 1, 1).props().to).toEqual(`${PLAYERS_URL}/${WAIVER_PICKS[0].outPlayer.id}`)
      expect(link(wrapper, 1, 1).text())
        .toEqual(`${WAIVER_PICKS[0].outPlayer.firstName} ${WAIVER_PICKS[0].outPlayer.lastName}`)
      expect(link(wrapper, 1, 3).text())
        .toEqual(`${WAIVER_PICKS[0].inPlayer.firstName} ${WAIVER_PICKS[0].inPlayer.lastName}`)
      expect(tableCell(wrapper, 1, 5).text()).toEqual(WAIVER_PICKS[0].status)

      expect(tableCell(wrapper, 2, 0).text()).toEqual(String(WAIVER_PICKS[1].pickNumber))

      expect(link(wrapper, 2, 2).props().to).toEqual(`${TEAMS_URL}/${WAIVER_PICKS[1].outTeam.id}/`)
      expect(link(wrapper, 2, 2).text()).toEqual(`${WAIVER_PICKS[1].outTeam.shortName}`)

      expect(link(wrapper, 2, 4).props().to).toEqual(`${TEAMS_URL}/${WAIVER_PICKS[1].inTeam.id}/`)
      expect(link(wrapper, 2, 4).text()).toEqual(`${WAIVER_PICKS[1].inTeam.shortName}`)
    })

    it('triggers fetchWaiverPicks on render', () => {
      const fetchWaiverPicks = jest.fn()
      const wrapper = render({ fetchWaiverPicks })

      expect(fetchWaiverPicks).toHaveBeenCalled()
    })

    it('triggers changeWaiverPickOrder when the picknumbers are clicked if before waiverDeadline', () => {
      const wrapper = render()

      const selectButtons = document.querySelectorAll('[role=button]')

      UserEvent.click(selectButtons[selectButtons.length - 1])

      const listbox = document.body.querySelector('ul[role=listbox]')
      const listItem = within(listbox).getByText(String(WAIVER_PICKS[0].pickNumber))

      UserEvent.click(listItem)

      expect(changeWaiverPickOrder)
        .toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id, WAIVER_PICKS[1].id, WAIVER_PICKS[0].pickNumber)
    })

    it('does not allow the switching of waiver picks if isOwner = false', () => {
      const wrapper = render({ isOwner: false })

      expect(tableCell(wrapper, 1, 0).find('WithStyles(ForwardRef(TextField))')).toHaveLength(0)
    })

    it('does not allow the switching of waiver picks if the round is not current', () => {
      const fplTeamList = {
        ...FPL_TEAM_LISTS[0],
        round: {
          ...FPL_TEAM_LISTS[0].round,
          current: false
        }
      }
      const wrapper = render({ isOwner: false })

      expect(tableCell(wrapper, 1, 0).find('WithStyles(ForwardRef(TextField))')).toHaveLength(0)
    })

    it('does not allow the switching of waiver picks if isWaiver = false', () => {
      const wrapper = render({ isWaiver: false })

      expect(tableCell(wrapper, 1, 0).find('WithStyles(ForwardRef(TextField))')).toHaveLength(0)
    })

    it('renders errors if present', () => {
      const wrapper = render({ waiverPicks: { data: WAIVER_PICKS, errors } })

      expect(snackBarItem(wrapper)).toHaveLength(3)
    })
  })

  describe('showTrades = true', () => {
    beforeAll(
      () => {
        delete window.location
        global.window = Object.create(window)
        global.window.location = { pathname: `${FPL_TEAMS_URL}/${FPL_TEAM_LISTS[0].id}/trades` }
      }
    )

    it('renders the waiver picks table and the round selectors', () => {
      const wrapper = render({ isWaiver: false })

      expect(headerCell(wrapper)).toHaveLength(4)
      expect(tabPanelTabs(wrapper)).toHaveLength(FPL_TEAM_LISTS.length)

      expect(link(wrapper, 1, 0).props().to).toEqual(`${PLAYERS_URL}/${TRADES[0].outPlayer.id}`)
      expect(link(wrapper, 1, 0).text())
        .toEqual(`${TRADES[0].outPlayer.firstName} ${TRADES[0].outPlayer.lastName}`)

      expect(link(wrapper, 1, 2).props().to).toEqual(`${PLAYERS_URL}/${TRADES[0].inPlayer.id}`)
      expect(link(wrapper, 1, 2).text())
        .toEqual(`${TRADES[0].inPlayer.firstName} ${TRADES[0].inPlayer.lastName}`)

      expect(link(wrapper, 2, 1).props().to).toEqual(`${TEAMS_URL}/${TRADES[1].outTeam.id}/`)
      expect(link(wrapper, 2, 1).text()).toEqual(`${TRADES[1].outTeam.shortName}`)

      expect(link(wrapper, 2, 3).props().to).toEqual(`${TEAMS_URL}/${TRADES[1].inTeam.id}/`)
      expect(link(wrapper, 2, 3).text()).toEqual(`${TRADES[1].inTeam.shortName}`)
    })

    it('triggers fetchTrades on render', () => {
      const fetchTrades = jest.fn()
      const wrapper = render({ fetchTrades })

      expect(fetchTrades).toHaveBeenCalled()
    })
  })

  it('returns nothing if selectedFplTeamListId is undefiend', () => {
    const wrapper = render({ selectedFplTeamListId: undefined })

    expect(wrapper.html()).toEqual('')
  })
})
