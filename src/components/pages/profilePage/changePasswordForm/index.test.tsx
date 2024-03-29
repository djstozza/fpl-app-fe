import { fireEvent, render, screen } from '@testing-library/react'

import ChangePasswordForm from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'

import {
  PROFILE_URL
} from 'utilities/constants'

const password = 'password'
const newPassword = 'newPassword'

const errors = [
  {
    code: 'is invalid',
    detail: 'Password is too short',
    source: 'password',
    title: 'Is Invalid'
  },
  {
    code: 'is invalid',
    detail: 'New password is too short',
    source: 'new_password',
    title: 'Is Invalid'
  }
]

describe('ChangePasswordForm', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      initializeAuth: blank__,
      changePassword: blank__,
      ...context
    }

    return render(
      <RouteWithOutletContext context={baseContext}>
        <ChangePasswordForm  />
      </RouteWithOutletContext>
    )
  }

  const passwordInput = () => screen.getByTestId('password').querySelector('input') as HTMLElement
  const newPasswordInput = () => screen.getByTestId('newPassword').querySelector('input') as HTMLElement
  const submitButton = () => screen.getByRole('button', { name: /change/i })
  const cancel = () => screen.getByText('Cancel')
  
  it('renders the title', () => {
    customRender()

    expect(screen.getByRole('heading')).toHaveTextContent('Change Password')
  })

  it('triggers initialForm on load', () => {
    const initializeAuth = jest.fn()

    customRender({ initializeAuth })

    expect(initializeAuth).toHaveBeenCalled()
  })

  it('triggers changePassword with the password and newPassword', () => {
    const changePassword = jest.fn()
    customRender({ changePassword })
    fireEvent.change(passwordInput(), { target: { value: password } })

    expect(submitButton()).toHaveAttribute('disabled')
    fireEvent.change(newPasswordInput(), { target: { value: newPassword } })

    fireEvent.click(submitButton())
  })

  it('shows errors', () => {
    const { container } = customRender({ errors })

    expect(passwordInput()).toHaveAttribute('aria-invalid', 'true')
    expect(container.querySelectorAll('.MuiFormHelperText-root')[0]).toHaveTextContent(errors[0].detail)
    

    expect(newPasswordInput()).toHaveAttribute('aria-invalid', 'true')
    expect(container.querySelectorAll('.MuiFormHelperText-root')[1]).toHaveTextContent(errors[1].detail)
  })

  it('disables the submit button if submitting = true', () => {
    customRender({ submitting: true })

    expect(submitButton()).toHaveAttribute('disabled')
  })

  it('renders the cancel button', () => {
    customRender()
    expect(cancel()).toHaveAttribute('href', PROFILE_URL)
  })
})
