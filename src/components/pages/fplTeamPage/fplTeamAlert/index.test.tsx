import { createMount } from '@material-ui/core/test-utils'
import moment from 'moment'

import FplTeamAlert from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { FPL_TEAM_LIST_1 } from 'test/fixtures'
import { FPL_TEAMS_URL, LEAGUES_URL } from 'utilities/constants'

const leagueId = '1'
const fplTeamId = '5'

describe('FplTeamAlert', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <FplTeamAlert
        fplTeamId={fplTeamId}
        leagueId={leagueId}
        isOwner
        setIsWaiver={blank__}
        setOutListPosition={blank__}
        currentFplTeamList={FPL_TEAM_LIST_1}
        {...props}
      />
    </MockedRouter>
  )

  beforeAll(() => {
    jest.useFakeTimers('modern')
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  const alert = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))')
  const buttonLink = wrapper => wrapper.find('ButtonLink')

  const deadline = moment().add(1, 'day').add(5, 'hours').add(10, 'minutes').add(37, 'seconds').toDate()

  it('renders the new trade button', () => {
    const wrapper = render({ deadline })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(buttonLink(wrapper).at(0).props().to).toEqual(`${FPL_TEAMS_URL}/${fplTeamId}/trades/new`)
    expect(buttonLink(wrapper).at(0).text()).toEqual('New Trade')

    expect(buttonLink(wrapper).at(1).props().to).toEqual(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`)
    expect(buttonLink(wrapper).at(1).text()).toEqual('New team trade')
  })

  it('triggers setOutListPosition if the new trade linkButton is clicked', () => {
    const setOutListPosition = jest.fn()
    const wrapper = render({ deadline, setOutListPosition })

    buttonLink(wrapper).at(0).simulate('click')
    expect(setOutListPosition).toHaveBeenCalledWith(undefined)
  })

  it('triggers setOutListPosition if the new team trade linkButton is clicked', () => {
    const setOutListPosition = jest.fn()
    const wrapper = render({ deadline, setOutListPosition })

    buttonLink(wrapper).at(1).simulate('click')
    expect(setOutListPosition).toHaveBeenCalledWith(undefined)
  })

  it('renders the new waiver button', () => {
    const wrapper = render({ deadline, isWaiver: true })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} waiver deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(buttonLink(wrapper).at(0).props().to).toEqual(`${FPL_TEAMS_URL}/${fplTeamId}/waiverPicks/new`)
    expect(buttonLink(wrapper).at(0).text()).toEqual('New Waiver')

    expect(buttonLink(wrapper).at(1).props().to).toEqual(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`)
    expect(buttonLink(wrapper).at(1).text()).toEqual('New team trade')
  })

  it('triggers setOutListPosition if the new waiver linkButton is clicked', () => {
    const setOutListPosition = jest.fn()
    const wrapper = render({ deadline, setOutListPosition, isWaiver: true })

    buttonLink(wrapper).at(0).simulate('click')
    expect(setOutListPosition).toHaveBeenCalledWith(undefined)
  })

  it('renders the mini draft button', () => {
    const wrapper = render({ deadline, isWaiver: true, miniDraft: true })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} mini draft deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(buttonLink(wrapper).at(0).props().to).toEqual(`${LEAGUES_URL}/${leagueId}/miniDraft`)
    expect(buttonLink(wrapper).at(0).text()).toEqual('Go to mini draft')

    expect(buttonLink(wrapper).at(1).props().to).toEqual(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`)
    expect(buttonLink(wrapper).at(1).text()).toEqual('New team trade')
  })

  it('renders the trade button if miniDraft = true but isWaiver = false', () => {
    const wrapper = render({ deadline, isWaiver: false, miniDraft: true })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(buttonLink(wrapper).at(0).props().to).toEqual(`${FPL_TEAMS_URL}/${fplTeamId}/trades/new`)
    expect(buttonLink(wrapper).at(0).text()).toEqual('New Trade')

    expect(buttonLink(wrapper).at(1).props().to).toEqual(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`)
    expect(buttonLink(wrapper).at(1).text()).toEqual('New team trade')
  })

  it('does not render any button links if isOwner = false', () => {
    const wrapper = render({ deadline, isOwner: false })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(buttonLink(wrapper)).toHaveLength(0)
  })

  it('calls setDeadline with deadlineTimeAsTime if the waiverDeadline has passed', () => {
    const waiverDeadline = moment().add(1, 'second').toDate()
    const deadlineTimeAsTime = moment().add(1, 'day').toDate()

    const setIsWaiver = jest.fn()
    const setDeadline = jest.fn()

    const wrapper = render({ deadline: waiverDeadline, isWaiver: true, deadlineTimeAsTime, setIsWaiver, setDeadline })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} waiver deadline ends in 1 second`
    )

    jest.runOnlyPendingTimers()

    expect(setIsWaiver).toHaveBeenCalledWith(false)
    expect(setDeadline).toHaveBeenCalledWith(deadlineTimeAsTime)
  })

  it('calls setDeadline with undefined if deadlineTimeAsTime time has passed', () => {
    const deadlineTimeAsTime = moment().add(1, 'second').toDate()

    const setIsWaiver = jest.fn()
    const setDeadline = jest.fn()

    const wrapper = render({ deadline: deadlineTimeAsTime, deadlineTimeAsTime, setIsWaiver, setDeadline })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 1 second`
    )

    jest.runOnlyPendingTimers()

    expect(setIsWaiver).not.toHaveBeenCalled()
    expect(setDeadline).toHaveBeenCalledWith(undefined)
  })

  it('returns nothing if there is no deadline', () => {
    const wrapper = render({ deadline: undefined })

    expect(wrapper.html()).toEqual('')
  })

  it('returns nothing if there is no currentFplTeamList', () => {
    const wrapper = render({ currentFplTeamList: undefined })

    expect(wrapper.html()).toEqual('')
  })

  it('only shows days in the countdown if there are no hours, minutes or seconds', () => {
    const wrapper = render({ deadline: moment().add(2, 'days').toDate() })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 2 days`
    )
  })

  it('only shows hours in the countdown if there are no days, minutes or seconds', () => {
    const wrapper = render({ deadline: moment().add(2, 'hours').toDate() })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 2 hours`
    )
  })

  it('only shows minutes in the countdown if there are no days, hours or seconds', () => {
    const wrapper = render({ deadline: moment().add(2, 'minutes').toDate() })

    expect(alert(wrapper).text()).toContain(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 2 minutes`
    )
  })
})
