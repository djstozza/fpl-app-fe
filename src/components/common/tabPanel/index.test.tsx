import { createMount } from '@material-ui/core/test-utils'

import history from 'state/history'
import TabPanel from '.'
import { MockedRouter } from 'test/helpers'
import { ROUNDS } from 'test/fixtures'
import { labelRenderer } from 'components/pages/roundsPage'

describe('TabPanel', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <TabPanel
        collectionId='2'
        url='/rounds'
        labelRenderer={labelRenderer}
        collection={ROUNDS}
        {...props}
      />
    </MockedRouter>
  )

  const tab = wrapper => wrapper.find('WithStyles(ForwardRef(Tab))')

  it('renders the tabs', () => {
    const wrapper = render()

    expect(tab(wrapper)).toHaveLength(3)

    expect(tab(wrapper).at(0).text()).toEqual(ROUNDS[0].name)
    expect(tab(wrapper).at(0).props().selected).toEqual(false)

    expect(tab(wrapper).at(1).text()).toEqual(ROUNDS[1].name)
    expect(tab(wrapper).at(1).props().selected).toEqual(true)

    expect(tab(wrapper).at(2).text()).toEqual(ROUNDS[2].name)
    expect(tab(wrapper).at(2).props().selected).toEqual(false)
  })

  it('updates history when a new tab is clicked', () => {
    const wrapper = render()

    expect(history.location.pathname).not.toEqual('/rounds/1/')

    tab(wrapper).at(0).find('button').simulate('click')
    expect(history.location.pathname).toEqual('/rounds/1/')
  })
})
