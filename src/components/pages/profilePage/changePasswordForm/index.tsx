import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import {
  Typography,
  TextField,
  Button,
  Theme,
  Paper
} from '@mui/material'


import { PROFILE_URL } from 'utilities/constants'
import ButtonLink from 'components/common/buttonLink'
import type { ProfileProps } from '..'

const useStyles = makeStyles()((theme: Theme) => ({
  form: {
    marginTop: theme.spacing(2)
  },
  textField: {
    paddingBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3)
  },
  formHeader: {
    paddingBottom: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const ChangePasswordForm = () => {
  const {
     errors = [],
     changePassword,
     submitting,
     initializeAuth
  } = useOutletContext<ProfileProps>()

  const { classes } = useStyles()

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
    <form
      data-testid='ChangePasswordForm'
      onSubmit={handleSubmit}
      className={classes.form}
    >
      <Paper className={classes.paper}>
        <Typography
          variant='h5'
          className={classes.formHeader}
        >
          Change Password
        </Typography>
        <TextField
          data-testid='password'
          required
          className={classes.textField}
          fullWidth
          variant='outlined'
          label='Password'
          name='password'
          type='password'
          onChange={({ target: { value }}) => setPassword(value)}
          value={password}
          InputProps={{
            autoComplete: 'off'
          }}
          error={Boolean(errors.find(({ source }) => source === 'password'))}
          helperText={errors.find(({ source }) => source === 'password')?.detail}
        />
        <TextField
          data-testid='newPassword'
          required
          className={classes.textField}
          fullWidth
          variant='outlined'
          label='New Password'
          name='newPassword'
          type='password'
          onChange={({ target: { value }}) => setNewPassword(value)}
          value={newPassword}
          InputProps={{
            autoComplete: 'off'
          }}
          error={Boolean(errors.find(({ source }) => source === 'new_password'))}
          helperText={errors.find(({ source }) => source === 'new_password')?.detail}
        />
        <div className={classes.actions}>
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
        </div>
      </Paper>
    </form>
  )
}

export default ChangePasswordForm
