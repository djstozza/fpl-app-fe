import { fireEvent, render, screen } from '@testing-library/react'

import ConnectedSignUpPage, { SignUpPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'

const email = 'user@example.com'
const username = 'user 1'
const password = 'password'
const errors = [
  {
    code: 'taken',
    detail: 'Email has already been taken',
    source: 'email',
    title: 'Taken'
  },
  {
    code: 'too_short',
    detail: 'Password is too short (minimum is 8 characters)',
    source: 'password',
    title: 'Too Short'
  },
  {
    code: 'taken',
    detail: 'Username has already been taken',
    source: 'username',
    title: 'Taken'
  }
]

describe('SignUpPage', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <SignUpPage
        submitting={false}
        errors={[]}
        initializeAuth={blank__}
        signUp={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const ConnectedRenderBase = (state = {}) => (
    <MockedRouterStore defaultState={{ ...state }}>
      <ConnectedSignUpPage />
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) => render(ConnectedRenderBase(state))

  const emailInput = () => screen.getByRole('textbox', { name: /email/i })
  const usernameInput = () => screen.getByRole('textbox', { name: /username/i })
  const passwordInput = () => screen.getByTestId('password').querySelector('input') as HTMLElement
  const submitButton = () => screen.getByRole('button', { name: /submit/i })

  it('triggers initialAuth on load', () => {
    const initializeAuth = jest.fn()

    customRender({ initializeAuth })

    expect(initializeAuth).toHaveBeenCalled()
  })

  it('triggers signUp with the email, username and password', () => {
    const signUp = jest.fn()
    customRender({ signUp })

    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.change(emailInput(), { target: { value: email } })
    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.change(usernameInput(), { target: { value: username } })
    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.change(passwordInput(), { target: { value: password } })

    fireEvent.click(submitButton())

    expect(signUp).toHaveBeenCalledWith({ user: { email, username, password } })
  })

  it('disables the submit button when submitting = true', () => {
    connectedRender({ auth: { submitting: true } })

    fireEvent.change(emailInput(), { target: { value: email } })
    fireEvent.change(usernameInput(), { target: { value: username } })
    fireEvent.change(passwordInput(), { target: { value: password } })
    expect(submitButton()).toHaveAttribute('disabled')
  })

  it('shows errors', () => {
    const { container, rerender } = connectedRender({ auth: { errors } })
    rerender(ConnectedRenderBase({ auth: { errors } }))
    rerender(ConnectedRenderBase({ auth: { errors } }))

    const helperText = container.querySelectorAll('.MuiFormHelperText-root')
    expect(helperText[0]).toHaveTextContent('Email has already been taken')
    expect(helperText[1]).toHaveTextContent('Username has already been taken')
    expect(helperText[2]).toHaveTextContent('Password is too short (minimum is 8 characters)')
    
    expect(emailInput()).toHaveAttribute('aria-invalid', 'true')
    expect(usernameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(passwordInput()).toHaveAttribute('aria-invalid', 'true')
  })
})
