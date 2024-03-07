import { render, screen } from '@testing-library/react'

import DraftCompletedAlert from '.'

describe('DraftCompletedAlert', () => {
  const customRender = (props = {}) => render(
    <DraftCompletedAlert
      substr='substr'
      showAlert
      {...props}
    />
  )

  // const alert = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))')

  it('shows the alert', () => {
    customRender()
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('MuiAlert-filledSuccess')
    expect(alert).toHaveTextContent('The substr has successfully been completed')
  })

  it('does not show the alert if showAlert = false', () => {
    customRender({ showAlert: false })

    const alert = screen.queryByRole('alert')
    expect(alert).toBeNull()
  })
})
