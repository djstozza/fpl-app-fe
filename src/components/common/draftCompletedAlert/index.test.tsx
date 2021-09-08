import { createMount } from '@material-ui/core/test-utils'

import DraftCompletedAlert from '.'

describe('DraftCompletedAlert', () => {
  const render = (props = {}) => createMount()(
    <DraftCompletedAlert
      substr='substr'
      showAlert
      {...props}
    />
  )

  const alert = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))')

  it('shows the alert', () => {
    const wrapper = render()

    expect(alert(wrapper).text()).toEqual('The substr has successfully been completed')
  })

  it('does not show the alert if showAlert = false', () => {
    const wrapper = render({ showAlert: false })

    expect(alert(wrapper)).toHaveLength(0)
  })
})
