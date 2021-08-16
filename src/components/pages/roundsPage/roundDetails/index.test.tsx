import { createMount } from '@material-ui/core/test-utils'
import timezoneMock from 'timezone-mock'

import RoundDetails from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { ROUND_1 } from 'test/fixtures'

describe('RoundDetails', () => {
  timezoneMock.register('Australia/Adelaide')

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <RoundDetails
        roundId={ROUND_1.id}
        round={ROUND_1}
        fetchRound={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const container = wrapper => wrapper.find('.makeStyles-root-1')

  it('shows the round name and groups the fixtures by date', () => {
    const wrapper = render()

    expect(wrapper.find('h4').text()).toEqual(ROUND_1.name)
    expect(container(wrapper)).toHaveLength(2)
    expect(container(wrapper).at(0).find('h6').text()).toEqual('14th August 2021')
    expect(container(wrapper).at(0).find('WithStyles(ForwardRef(Accordion))')).toHaveLength(2)
    expect(container(wrapper).at(1).find('h6').text()).toEqual('16th August 2021')
    expect(container(wrapper).at(1).find('WithStyles(ForwardRef(Accordion))')).toHaveLength(1)
  })

  it('fetches the round if a round id is present', () => {
    const fetchRound = jest.fn()

    const wrapper = render({ fetchRound })

    expect(fetchRound).toHaveBeenCalledWith(ROUND_1.id)
  })

  it('does not fetch the round if roundId is null', () => {
    const fetchRound = jest.fn()

    const wrapper = render({ roundId: null, fetchRound })

    expect(fetchRound).not.toHaveBeenCalled()
  })

  it('renders nothing if the round is not present', () => {
    const wrapper = render({ round: null })
    expect(wrapper.html()).toEqual('')
  })
})
