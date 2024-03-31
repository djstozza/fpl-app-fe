import { render, screen } from '@testing-library/react'

import ConnectedProfilePage, { TABS } from '.'
import { MockedRouterStore } from 'test/helpers'
import { USER_1 } from 'test/fixtures'

const tabsArr = Object.values(TABS)

describe('ProfilePage', () => {
  const connectedRender = (state = {}) => render(
    <MockedRouterStore
      defaultState={{
        auth: { user: USER_1 },
        fplTeams: { data: [] },
        ...state
      }}
    >
      <ConnectedProfilePage />
    </MockedRouterStore>
  )

  const tabs = () => screen.getAllByRole('tab')
  const heading = () => screen.getByRole('heading')

  it('renders the details tab by default and sets the document title', () => {
    connectedRender()

    expect(tabs()).toHaveLength(3)
    expect(tabs()[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs()[0]).toHaveTextContent(tabsArr[0].label)
    expect(tabs()[1]).toHaveTextContent(tabsArr[1].label)
    expect(tabs()[2]).toHaveTextContent(tabsArr[2].label)

    expect(heading()).toHaveTextContent(USER_1.username)
  })
})
