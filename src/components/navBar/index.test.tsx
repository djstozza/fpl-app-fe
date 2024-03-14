import { fireEvent, render, screen, within } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'

import {
  PROFILE_URL,
  LEAGUES_URL,
  FPL_TEAMS_URL,
  SIGN_UP_URL,
  ROUNDS_URL,
  TEAMS_URL,
  PLAYERS_URL,
  LOGIN_URL
} from 'utilities/constants'
import ConnectedNavbar, { NavBar } from '.'
import { USER_1 } from 'test/fixtures'
import { MockedRouterStore,  blank__ } from 'test/helpers'

describe('NavBar', () => {
  const customRender = (props = {}, state = {}) => render(
    <MockedRouterStore defaultState={{ ...state }}>
      <NavBar
        logOut={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const mockedStoreRender = (state = {}) => render(
    <MockedRouterStore defaultState={{ ...state }}>
      <ConnectedNavbar />
    </MockedRouterStore>
  )

  const menuItems = () => within(screen.getByRole('presentation')).getAllByRole('menuitem')
  const label = text => screen.getByLabelText(text)
  const labelQuery = text => screen.queryByLabelText(text)

  it('shows the log in and sign up buttons if there is no user', () => {
    customRender()

    expect(label('Log In')).toBeInTheDocument()
    expect(label('Sign Up')).toBeInTheDocument()
    expect(labelQuery('Account')).not.toBeInTheDocument()
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  })

  it('it renders a dropdown, which can be used by the user to logout if the user is present', () => {
    const logOut = jest.fn()
    customRender({ user: USER_1, logOut })

    expect(labelQuery('Log In')).not.toBeInTheDocument()
    expect(labelQuery('Sign Up')).not.toBeInTheDocument()
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()

    fireEvent.click(label('Account'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()

    expect(menuItems()).toHaveLength(4)

    expect(menuItems()[0]).toHaveTextContent('My profile')
    expect(menuItems()[0]).toHaveAttribute('href', PROFILE_URL)

    expect(menuItems()[1]).toHaveTextContent('My leagues')
    expect(menuItems()[1]).toHaveAttribute('href', `${PROFILE_URL}${LEAGUES_URL}`)

    expect(menuItems()[2]).toHaveTextContent('My fpl teams')
    expect(menuItems()[2]).toHaveAttribute('href', `${PROFILE_URL}${FPL_TEAMS_URL}`)

    expect(menuItems()[3]).toHaveTextContent('Log out')

    fireEvent.click(menuItems()[3])

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()

    expect(logOut).toHaveBeenCalled()
  })

  it('consumes state from the store', () => {
    mockedStoreRender({ auth: { user: USER_1 } })

    expect(screen.getByLabelText('Account')).toBeInTheDocument()
  })

  describe('active links', () => {
    const originalWindowLocation = window.location;

    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        enumerable: true,
        value: new URL(window.location.href),
      })
    })

    afterEach(() => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        enumerable: true,
        value: originalWindowLocation,
      })
    })

    it(`sets ${SIGN_UP_URL} as active`, () => {
      const expectedUrl = `https://www.example.com${SIGN_UP_URL}`
      window.location.href = expectedUrl
      
      customRender()

      expect(label('Sign Up').className).toContain('active')
      expect(label('Sign Up')).toHaveAttribute('href', SIGN_UP_URL)

      expect(label('Rounds').className).not.toContain('active')
      expect(label('Players').className).not.toContain('active')
      expect(label('Teams').className).not.toContain('active')
      expect(label('Log In').className).not.toContain('active')
    })

    it(`sets ${LOGIN_URL} as active`, () => {
      const expectedUrl = `https://www.example.com${LOGIN_URL}`
      window.location.href = expectedUrl
      
      customRender()

      expect(label('Log In').className).toContain('active')
      expect(label('Log In')).toHaveAttribute('href', LOGIN_URL)

      expect(label('Rounds').className).not.toContain('active')
      expect(label('Players').className).not.toContain('active')
      expect(label('Teams').className).not.toContain('active')
      expect(label('Sign Up').className).not.toContain('active')
    })

    it(`sets ${ROUNDS_URL} as active`, () => {
      const expectedUrl = `https://www.example.com${ROUNDS_URL}`
      window.location.href = expectedUrl
      
      customRender()

      expect(label('Rounds').className).toContain('active')
      expect(label('Rounds')).toHaveAttribute('href', ROUNDS_URL)
      
      expect(label('Players').className).not.toContain('active')
      expect(label('Teams').className).not.toContain('active')
      expect(label('Log In').className).not.toContain('active')
      expect(label('Sign Up').className).not.toContain('active')
    })

    it(`sets ${TEAMS_URL} as active`, () => {
      const expectedUrl = `https://www.example.com${TEAMS_URL}`
      window.location.href = expectedUrl
      
      customRender()

      expect(label('Teams').className).toContain('active')
      expect(label('Teams')).toHaveAttribute('href', TEAMS_URL)

      expect(label('Rounds').className).not.toContain('active')
      expect(label('Players').className).not.toContain('active')
      expect(label('Log In').className).not.toContain('active')
      expect(label('Sign Up').className).not.toContain('active')
    })

    it(`sets ${PLAYERS_URL} as active`, () => {
      const expectedUrl = `https://www.example.com${PLAYERS_URL}`
      window.location.href = expectedUrl
      
      customRender()

      expect(label('Players').className).toContain('active')
      expect(label('Players')).toHaveAttribute('href', PLAYERS_URL)

      expect(label('Rounds').className).not.toContain('active')
      expect(label('Teams').className).not.toContain('active')
      expect(label('Log In').className).not.toContain('active')
      expect(label('Sign Up').className).not.toContain('active')
    })
  })

  describe('mobile rendering' , () => {
    let originalWidth
    
    const createMatchMedia = (width) => {
      return (query) => ({
        matches: mediaQuery.match(query, { width }),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })
    }

    beforeAll(() => {
      originalWidth = window.matchMedia
      window.matchMedia = createMatchMedia(300)
    })

    afterAll(() => {
      window.matchMedia = originalWidth
    })

    it('only shows the log in and the sign up links initially', () => {
      customRender()

      expect(label('Log In')).toBeInTheDocument()
      expect(label('Sign Up')).toBeInTheDocument()
      expect(label('show more')).toBeInTheDocument()
      expect(labelQuery('Rounds')).not.toBeInTheDocument()
      expect(labelQuery('Teams')).not.toBeInTheDocument()
      expect(labelQuery('Players')).not.toBeInTheDocument()

      fireEvent.click(label('show more'))

      expect(screen.queryByRole('presentation')).toBeInTheDocument()

      expect(label('Rounds')).toBeInTheDocument()
      expect(label('Teams')).toBeInTheDocument()
      expect(label('Players')).toBeInTheDocument()

      fireEvent.click(label('Rounds'))
    })
  })
})
