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

const ChangePasswordForm = () => {
  const {
     errors = [],
     changePassword,
     submitting,
     initializeAuth
  } = useOutletContext<ProfileProps>()

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(
    () => {
      initializeAuth()
    }, [initializeAuth]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    changePassword({ user: { password, newPassword } })
  }

  return (
    <Box
      component='form'
      data-testid='ChangePasswordForm'
      onSubmit={handleSubmit}
      sx={(theme) => ({ marginTop: theme.spacing(2) })}
    >
      <Paper sx={(theme) => ({ padding: theme.spacing(3) })}>
        <Typography
          variant='h5'
          sx={textFieldSx}
        >
          Change Password
        </Typography>
        <TextField
          data-testid='password'
          required
          sx={textFieldSx}
          fullWidth
          variant='outlined'
          label='Password'
          name='password'
          type='password'
          onChange={({ target: { value }}) => setPassword(value)}
          value={password}
          slotProps={{
            input: { autoComplete: 'off' }
          }}
          error={Boolean(errors.find(({ source }) => source === 'password'))}
          helperText={errors.find(({ source }) => source === 'password')?.detail}
        />
        <TextField
          data-testid='newPassword'
          required
          sx={textFieldSx}
          fullWidth
          variant='outlined'
          label='New Password'
          name='newPassword'
          type='password'
          onChange={({ target: { value }}) => setNewPassword(value)}
          value={newPassword}
          slotProps={{
            input: { autoComplete: 'off' }
          }}
          error={Boolean(errors.find(({ source }) => source === 'new_password'))}
          helperText={errors.find(({ source }) => source === 'new_password')?.detail}
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
            disabled={!password || !newPassword || submitting}
            variant='contained'
            color='primary'
          >
            Change
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default ChangePasswordForm
