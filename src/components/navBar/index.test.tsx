import { createMount } from '@material-ui/core/test-utils'

import { NavBar } from '.'
import { USER_1 } from 'test/fixtures'
import { MockedRouter, blank__ } from 'test/helpers'

describe('NavBar', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <NavBar
        logOut={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const button = wrapper => wrapper.find('button')
  const menu = wrapper => wrapper.find('WithStyles(ForwardRef(Menu))')
  const accountMenu = wrapper => menu(wrapper).at(0)
  const link = wrapper => wrapper.find('Link')

  it('shows the log in and sign up buttons if there is no user', () => {
    const wrapper = render()
    expect(link(wrapper).at(3).find('ForwardRef(PersonAddIcon)')).toHaveLength(1)
    expect(link(wrapper).at(4).find('ForwardRef(PersonIcon)')).toHaveLength(1)
    expect(wrapper.find('ForwardRef(AccountCircleIcon)')).toHaveLength(0)
  })

  it('it renders a dropdown, which can be used by the user to logout if the user is present', () => {
    const logOut = jest.fn()
    const wrapper = render({ user: USER_1, logOut })

    expect(wrapper.find('PersonAddIcon')).toHaveLength(0)
    expect(wrapper.find('PersonIcon')).toHaveLength(0)

    expect(button(wrapper)).toHaveLength(2)

    const accountButton = button(wrapper).at(0)

    expect(accountMenu(wrapper).props().open).toEqual(false)

    expect(accountButton.find('ForwardRef(AccountCircleIcon)')).toHaveLength(1)
    accountButton.simulate('click')

    expect(accountMenu(wrapper).props().open).toEqual(true)

    expect(wrapper.find('WithStyles(ForwardRef(MenuItem))').at(3).text()).toEqual('Log out')
    wrapper.find('WithStyles(ForwardRef(MenuItem))').at(3).simulate('click')

    expect(accountMenu(wrapper).props().open).toEqual(false)
    expect(logOut).toHaveBeenCalled()
  })
})
