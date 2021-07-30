import { Fragment, useState } from 'react'
import {
  TableRow,
  TableCell,
  IconButton
} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

type Props = {
  children: any,
  expandComponent?: any
}

const ExpandableTableRow = ({ children, expandComponent }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Fragment>
      <TableRow>
        <TableCell size='small'>
          <IconButton size='small' onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {
        isExpanded &&
        <TableRow>
          {expandComponent}
        </TableRow>
      }
    </Fragment>
  )
}

export default ExpandableTableRow
