import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  TextField,
  Button,
  Theme,
  Paper,
  makeStyles
} from '@material-ui/core'

import { PROFILE_URL } from 'utilities/constants'

import type { User, Error } from 'types'

type Props = {
  user: User,
  errors: Error[],
  updateUser: Function,
  submitting: boolean,
  initializeAuth: Function
}

const useStyles = makeStyles((theme: Theme) => ({
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
  },
  cancelButton: {
    marginRight: theme.spacing(1)
  }
}))

const UserEditForm = (props: Props) => {
  const {
     user: { email, username },
     errors,
     updateUser,
     submitting,
     initializeAuth
  } = props

  const classes = useStyles()

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
          <Button
            component={Link}
            to={PROFILE_URL}
            variant='contained'
            color='default'
            className={classes.cancelButton}
          >
            Cancel
          </Button>
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
