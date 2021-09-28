import { createMount } from '@material-ui/core/test-utils'

import ConnectedSignUpPage, { SignUpPage } from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'

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
  const promise = Promise.resolve()

  const render = (props = {}, state = {}) => createMount()(
    <MockedRouterStore>
      <SignUpPage
        initializeAuth={blank__}
        signUp={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) => createMount()(
    <MockedRouterStore defaultState={{ ...state }}>
      <ConnectedSignUpPage initializeAuth={blank__} />
    </MockedRouterStore>
  )

  const emailInput = wrapper => wrapper.find({ name: 'email' }).find('input')
  const usernameInput = wrapper => wrapper.find({ name: 'username' }).find('input')
  const passwordInput = wrapper => wrapper.find({ name: 'password' }).find('input')
  const submitButton = wrapper => wrapper.find('button')
  const helperText = wrapper => wrapper.find('WithStyles(ForwardRef(FormHelperText))')

  it('triggers initialAuth on load', () => {
    const initializeAuth = jest.fn()

    render({ initializeAuth })

    expect(initializeAuth).toHaveBeenCalled()
  })

  it('triggers signUp with the email, username and password', () => {
    const signUp = jest.fn()
    const wrapper = render({ signUp })

    expect(submitButton(wrapper).props().disabled).toEqual(true)

    emailInput(wrapper).simulate('change', { target: { value: email } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    usernameInput(wrapper).simulate('change', { target: { value: username } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    passwordInput(wrapper).simulate('change', { target: { value: password } })

    expect(submitButton(wrapper).props().disabled).toEqual(false)

    submitButton(wrapper).simulate('submit')

    expect(signUp).toHaveBeenCalledWith({ user: { email, username, password } })
  })

  it('disables the submit button when submitting = true', () => {
    const wrapper = connectedRender({ auth: { submitting: true } })

    emailInput(wrapper).simulate('change', { target: { value: email } })
    usernameInput(wrapper).simulate('change', { target: { value: username } })
    passwordInput(wrapper).simulate('change', { target: { value: password } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)
  })

  it('shows errors', () => {
    const wrapper = connectedRender({ auth: { errors } })
    expect(helperText(wrapper).at(0).text()).toEqual('Email has already been taken')
    expect(helperText(wrapper).at(1).text()).toEqual('Username has already been taken')
    expect(helperText(wrapper).at(2).text()).toEqual('Password is too short (minimum is 8 characters)')
    expect(emailInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(usernameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(passwordInput(wrapper).props()['aria-invalid']).toEqual(true)
  })
})
