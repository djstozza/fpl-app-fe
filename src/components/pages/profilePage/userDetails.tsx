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

import { EDIT_USER_DETIALS_URL, CHANGE_PASSWORD_URL } from 'utilities/constants'

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
    },
    changePasswordButton: {
      marginLeft: theme.spacing(1)
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
          to={EDIT_USER_DETIALS_URL}
          variant='contained'
          color='primary'
        >
          Edit Details
        </Button>
        <Button
          component={Link}
          to={CHANGE_PASSWORD_URL}
          variant='contained'
          color='default'
          className={classes.changePasswordButton}
        >
          Change Password
        </Button>
      </div>
    </Fragment>
  )
}

export default UserDetails
