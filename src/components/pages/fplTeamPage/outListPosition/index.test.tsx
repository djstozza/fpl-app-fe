import { createMount } from '@material-ui/core/test-utils'

import OutListPosition from '.'
import history from 'state/history'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIST_POSITION_1 } from 'test/fixtures'

const pathname = 'www.example.com'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname, search: '' })
}))

describe('OutListPosition', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <OutListPosition
        outListPosition={LIST_POSITION_1}
        setOutListPosition={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const { player: { firstName, lastName }, position: { singularNameShort } } = LIST_POSITION_1

  it('shows the player name and position', () => {
    const wrapper = render()

    expect(wrapper.text()).toEqual(`Out: ${firstName} ${lastName}(${singularNameShort})`)
  })

  it('clears the outListPosition when cancelled', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')
    const setOutListPosition = jest.fn()
    const wrapper = render({ setOutListPosition })

    wrapper.find('button').simulate('click')
    expect(setOutListPosition).toHaveBeenCalledWith(undefined)
    expect(historyReplaceSpy).toHaveBeenCalledWith(pathname)
  })

  it('renders nothing if outListPosition is undefined', () => {
    const wrapper = render({ outListPosition: undefined })

    expect(wrapper.html()).toEqual('')
  })
})
