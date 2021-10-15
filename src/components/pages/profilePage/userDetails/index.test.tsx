import { createMount } from '@material-ui/core/test-utils'

import UserDetails from '.'
import { MockedRouter } from 'test/helpers'
import { USER_1 } from 'test/fixtures'
import { EDIT_USER_DETAILS_URL, CHANGE_PASSWORD_URL } from 'utilities/constants'

describe('UserDetails', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <UserDetails
        user={USER_1}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const buttonLink = wrapper => wrapper.find('ButtonLink')

  it('renders the user details', () => {
    const wrapper = render()

    expect(tableCell(wrapper, 0, 0).text()).toEqual('Email')
    expect(tableCell(wrapper, 0, 1).text()).toEqual(USER_1.email)

    expect(tableCell(wrapper, 1, 0).text()).toEqual('Username')
    expect(tableCell(wrapper, 1, 1).text()).toEqual(USER_1.username)
  })

  it('renders the edit buttons', () => {
    const wrapper = render()

    expect(buttonLink(wrapper).at(0).props().to).toEqual(EDIT_USER_DETAILS_URL)
    expect(buttonLink(wrapper).at(0).text()).toEqual('Edit Details')

    expect(buttonLink(wrapper).at(1).props().to).toEqual(CHANGE_PASSWORD_URL)
    expect(buttonLink(wrapper).at(1).text()).toEqual('Change Password')
  })
})
