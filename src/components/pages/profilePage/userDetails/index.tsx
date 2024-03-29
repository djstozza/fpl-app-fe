import { Fragment } from 'react'
import { useOutletContext } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme
} from '@mui/material'

import ButtonLink from 'components/common/buttonLink'
import { EDIT_USER_DETAILS_URL, CHANGE_PASSWORD_URL } from 'utilities/constants'
import type { ProfileProps } from '..'

const USER_DETAILS_ROWS = [
  { rowId: 'email', label: 'Email' },
  { rowId: 'username', label: 'Username' }
]

const useStyles = makeStyles()((theme: Theme) => ({
  table: {
    marginBottom: theme.spacing(2)
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}))

const UserDetails = () => {
  const { user } = useOutletContext<ProfileProps>()
  const { classes } = useStyles()

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
        <ButtonLink
          to={EDIT_USER_DETAILS_URL}
          color='primary'
          rightMargin
        >
          Edit Details
        </ButtonLink>
        <ButtonLink
          to={CHANGE_PASSWORD_URL}
          color='inherit'
        >
          Change Password
        </ButtonLink>
      </div>
    </Fragment>
  )
}

export default UserDetails
