import { Fragment } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box
} from '@mui/material'

import ButtonLink from 'components/common/buttonLink'
import { EDIT_USER_DETAILS_URL, CHANGE_PASSWORD_URL } from 'utilities/constants'
import type { ProfileProps } from '..'

const USER_DETAILS_ROWS = [
  { rowId: 'email', label: 'Email' },
  { rowId: 'username', label: 'Username' }
]

const UserDetails = () => {
  const { user } = useOutletContext<ProfileProps>()

  return (
    <Fragment>
      <Table
        sx={(theme) => ({ marginBottom: theme.spacing(2) })}
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
      </Box>
    </Fragment>
  )
}

export default UserDetails
