import { createMount } from '@material-ui/core/test-utils'

import Tabs from '.'
import { MockedRouter } from 'test/helpers'

const TABS = {
  tab1: { label: 'Tab 1', value: 'tab1', display: true },
  tab2: { label: 'Tab 2', value: 'tab2', display: false },
  tab3: { label: 'Tab 3', value: 'tab3', display: true },
}

const pathname = '/pathname/tab3'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname, search: '' })
}))

describe('Tabs', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <Tabs
        id='1'
        currentTab='tab3'
        tabs={Object.values(TABS)}
        url='pathname'
        titleSubstr='Substr'
        {...props}
      />
    </MockedRouter>
  )

  const tab = wrapper => wrapper.find('WithStyles(ForwardRef(Tab))')

  it('only shows tabs with display = true and shows which one is selected', () => {
    const wrapper = render()

    expect(tab(wrapper)).toHaveLength(2)
    expect(tab(wrapper).at(0).text()).toEqual('Tab 1')
    expect(tab(wrapper).at(1).text()).toEqual('Tab 3')
    expect(tab(wrapper).at(0).props().selected).toEqual(false)
    expect(tab(wrapper).at(1).props().selected).toEqual(true)
  })

  it('adds the tab label to the document title alond with the titleSubstr', () => {
    const wrapper = render()

    expect(document.title).toContain('Substr - Tab 3')
  })

  it('shows which tab is selected', () => {
    const wrapper = render()

    expect(tab(wrapper).at(1).props().selected).toEqual(true)
  })

  it('uses the regex matcher if present', () => {
    const tabs = {
      ...TABS
    }

    tabs.tab1.matcher = /\/pathname\/tab3/
    tabs.tab3.matcher = /\/pathname\/tab1/

    const wrapper = render({ tabs: Object.values(tabs) })

    expect(tab(wrapper).at(0).props().selected).toEqual(true)
    expect(document.title).toContain('Substr - Tab 1')
  })
})
