import { createMount } from '@material-ui/core/test-utils'

import UserEditForm from '.'
import { MockedRouter, blank__ } from 'test/helpers'
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
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <UserEditForm
        user={USER_1}
        initializeAuth={blank__}
        updateUser={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const emailInput = wrapper => wrapper.find({ name: 'email' }).find('input')
  const usernameInput = wrapper => wrapper.find({ name: 'username' }).find('input')
  const submitButton = wrapper => wrapper.find({ type: 'submit' }).find('button')
  const emailHelperText = wrapper => wrapper.find({ name: 'email' }).find('WithStyles(ForwardRef(FormHelperText))')
  const usernameHelperText = wrapper => (
    wrapper.find({ name: 'username' }).find('WithStyles(ForwardRef(FormHelperText))')
  )

  it('renders the title', () => {
    const wrapper = render()
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text()).toEqual('Edit details')
  })

  it('triggers initialForm on load', () => {
    const initializeAuth = jest.fn()

    render({ initializeAuth })

    expect(initializeAuth).toHaveBeenCalled()
  })

  it('triggers updateUser with the email and username', () => {
    const updateUser = jest.fn()
    const wrapper = render({ updateUser })

    emailInput(wrapper).simulate('change', { target: { value: email } })

    usernameInput(wrapper).simulate('change', { target: { value: username } })

    submitButton(wrapper).simulate('submit')

    expect(updateUser).toHaveBeenCalledWith({ user: { email, username } })
  })

  it('shows errors', () => {
    const wrapper = render({ errors })

    expect(emailInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(emailHelperText(wrapper).text()).toEqual(errors[0].detail)

    expect(usernameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(usernameHelperText(wrapper).text()).toEqual(errors[1].detail)
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
