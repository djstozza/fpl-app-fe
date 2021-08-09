import { createMount } from '@material-ui/core/test-utils'

import ButtonLink from '.'
import { MockedRouter } from 'test/helpers'

describe('User Login Form', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <ButtonLink
        to='foo/1'
        children='This is a link'
        {...props}
      />
    </MockedRouter>
  )

  const button = wrapper => wrapper.find('WithStyles(ForwardRef(Button))')
  const link = wrapper => button(wrapper).find('Link')

  it('renders the button link', () => {
    const wrapper = render({ color: 'primary', size: 'small' })

    expect(link(wrapper).text()).toEqual('This is a link')
    expect(link(wrapper).props().to).toEqual('foo/1')
    expect(button(wrapper).props().variant).toEqual('contained')
    expect(button(wrapper).props().size).toEqual('small')
    expect(button(wrapper).props().color).toEqual('primary')
  })

  it('adds a right margin if rightMargin = true', () => {
    const wrapper = render({ rightMargin: true })

    expect(button(wrapper).props().className).toContain('rightMargin')
  })
})
