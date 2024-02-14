import { Fragment, useState } from 'react'
import {
  TableRow,
  TableCell,
  IconButton
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

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
