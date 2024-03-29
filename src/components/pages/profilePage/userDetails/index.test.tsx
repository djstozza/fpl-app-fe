import { within, render, screen } from '@testing-library/react'

import UserDetails from '.'
import { RouteWithOutletContext } from 'test/helpers'
import { USER_1 } from 'test/fixtures'
import { EDIT_USER_DETAILS_URL, CHANGE_PASSWORD_URL } from 'utilities/constants'

describe('UserDetails', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      user: USER_1,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <UserDetails />
      </RouteWithOutletContext>
    )
  }

  const tableRows = () => screen.getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]

  const link = (text) => screen.getByRole('link', { name: text })

  it('renders the user details', () => {
    customRender()

    expect(tableCell(0, 0)).toHaveTextContent('Email')
    expect(tableCell(0, 1)).toHaveTextContent(USER_1.email)

    expect(tableCell(1, 0)).toHaveTextContent('Username')
    expect(tableCell(1, 1)).toHaveTextContent(USER_1.username)
  })

  it('renders the edit buttons', () => {
    customRender()

    expect(link('Edit Details')).toHaveAttribute('href', EDIT_USER_DETAILS_URL)
    expect(link('Change Password')).toHaveAttribute('href', CHANGE_PASSWORD_URL)
  })
})
