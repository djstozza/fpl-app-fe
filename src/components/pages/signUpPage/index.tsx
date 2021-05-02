import { useState } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  TextField,
  Button,
  Theme,
  Paper,
  makeStyles
} from '@material-ui/core'

import { signUpActions } from 'state/signUp'

import type { Error } from 'types'

type Props = {
  token?: string,
  submitted: boolean,
  submitting: boolean,
  signUp: Function,
  errors: Error[]
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      top: '22.5%'
    },
  },
  paper: {
    padding: theme.spacing(3),
    [theme.breakpoints.only('sm')]: {
      width: '100vw'
    }
  },
  textField: {
    paddingBottom: theme.spacing(2)
  },
  submitButton: {
    float: 'right'
  }
}))

const SignUpPage = (props: Props) => {
  const { signUp, errors, submitting } = props
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
    signUp({ user: { email, username, password } })
  }

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant='h5' className={classes.textField}>
          Sign Up
        </Typography>
        <TextField
          required
          className={classes.textField}
          fullWidth
          variant='outlined'
          label='Email'
          name='email'
          type='email'
          onChange={({ target: { value }}) => setEmail(value)}
          value={email}
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
          onChange={({ target: { value }}) => setUsername(value)}
          value={username}
          error={Boolean(errors.find(({ source }) => source === 'username'))}
          helperText={errors.find(({ source }) => source === 'username')?.detail}
        />
        <TextField
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
        <Button
          type='submit'
          disabled={Boolean(errors.length) || !email || !username || !password || submitting}
          variant='contained'
          color='primary'
          className={classes.submitButton}
        >
          Submit
        </Button>
      </Paper>
    </form>
  )
}

const mapStateToProps = ({ signUp: { errors, submitted, submitting, token } }) => ({
  errors,
  submitted,
  submitting,
  token
})

const matchDispatchToProps = {
  signUp: signUpActions.signUp
}


export default connect(mapStateToProps, matchDispatchToProps)(SignUpPage)
