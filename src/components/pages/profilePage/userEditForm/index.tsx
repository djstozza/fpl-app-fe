import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box
} from '@mui/material'

import { PROFILE_URL } from 'utilities/constants'
import ButtonLink from 'components/common/buttonLink'
import type { ProfileProps } from '..'

const textFieldSx = (theme) => ({ paddingBottom: theme.spacing(2) })

const UserEditForm = () => {
  const {
    user: { email, username },
    errors = [],
    updateUser,
    submitting,
    initializeAuth
  } = useOutletContext<ProfileProps>()

  const [newEmail, setNewEmail] = useState(email)
  const [newUsername, setNewUsername] = useState(username)

  useEffect(
    () => {
      initializeAuth()
    }, [initializeAuth]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({ user: { email: newEmail, username: newUsername } })
  }

  const disableSubmit = (
    !email ||
    !username ||
    submitting ||
    (email.toLowerCase() == newEmail.toLowerCase() && username.toLowerCase() == newUsername.toLowerCase())
  )

  return (
    <Box
      component='form'
      data-testid='UserEditForm'
      onSubmit={handleSubmit}
      sx={(theme) => ({ marginTop: theme.spacing(2) })}
    >
      <Paper sx={(theme) => ({ padding: theme.spacing(3) })}>
        <Typography
          variant='h5'
          sx={textFieldSx}
        >
          Edit details
        </Typography>
        <TextField
          required
          sx={textFieldSx}
          fullWidth
          variant='outlined'
          label='Email'
          name='email'
          type='email'
          onChange={({ target: { value }}) => setNewEmail(value)}
          value={newEmail}
          error={Boolean(errors.find(({ source }) => source === 'email'))}
          helperText={errors.find(({ source }) => source === 'email')?.detail}
        />
        <TextField
          required
          sx={textFieldSx}
          fullWidth
          variant='outlined'
          label='Username'
          name='username'
          type='text'
          onChange={({ target: { value }}) => setNewUsername(value)}
          value={newUsername}
          error={Boolean(errors.find(({ source }) => source === 'username'))}
          helperText={errors.find(({ source }) => source === 'username')?.detail}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonLink
            to={PROFILE_URL}
            color='inherit'
            rightMargin
          >
            Cancel
          </ButtonLink>
          <Button
            type='submit'
            disabled={disableSubmit}
            variant='contained'
            color='primary'
          >
            Update
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default UserEditForm
