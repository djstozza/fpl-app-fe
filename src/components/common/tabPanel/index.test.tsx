import { render, screen, fireEvent } from '@testing-library/react'

import history from 'state/history'
import TabPanel from '.'
import { MockedRouter } from 'test/helpers'
import { ROUNDS } from 'test/fixtures'
import { labelRenderer } from 'components/pages/roundsPage'

describe('TabPanel', () => {
  const customRender = (props = {}) => render(
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

  const tabs = () => screen.getAllByRole('tab')
  // const tab = wrapper => wrapper.find('WithStyles(ForwardRef(Tab))')

  it('renders the tabs', () => {
    customRender()
    expect(tabs()).toHaveLength(3)
    
    expect(tabs()[0]).toHaveTextContent(ROUNDS[0].name)
    expect(tabs()[0].getAttribute('aria-selected')).toEqual('false')

    expect(tabs()[1]).toHaveTextContent(ROUNDS[1].name)
    expect(tabs()[1].getAttribute('aria-selected')).toEqual('true')

    expect(tabs()[2]).toHaveTextContent(ROUNDS[2].name)
    expect(tabs()[2].getAttribute('aria-selected')).toEqual('false')
  })

  it('updates history when a new tab is clicked', () => {
    customRender()

    expect(history.location.pathname).not.toEqual(`/rounds/${ROUNDS[0].id}/`)

    fireEvent.click(tabs()[0])
    
    expect(history.location.pathname).toEqual(`/rounds/${ROUNDS[0].id}/`)
  })

  it('adds the tab if present on click', () => {
    const tab = 'foo'
    const path = `/rounds/${ROUNDS[0].id}/${tab}`
    customRender({ tab })

    expect(history.location.pathname).not.toEqual(path)

    fireEvent.click(tabs()[0])
    expect(history.location.pathname).toEqual(path)
  })
})
