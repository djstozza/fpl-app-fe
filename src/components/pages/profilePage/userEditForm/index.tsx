import { useState, useEffect } from 'react'
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

import type { User, Error } from 'types'

type Props = {
  user: User,
  errors: Error[],
  updateUser: Function,
  submitting: boolean,
  initializeAuth: () => void
}

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

const UserEditForm = (props: Props) => {
  const {
    user: { email, username },
    errors = [],
    updateUser,
    submitting,
    initializeAuth
  } = props

  const { classes } = useStyles()

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

  return (
    <form onSubmit={handleSubmit} className={classes.form}>

      <Paper className={classes.paper}>
        <Typography
          variant='h5'
          className={classes.formHeader}
        >
          Edit details
        </Typography>
        <TextField
          required
          className={classes.textField}
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
          className={classes.textField}
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
        <div className={classes.actions}>
          <ButtonLink
            to={PROFILE_URL}
            color='default'
            rightMargin
          >
            Cancel
          </ButtonLink>
          <Button
            type='submit'
            disabled={!email || !username || submitting}
            variant='contained'
            color='primary'
          >
            Update
          </Button>
        </div>
      </Paper>
    </form>
  )
}

export default UserEditForm
