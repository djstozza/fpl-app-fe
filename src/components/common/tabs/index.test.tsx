import { render, screen } from '@testing-library/react'

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
  const customRender = (props = {}) => render(
    <MockedRouter>
      <Tabs
        currentTab='tab3'
        tabs={Object.values(TABS)}
        url='pathname'
        titleSubstr='Substr'
        {...props}
      />
    </MockedRouter>
  )

  const tabs = () => screen.getAllByRole('tab')

  it('only shows tabs with display = true and shows which one is selected', () => {
    customRender()

    expect(tabs()).toHaveLength(2)

    expect(tabs()[0]).toHaveTextContent('Tab 1')
    expect(tabs()[0].getAttribute('href')).toEqual('/pathname/tab1')
    expect(tabs()[0].getAttribute('aria-selected')).toEqual('false')

    expect(tabs()[1]).toHaveTextContent('Tab 3')
    expect(tabs()[1].getAttribute('href')).toEqual('/pathname/tab3')
    expect(tabs()[1].getAttribute('aria-selected')).toEqual('true')
  })

  it('adds the id to the tab paths', () => {
    customRender({ id: '1' })

    expect(tabs()[0].getAttribute('href')).toEqual('/pathname/1/tab1')
    expect(tabs()[1].getAttribute('href')).toEqual('/pathname/1/tab3')
  })

  it('adds the tab label to the document title alond with the titleSubstr', () => {
    customRender()

    expect(document.title).toContain('Fpl App - Substr - Tab 3')
  })

  it('shows the extraTitleInfo if present', () => {
    const tabs = {
      ...TABS,
      tab3: {
        ...TABS['tab3'],
        extraTitleInfo: 'Extra Info'
      }
    }

    customRender({ tabs: Object.values(tabs) })

    expect(document.title).toEqual('Fpl App - Substr - Tab 3 - Extra Info')
  })

  it('uses the regex matcher if present', () => {
    const tabsHash = {
      ...TABS,
      tab1: {
        ...TABS['tab1'],
        matcher: /\/pathname\/tab3/
      },
      tab3: {
        ...TABS['tab3'],
        matcher: /\/pathname\/tab1/
      }
    }

    customRender({ tabs: Object.values(tabsHash) })

    expect(tabs()[0].getAttribute('aria-selected')).toEqual('true')
    expect(document.title).toContain('Substr - Tab 1')
  })

  describe('when tabIndex === -1', () => {
    it('returns the first tab' , () => {
      customRender({ currentTab: 'invalid' })

      expect(tabs()[0].getAttribute('aria-selected')).toEqual('true')
    })
  })
})
