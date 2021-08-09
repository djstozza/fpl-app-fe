import { createMount } from '@material-ui/core/test-utils'

import Link from '.'
import { MockedRouter } from 'test/helpers'

describe('Link', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <Link
        to='/foo/1'
        {...props}
      >
        This is a link
      </Link>
    </MockedRouter>
  )

  const link = wrapper => wrapper.find('Link').at(1)

  it('renders a link wih the team crest', () => {
    const wrapper = render()

    expect(link(wrapper).text()).toEqual('This is a link')
    expect(link(wrapper).props().to).toEqual('/foo/1')
  })

  it('adds the noWrap and imageContainer', () => {
    const wrapper = render({ noWrap: true, image: true })

    expect(link(wrapper).props().className).toContain('noWrap')
    expect(link(wrapper).props().className).toContain('imageContainer')
  })
})
