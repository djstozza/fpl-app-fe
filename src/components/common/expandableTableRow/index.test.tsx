import { render, screen, fireEvent } from '@testing-library/react'
import { TableCell } from '@mui/material'

import ExpandableTableRow from '.'
import exp from 'constants'

describe('ExpandableTableRow', () => {
  const childComponentText = 'Child component'
  const expandedComponentText = 'Expanded component'
  const children = (
    <TableCell>
      {childComponentText}
    </TableCell>
  )

  const expandComponent = (
    <TableCell>
      {expandedComponentText}
    </TableCell>
  )

  const customRender = (props = {}) => render(
    <table>
      <tbody>
        <ExpandableTableRow
          children={children}
          expandComponent={expandComponent}
          {...props}
        />
      </tbody>
    </table>
  )

  // const button = wrapper => wrapper.find('button')
  // const tableRow = wrapper => wrapper.find('WithStyles(ForwardRef(TableRow))')
  // const tableCell = wrapper => wrapper.find('WithStyles(ForwardRef(TableCell))')

  const expandButton = () => screen.getByRole('button')
  const child = () => screen.queryByText(childComponentText, { selector: 'td' })
  const expand = () => screen.queryByText(expandedComponentText, { selector: 'td' })
  const keyboardArrowDownIcon = () => screen.queryByTestId('KeyboardArrowDownIcon')
  const keyboardArrowUpIcon = () => screen.queryByTestId('KeyboardArrowUpIcon')
  const tr = () => screen.queryAllByRole('row')

  it('shows the expanded component if the expand button has been clicked', () => {
    customRender()

    expect(child()).toBeInTheDocument()
    expect(expand()).not.toBeInTheDocument()
    expect(tr().length).toEqual(1)
    expect(keyboardArrowDownIcon()).toBeInTheDocument()
    expect(keyboardArrowUpIcon()).not.toBeInTheDocument()

    fireEvent.click(expandButton())

    expect(child()).toBeInTheDocument()
    expect(expand()).toBeInTheDocument()
    expect(tr().length).toEqual(2)
    expect(keyboardArrowDownIcon()).not.toBeInTheDocument()
    expect(keyboardArrowUpIcon()).toBeInTheDocument()
  })
})
