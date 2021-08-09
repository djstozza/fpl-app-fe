import { createMount } from '@material-ui/core/test-utils'
import { TableCell } from '@material-ui/core'

import ExpandableTableRow from '.'

describe('ExpandableTableRow', () => {
  const children = (
    <TableCell>
      Child component
    </TableCell>
  )

  const expandComponent = (
    <TableCell colSpan='2'>
      Expanded component
    </TableCell>
  )

  const render = (props = {}) => createMount()(
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

  const button = wrapper => wrapper.find('button')
  const tableRow = wrapper => wrapper.find('WithStyles(ForwardRef(TableRow))')
  const tableCell = wrapper => wrapper.find('WithStyles(ForwardRef(TableCell))')

  it('shows the expanded component if the expand button has been clicked', () => {
    const wrapper = render()
    expect(tableRow(wrapper)).toHaveLength(1)
    expect(button(wrapper).find('ForwardRef(KeyboardArrowDownIcon)')).toHaveLength(1)
    expect(button(wrapper).find('ForwardRef(KeyboardArrowUpIcon)')).toHaveLength(0)
    expect(tableCell(wrapper)).toHaveLength(2)

    button(wrapper).simulate('click')
    expect(button(wrapper).find('ForwardRef(KeyboardArrowUpIcon)')).toHaveLength(1)
    expect(button(wrapper).find('ForwardRef(KeyboardArrowDownIcon)')).toHaveLength(0)
    expect(tableRow(wrapper)).toHaveLength(2)
    expect(tableCell(wrapper)).toHaveLength(3)
    expect(tableCell(wrapper).at(2).text()).toEqual('Expanded component')

    button(wrapper).simulate('click')
    expect(button(wrapper).find('ForwardRef(KeyboardArrowDownIcon)')).toHaveLength(1)
    expect(button(wrapper).find('ForwardRef(KeyboardArrowUpIcon)')).toHaveLength(0)
    expect(tableCell(wrapper)).toHaveLength(2)
  })
})
