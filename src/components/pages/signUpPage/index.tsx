import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  TextField,
  Button,
  Theme,
  Paper,
  makeStyles
} from '@material-ui/core'

import { SetElHeight } from 'utilities/helpers'

import { authActions } from 'state/auth'
import { stadiumCrowdLoader } from 'utilities/helpers'
import { LOGIN_URL, TITLE } from 'utilities/constants'
import Link from 'components/common/link'

import type { Error } from 'types'

type Props = {
  token?: string,
  submitting: boolean,
  signUp: Function,
  initializeAuth: Function,
  errors: Error[]
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    width: '100vw',
    height: ({ height }:{ height: number }) => height,
    display: 'block',
    backgroundImage: `url(${stadiumCrowdLoader()})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  form: {
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
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

const SignUpPage = (props: Props) => {
  const { signUp, errors = [], submitting, initializeAuth } = props
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const backgroundRef = useRef(null)

  const { height } = SetElHeight(backgroundRef)

  const handleSubmit = (e) => {
    e.preventDefault()
    signUp({ user: { email, username, password } })
  }

  useEffect(() => {
    if (!height) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [height])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const classes = useStyles({ height })

  document.title = `${TITLE} - Sign Up`

  return (
    <div ref={backgroundRef} className={classes.background}>
      <form onSubmit={handleSubmit} className={classes.form}>
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
          <div className={classes.actions}>
            <Typography><Link to={LOGIN_URL}>Log in</Link> if you already have an account</Typography>
            <Button
              type='submit'
              disabled={!email || !username || !password || submitting}
              variant='contained'
              color='primary'
            >
              Submit
            </Button>
          </div>

        </Paper>
      </form>
    </div>
  )
}

const mapStateToProps = ( { auth: { errors, submitting, token } }) => ({
  errors,
  submitting,
  token
})

const matchDispatchToProps = {
  initializeAuth: authActions.initializeAuth,
  signUp: authActions.signUp
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUpPage)
