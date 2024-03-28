import { fireEvent, render, screen } from '@testing-library/react'


import ConnectedLoginPage, { LoginPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'

const email = 'user@example.com'
const password = 'password'
const errors = [
  {
    code: 'is invalid',
    detail: 'Email or password is invalid',
    source: 'email or password',
    title: 'Is Invalid'
  }
]

describe('LoginPage', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <LoginPage
        initializeAuth={blank__}
        logIn={blank__}
        errors={[]}
        submitting={false}
        {...props}
      />
    </MockedRouter>
  )

  const ConnectedRenderBase = (state = {}) => (
    <MockedRouterStore defaultState={{ ...state }}>
      <ConnectedLoginPage />
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) => render(ConnectedRenderBase(state))

  const emailInput = () => screen.getByRole('textbox', { name: /email/i })
  const passwordInput = () => screen.getByTestId('password').querySelector('input') as HTMLElement
  const logInButton = () => screen.getByRole('button', { name: /log in/i })

  it('triggers initialAuth on load', () => {
    const initializeAuth = jest.fn()

    customRender({ initializeAuth })

    expect(initializeAuth).toHaveBeenCalled()
  })

  it('triggers logIn with the email, username and password', () => {
    const logIn = jest.fn()
    customRender({ logIn })

    expect(logInButton()).toHaveAttribute('disabled')

    fireEvent.change(emailInput(), { target: { value: email } })
   
    expect(logInButton()).toHaveAttribute('disabled')
    fireEvent.change(passwordInput(), { target: { value: password } })

    expect(logInButton()).not.toHaveAttribute('disabled')
    fireEvent.click(logInButton())

    expect(logIn).toHaveBeenCalledWith({ user: { email, password } })
  })

  it('disables the submit button when submitting = true', () => {
    connectedRender({ auth: { submitting: true } })

    fireEvent.change(emailInput(), { target: { value: email } })
    fireEvent.change(passwordInput(), { target: { value: password } })
    
    expect(logInButton()).toHaveAttribute('disabled')
  })

  it('shows errors', () => {
    const { rerender, container } = connectedRender()
  
    rerender(ConnectedRenderBase({ auth: { errors } }))

    expect(container.querySelector('.MuiFormHelperText-root')).toHaveTextContent('Email or password is invalid')
  })
})
