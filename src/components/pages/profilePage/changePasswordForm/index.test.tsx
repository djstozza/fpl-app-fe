import { createMount } from '@material-ui/core/test-utils'

import ChangePasswordForm from '.'
import { MockedRouter, blank__ } from 'test/helpers'

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
  const render = (props = {}, state = {}) => createMount()(
    <MockedRouter>
      <ChangePasswordForm
        initializeAuth={blank__}
        changePassword={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const passwordInput = wrapper => wrapper.find({ name: 'password' }).find('input')
  const newPasswordInput = wrapper => wrapper.find({ name: 'newPassword' }).find('input')
  const submitButton = wrapper => wrapper.find({ type: 'submit' }).find('button')
  const passwordHelperText = wrapper => wrapper.find({ name: 'password' }).find('WithStyles(ForwardRef(FormHelperText))')
  const newPasswordHelperText = wrapper => (
    wrapper.find({ name: 'newPassword' }).find('WithStyles(ForwardRef(FormHelperText))')
  )

  it('renders the title', () => {
    const wrapper = render()
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text()).toEqual('Change Password')
  })

  it('triggers initialForm on load', () => {
    const initializeAuth = jest.fn()

    render({ initializeAuth })

    expect(initializeAuth).toHaveBeenCalled()
  })

  it('triggers changePassword with the password and newPassword', () => {
    const changePassword = jest.fn()
    const wrapper = render({ changePassword })

    passwordInput(wrapper).simulate('change', { target: { value: password } })

    newPasswordInput(wrapper).simulate('change', { target: { value: newPassword } })

    submitButton(wrapper).simulate('submit')

    expect(changePassword).toHaveBeenCalledWith({ user: { password, newPassword } })
  })

  it('shows errors', () => {
    const wrapper = render({ errors })

    expect(passwordInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(passwordHelperText(wrapper).text()).toEqual(errors[0].detail)

    expect(newPasswordInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(newPasswordHelperText(wrapper).text()).toEqual(errors[1].detail)
  })

  it('disables the submit button if submitting = true', () => {
    const wrapper = render({ submitting: true })

    expect(submitButton(wrapper).props().disabled).toEqual(true)
  })

  it('renders the cancel button', () => {
    const wrapper = render()
    expect(wrapper.find('ButtonLink').at(0).props().to).toEqual(PROFILE_URL)
    expect(wrapper.find('ButtonLink').at(0).text()).toEqual('Cancel')
  })
})
