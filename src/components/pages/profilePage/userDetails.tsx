import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'

import { PROFILE_URL } from 'utilities/constants'

import type { User } from 'types'

type Props = {
  user: User
}

const USER_DETAILS_ROWS = [
  { rowId: 'email', label: 'Email' },
  { rowId: 'username', label: 'Username' }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      marginBottom: theme.spacing(2)
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  })
)

const UserDetails = (props: Props) => {
  const { user } = props
  const classes = useStyles()

  return (
    <Fragment>
      <Table
        className={classes.table}
        size='small'
      >
        <TableBody>
          {
            USER_DETAILS_ROWS.map(({ rowId, label }) => (
              <TableRow key={rowId}>
                <TableCell align='center'>
                  {label}
                </TableCell>
                <TableCell align='center'>
                  {user[rowId]}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <div className={classes.actions}>
        <Button
          component={Link}
          to={`${PROFILE_URL}/details/edit`}
          variant='contained'
          color='primary'
        >
          Edit Details
        </Button>
      </div>
    </Fragment>
  )
}

export default UserDetails
