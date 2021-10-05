import { createMount } from '@material-ui/core/test-utils'

import PlayerImage from '.'

const code = 1234
const lastName = 'Last Name'
const maxHeight = 45

describe('PlayerImage', () => {
  const render = (props = {}) => createMount()(
    <PlayerImage
      code={code}
      lastName={lastName}
      maxHeight={maxHeight}
      {...props}
    />
  )

  it('foo', () => {
    const wrapper = render()

    expect(wrapper.find('PlayerImage').props()).toMatchObject({ code, lastName, maxHeight })
  })
})
