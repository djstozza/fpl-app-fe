import { createMount } from '@material-ui/core/test-utils'
import { SnackbarProvider } from 'notistack'
import moment from 'moment'

import FplTeamListChart from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIST_POSITIONS, FPL_TEAM_LISTS, WEST_HAM_TEAM_BASE } from 'test/fixtures'

const fplTeamId = '1'

const errors = [
  {
    details: 'You cannot substitute players at this time',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  }
]

describe('FplTeamListChart', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <FplTeamListChart
          isOwner
          fplTeamId={fplTeamId}
          fplTeamLists={{ data: FPL_TEAM_LISTS }}
          fplTeamList={{ data: FPL_TEAM_LISTS[0], listPositions: LIST_POSITIONS, errors: [] }}
          listPosition={{ validSubstitutions: undefined, fetching: false }}
          fetchValidSubstitutions={blank__}
          processSubstitution={blank__}
          clearValidSubstitutions={blank__}
          selectedFplTeamListId={FPL_TEAM_LISTS[0].id}
          fetchFplTeamList={blank__}
          {...props}
        />
      </SnackbarProvider>
    </MockedRouter>
  )

  const box = (wrapper) => wrapper.find('Styled(MuiBox)')
  const listPositionBox = (wrapper, i, j) => box(wrapper).at(i).find('ListPositionBox').at(j)
  const snackBarItem = wrapper => wrapper.find('WithStyles(SnackbarItem)')

  it('renders the chart', () => {
    const wrapper = render()

    expect(box(wrapper)).toHaveLength(5)

    expect(box(wrapper).at(0).props().className).toContain('startingRow')
    expect(listPositionBox(wrapper, 0, 0).text()).toEqual(
      `${LIST_POSITIONS[0].player.lastName}${LIST_POSITIONS[0].opponent.shortName} ` +
        `(${LIST_POSITIONS[0].leg})${LIST_POSITIONS[0].totalPoints}`
    )
    expect(listPositionBox(wrapper, 0, 1).text()).toEqual(
      `${LIST_POSITIONS[1].player.lastName}${LIST_POSITIONS[1].opponent.shortName} ` +
        `(${LIST_POSITIONS[1].leg})${LIST_POSITIONS[1].totalPoints}`
    )
    expect(listPositionBox(wrapper, 0, 2).text()).toEqual(
      `${LIST_POSITIONS[2].player.lastName}${LIST_POSITIONS[2].opponent.shortName} ` +
        `(${LIST_POSITIONS[2].leg})${LIST_POSITIONS[2].totalPoints}`
    )

    expect(box(wrapper).at(1).props().className).toContain('startingRow')
    expect(listPositionBox(wrapper, 1, 0).text()).toEqual(
      `${LIST_POSITIONS[3].player.lastName}${LIST_POSITIONS[3].opponent.shortName} ` +
        `(${LIST_POSITIONS[3].leg})${LIST_POSITIONS[3].totalPoints}`
    )
    expect(listPositionBox(wrapper, 1, 1).text()).toEqual(
      `${LIST_POSITIONS[4].player.lastName}${LIST_POSITIONS[4].opponent.shortName} ` +
        `(${LIST_POSITIONS[4].leg})${LIST_POSITIONS[4].totalPoints}`
    )
    expect(listPositionBox(wrapper, 1, 2).text()).toEqual(
      `${LIST_POSITIONS[5].player.lastName}${LIST_POSITIONS[5].opponent.shortName} ` +
        `(${LIST_POSITIONS[5].leg})${LIST_POSITIONS[5].totalPoints}`
    )
    expect(listPositionBox(wrapper, 1, 3).text()).toEqual(
      `${LIST_POSITIONS[6].player.lastName}${LIST_POSITIONS[6].opponent.shortName} ` +
        `(${LIST_POSITIONS[6].leg})${LIST_POSITIONS[6].totalPoints}`
    )

    expect(box(wrapper).at(2).props().className).toContain('startingRow')
    expect(listPositionBox(wrapper, 2, 0).text()).toEqual(
      `${LIST_POSITIONS[7].player.lastName}${LIST_POSITIONS[7].opponent.shortName} ` +
        `(${LIST_POSITIONS[7].leg})${LIST_POSITIONS[7].totalPoints}`
    )
    expect(listPositionBox(wrapper, 2, 1).text()).toEqual(
      `${LIST_POSITIONS[8].player.lastName}${LIST_POSITIONS[8].opponent.shortName} ` +
        `(${LIST_POSITIONS[8].leg})${LIST_POSITIONS[8].totalPoints}`
    )
    expect(listPositionBox(wrapper, 2, 2).text()).toEqual(
      `${LIST_POSITIONS[9].player.lastName}${LIST_POSITIONS[9].opponent.shortName} ` +
        `(${LIST_POSITIONS[9].leg})${LIST_POSITIONS[9].totalPoints}`
    )

    expect(box(wrapper).at(3).props().className).toContain('startingRow')
    expect(listPositionBox(wrapper, 3, 0).text()).toEqual(
      `${LIST_POSITIONS[10].player.lastName}${LIST_POSITIONS[10].opponent.shortName} ` +
        `(${LIST_POSITIONS[10].leg})${LIST_POSITIONS[10].totalPoints}`
    )

    expect(box(wrapper).at(4).props().className).toContain('substitutesContainer')
    expect(listPositionBox(wrapper, 4, 0).text()).toEqual(
      `${LIST_POSITIONS[11].player.lastName}${LIST_POSITIONS[11].opponent.shortName} ` +
        `(${LIST_POSITIONS[11].leg})${LIST_POSITIONS[11].totalPoints}`
    )
    expect(listPositionBox(wrapper, 4, 1).text()).toEqual(
      `${LIST_POSITIONS[12].player.lastName}${LIST_POSITIONS[12].opponent.shortName} ` +
        `(${LIST_POSITIONS[12].leg})${LIST_POSITIONS[12].totalPoints}`
    )
    expect(listPositionBox(wrapper, 4, 2).text()).toEqual(
      `${LIST_POSITIONS[13].player.lastName}${LIST_POSITIONS[13].opponent.shortName} ` +
        `(${LIST_POSITIONS[13].leg})${LIST_POSITIONS[13].totalPoints}`
    )
    expect(listPositionBox(wrapper, 4, 3).text()).toEqual(
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

    const wrapper = render({ fplTeamList: { data: FPL_TEAM_LISTS[0], listPositions, errors: [] } })

    expect(listPositionBox(wrapper, 0, 0).text(
      `${LIST_POSITIONS[0].player.lastName}${LIST_POSITIONS[0].opponent.shortName} ` +
        `(${LIST_POSITIONS[0].leg})${listPositions[15].opponent.shortName} (${listPositions[15].leg})` +
        `${LIST_POSITIONS[0].totalPoints + listPositions[15].totalPoints}`
    ))
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

    const wrapper = render({
      fplTeamList: { data: fplTeamList, listPositions: LIST_POSITIONS, errors: [] },
      listPosition: { validSubstitutions, fetching: false },
      fetchValidSubstitutions,
      processSubstitution
    })

    listPositionBox(wrapper, 0, 1).find('div').at(0).simulate('click')
    expect(fetchValidSubstitutions).toHaveBeenCalledWith(LIST_POSITIONS[1].id)
    expect(scrollIntoViewMock).toHaveBeenCalled()
    expect(listPositionBox(wrapper, 0, 1).find('div').at(0).props().className).toContain('selected')

    expect(listPositionBox(wrapper, 4, 0).find('div').at(0).props().className).toContain('validSubstitution')
    expect(listPositionBox(wrapper, 4, 1).find('div').at(0).props().className).toContain('validSubstitution')
    expect(listPositionBox(wrapper, 4, 2).find('div').at(0).props().className).toContain('validSubstitution')

    listPositionBox(wrapper, 0, 2).find('div').at(0).simulate('click')
    expect(processSubstitution).not.toHaveBeenCalled()

    listPositionBox(wrapper, 4, 2).find('div').at(0).simulate('click')
    expect(processSubstitution).toHaveBeenCalledWith(
      FPL_TEAM_LISTS[0].id,
      LIST_POSITIONS[1].id,
      LIST_POSITIONS[13].id
    )

    expect(listPositionBox(wrapper, 0, 1).find('div').at(0).props().className).not.toContain('selected')
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
    const wrapper = render({
      fplTeamList: { data: fplTeamList, listPositions: LIST_POSITIONS, errors: [] },
    })

    listPositionBox(wrapper, 0, 1).find('div').at(0).simulate('click')
    expect(listPositionBox(wrapper, 0, 1).find('div').at(0).props().className).toContain('selected')

    listPositionBox(wrapper, 0, 1).find('div').at(0).simulate('click')
    expect(listPositionBox(wrapper, 0, 1).find('div').at(0).props().className).not.toContain('selected')
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

    const wrapper = render({
      fplTeamList: { data: fplTeamList, listPositions: LIST_POSITIONS, errors: [] },
      fetchValidSubstitutions,
      processSubstitution
    })

    listPositionBox(wrapper, 0, 1).find('div').at(0).simulate('click')
    expect(fetchValidSubstitutions).not.toHaveBeenCalled()
    expect(processSubstitution).not.toHaveBeenCalled()
  })

  it('renders nothing if there is no fplTeamList', () => {
    const wrapper = render({ fplTeamList: { data: undefined, errors: [] } })

    expect(wrapper.html()).toEqual('')
  })

  it('renders nothing if there are no listPositions', () => {
    const wrapper = render({ fplTeamList: { data: FPL_TEAM_LISTS[0], listPositions: [], errors: [] } })

    expect(wrapper.html()).toEqual('')
  })

  it('shows errors with the snackbar when present', () => {
    const wrapper = render({ fplTeamList: { data: FPL_TEAM_LISTS[0], listPositions: LIST_POSITIONS, errors } })

    expect(snackBarItem(wrapper)).toHaveLength(1)
  })
})
