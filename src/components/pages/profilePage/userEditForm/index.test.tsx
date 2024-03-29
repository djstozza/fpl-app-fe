import { fireEvent, render, screen } from '@testing-library/react'

import UserEditForm from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { USER_1 } from 'test/fixtures'

import {
  PROFILE_URL
} from 'utilities/constants'

const email = 'newemail@exmaple.com'
const username = 'New username'

const errors = [
  {
    code: 'is invalid',
    detail: 'Email has already been taken',
    source: 'email',
    title: 'Is Invalid'
  },
  {
    code: 'is invalid',
    detail: 'Username has already been taken',
    source: 'username',
    title: 'Is Invalid'
  }
]

describe('UserEditForm', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      user: USER_1,
      initializeAuth: blank__,
      updateUser: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <UserEditForm />
      </RouteWithOutletContext>
    )
  }

  const heading = () => screen.getByRole('heading')
  const emailInput = () => screen.getByRole('textbox', { name: /email/i })
  const usernameInput = () => screen.getByRole('textbox', { name: /username/i })
  const submitButton = () => screen.getByRole('button', { name: /update/i })
  const cancel = () => screen.getByText('Cancel')

  it('renders the title', () => {
    customRender()
    expect(heading()).toHaveTextContent('Edit details')
  })

  it('triggers initialForm on load', () => {
    const initializeAuth = jest.fn()

    customRender({ initializeAuth })

    expect(initializeAuth).toHaveBeenCalled()
  })

  it('triggers updateUser with the email and username', () => {
    const updateUser = jest.fn()
    customRender({ updateUser })

    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.change(emailInput(), { target: { value: email } })
    fireEvent.change(usernameInput(), { target: { value: username } })

    fireEvent.click(submitButton())

    expect(updateUser).toHaveBeenCalledWith({ user: { email, username } })
  })

  it('shows errors', () => {
    const { container } = customRender({ errors })

    expect(emailInput()).toHaveAttribute('aria-invalid', 'true')
    expect(container.querySelectorAll('.MuiFormHelperText-root')[0]).toHaveTextContent(errors[0].detail)
    

    expect(usernameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(container.querySelectorAll('.MuiFormHelperText-root')[1]).toHaveTextContent(errors[1].detail)
  })

  it('disables the submit button if submitting = true', () => {
    customRender({ submitting: true })

    fireEvent.change(emailInput(), { target: { value: email } })
    fireEvent.change(usernameInput(), { target: { value: username } })

    expect(submitButton()).toHaveAttribute('disabled')
  })

  it('renders the cancel button', () => {
    customRender()
    expect(cancel()).toHaveAttribute('href', PROFILE_URL)
  })
})
