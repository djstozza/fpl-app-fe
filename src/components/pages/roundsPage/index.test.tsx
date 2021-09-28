import { createMount } from '@material-ui/core/test-utils'

import ConnectedRoundsPage, { RoundsPage } from '.'
import {
  ROUND_1,
  ROUND_2,
  ROUND_3
} from 'test/fixtures'
import { TITLE } from 'utilities/constants'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { cable } from 'utilities/constants'

describe('RoundsPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        round: { data: ROUND_1 },
        rounds: { data: [ROUND_1, ROUND_2, ROUND_3] },
        ...state
      }}
    >
      <ConnectedRoundsPage
        fetchRound={blank__}
        fetchRounds={blank__}
        match={{ params: { roundId: ROUND_1.id }}}
        {...props}
      />
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <RoundsPage
        rounds={ROUND_1}
        rounds={[ROUND_1, ROUND_2, ROUND_3]}
        fetchRound={blank__}
        fetchRounds={blank__}
        match={{ params: { roundId: ROUND_1.id }}}
        {...props}
      />
    </MockedRouter>
  )

  const tab = wrapper => wrapper.find('WithStyles(ForwardRef(Tab))')

  it('renders the tab panel, round details and sets the document title', () => {
    const wrapper = connectedRender()

    expect(wrapper.find('TabPanel').text()).toEqual('Gameweek 1Gameweek 2Gameweek 3')
    expect(wrapper.find('RoundDetails')).toHaveLength(1)
    expect(document.title).toEqual(`${TITLE} - ${ROUND_1.name}`)

    expect(tab(wrapper).at(0).props().selected).toEqual(true)
    expect(tab(wrapper).at(0).text()).toEqual(ROUND_1.name)
  })

  it('triggers the fetchRounds function on load', () => {
    const fetchRounds = jest.fn()
    const wrapper = render({ fetchRounds })

    expect(fetchRounds).toHaveBeenCalled()
  })

  it('calls fetchRound with the roundId', () => {
    const fetchRound = jest.fn()
    const roundId =  ROUND_2.id
    const wrapper = render({ fetchRound, match: { params: { roundId } } })

    expect(fetchRound).toHaveBeenCalledWith(roundId)
    expect(tab(wrapper).at(1).props().selected).toEqual(true)
    expect(tab(wrapper).at(1).text()).toEqual(ROUND_2.name)
  })

  it('calls fetchRound with the current round if there is no roundId in the params', () => {
    const fetchRound = jest.fn()
    const wrapper = render({ fetchRound, match: { params: { roundId: undefined } } })

    expect(fetchRound).toHaveBeenCalledWith(ROUND_1.id)
  })

  it('calls fetchRound with the last round if there is no roundId or current round', () => {
    const fetchRound = jest.fn()
    const round1 = { ...ROUND_1 }
    round1.current = false
    const rounds = [round1, ROUND_2, ROUND_3]

    const wrapper = render({ fetchRound, rounds, match: { params: { roundId: undefined } } })
    expect(fetchRound).toHaveBeenCalledWith(ROUND_3.id)

    expect(tab(wrapper).at(2).props().selected).toEqual(true)
    expect(tab(wrapper).at(2).text()).toEqual(ROUND_3.name)
  })

  it('renders nothing if there are no rounds', () => {
    const wrapper = render({ rounds: [] })
    expect(wrapper.html()).toEqual('')
  })
})
