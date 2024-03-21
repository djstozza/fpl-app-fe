import { render, screen, fireEvent, act } from '@testing-library/react'
import moment from 'moment'

import FplTeamAlert from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { FPL_TEAM_LIST_1 } from 'test/fixtures'
import { FPL_TEAMS_URL, LEAGUES_URL } from 'utilities/constants'

const leagueId = '1'
const fplTeamId = '5'

describe('FplTeamAlert', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <FplTeamAlert
        fplTeamId={fplTeamId}
        leagueId={leagueId}
        isOwner
        setIsWaiver={blank__}
        setOutListPosition={blank__}
        currentFplTeamList={FPL_TEAM_LIST_1}
        isWaiver={false}
        setDeadline={blank__}
        miniDraft={false}
        {...props}
      />
    </MockedRouter>
  )

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  const alert = () => screen.getByRole('alert')
  const buttonLinks = () => screen.getAllByRole('link')

  const deadline = moment().add(1, 'day').add(5, 'hours').add(10, 'minutes').add(37, 'seconds').toDate()

  it('renders the new trade button', () => {
    customRender({ deadline })

    expect(alert()).toHaveTextContent(`${FPL_TEAM_LIST_1.round.name} trade deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`)

    expect(buttonLinks()).toHaveLength(2)
    
    expect(buttonLinks()[0]).toHaveAttribute('href', `${FPL_TEAMS_URL}/${fplTeamId}/trades/new`)
    expect(buttonLinks()[0]).toHaveTextContent('New Trade')

    expect(buttonLinks()[1]).toHaveAttribute('href', `${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`)
    expect(buttonLinks()[1]).toHaveTextContent('New team trade')
  })

  it('triggers setOutListPosition if the new trade linkButton is clicked', () => {
    const setOutListPosition = jest.fn()
    customRender({ deadline, setOutListPosition })

    fireEvent.click(buttonLinks()[0])
    expect(setOutListPosition).toHaveBeenCalled()
  })

  it('triggers setOutListPosition if the new team trade linkButton is clicked', () => {
    const setOutListPosition = jest.fn()
    customRender({ deadline, setOutListPosition })

    fireEvent.click(buttonLinks()[1])
    expect(setOutListPosition).toHaveBeenCalledWith(undefined)
  })

  it('renders the new waiver button', () => {
    customRender({ deadline, isWaiver: true })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} waiver deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(buttonLinks()).toHaveLength(2)
    
    expect(buttonLinks()[0]).toHaveAttribute('href', `${FPL_TEAMS_URL}/${fplTeamId}/waiverPicks/new`)
    expect(buttonLinks()[0]).toHaveTextContent('New Waiver')

    expect(buttonLinks()[1]).toHaveAttribute('href', `${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`)
    expect(buttonLinks()[1]).toHaveTextContent('New team trade')
  })

  it('triggers setOutListPosition if the new waiver linkButton is clicked', () => {
    const setOutListPosition = jest.fn()
    customRender({ deadline, setOutListPosition, isWaiver: true })

    fireEvent.click(buttonLinks()[0])
    expect(setOutListPosition).toHaveBeenCalledWith(undefined)
  })

  it('renders the mini draft button', () => {
    customRender({ deadline, isWaiver: true, miniDraft: true })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} mini draft deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(buttonLinks()).toHaveLength(2)
    
    expect(buttonLinks()[0]).toHaveAttribute('href', `${LEAGUES_URL}/${leagueId}/miniDraft`)
    expect(buttonLinks()[0]).toHaveTextContent('Go to mini draft')

    expect(buttonLinks()[1]).toHaveAttribute('href', `${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`)
    expect(buttonLinks()[1]).toHaveTextContent('New team trade')
  })

  it('renders the trade button if miniDraft = true but isWaiver = false', () => {
    customRender({ deadline, isWaiver: false, miniDraft: true })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(buttonLinks()).toHaveLength(2)

    expect(buttonLinks()[0]).toHaveAttribute('href', `${FPL_TEAMS_URL}/${fplTeamId}/trades/new`)
    expect(buttonLinks()[0]).toHaveTextContent('New Trade')

    expect(buttonLinks()[1]).toHaveAttribute('href', `${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`)
    expect(buttonLinks()[1]).toHaveTextContent('New team trade')
  })

  it('does not render any button links if isOwner = false', () => {
    customRender({ deadline, isOwner: false })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 1 day, 5 hours, 10 minutes and 37 seconds`
    )

    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })

  it('calls setDeadline with deadlineTimeAsTime if the waiverDeadline has passed', async () => {
    const waiverDeadline = moment().add(1, 'second').toDate()
    const deadlineTimeAsTime = moment().add(1, 'day').toDate()

    const setIsWaiver = jest.fn()
    const setDeadline = jest.fn()

    customRender({ deadline: waiverDeadline, isWaiver: true, deadlineTimeAsTime, setIsWaiver, setDeadline })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} waiver deadline ends in 1 second`
    )

    act(() => jest.runOnlyPendingTimers())

    expect(setIsWaiver).toHaveBeenCalledWith(false)
    expect(setDeadline).toHaveBeenCalledWith(deadlineTimeAsTime)
  })

  it('calls setDeadline with undefined if deadlineTimeAsTime time has passed', async () => {
    const deadlineTimeAsTime = moment().add(1, 'second').toDate()

    const setIsWaiver = jest.fn()
    const setDeadline = jest.fn()

    customRender({ deadline: deadlineTimeAsTime, deadlineTimeAsTime, setIsWaiver, setDeadline })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 1 second`
    )

    act(() => jest.runOnlyPendingTimers())

    expect(setIsWaiver).not.toHaveBeenCalled()
    expect(setDeadline).toHaveBeenCalledWith(undefined)
  })

  it('returns nothing if there is no deadline', () => {
    customRender({ deadline: undefined })

    expect(screen.queryByTestId('FplTeamAlert')).not.toBeInTheDocument()
  })

  it('returns nothing if there is no currentFplTeamList', () => {
    customRender({ currentFplTeamList: undefined })

    expect(screen.queryByTestId('FplTeamAlert')).not.toBeInTheDocument()
  })

  it('only shows days in the countdown if there are no hours, minutes or seconds', () => {
    customRender({ deadline: moment().add(2, 'days').toDate() })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 2 days`
    )
  })

  it('only shows hours in the countdown if there are no days, minutes or seconds', () => {
    customRender({ deadline: moment().add(2, 'hours').toDate() })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 2 hours`
    )
  })

  it('only shows minutes in the countdown if there are no days, hours or seconds', () => {
    customRender({ deadline: moment().add(2, 'minutes').toDate() })

    expect(alert()).toHaveTextContent(
      `${FPL_TEAM_LIST_1.round.name} trade deadline ends in 2 minutes`
    )
  })
})
