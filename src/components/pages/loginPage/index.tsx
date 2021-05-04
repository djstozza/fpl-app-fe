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

import Link from 'components/common/link'
import { SetElHeight } from 'utilities/helpers'
import { SIGN_UP_URL } from 'utilities/constants'

import { authActions } from 'state/auth'
import { stadiumCrowdLoader } from 'utilities/helpers'

import type { Error } from 'types'

type Props = {
  token?: string,
  submitting: boolean,
  logIn: Function,
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
    [theme.breakpoints.down('sm')]: {
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

const LoginPage = (props: Props) => {
  const { logIn, errors = [], submitting, initializeAuth } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backgroundRef = useRef(null)

  const { height } = SetElHeight(backgroundRef)

  const handleSubmit = (e) => {
    e.preventDefault()
    logIn({ user: { email, password } })
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

  return (
    <div ref={backgroundRef} className={classes.background}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Paper className={classes.paper}>
          <Typography variant='h5' className={classes.textField}>
            Log in
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
            error={Boolean(errors.find(({ source }) => source.includes('email')))}
            helperText={errors.find(({ source }) => source === 'email')?.detail}
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
            error={Boolean(errors.find(({ source }) => source.includes('password')))}
            helperText={errors.find(({ source }) => source.includes('password'))?.detail}
          />
          <Button
            type='submit'
            disabled={!email || !password || submitting}
            variant='contained'
            color='primary'
            className={classes.submitButton}
          >
            Log in
          </Button>

          <Typography>
            Don't have an account? <Link to={SIGN_UP_URL}>Sign up</Link> now!
          </Typography>
        </Paper>
      </form>
    </div>
  )
}

const mapStateToProps = ({ auth: { errors = [], submitting, token } }) => ({
  errors,
  submitting,
  token
})

const matchDispatchToProps = {
  initializeAuth: authActions.initializeAuth,
  logIn: authActions.logIn
}


export default connect(mapStateToProps, matchDispatchToProps)(LoginPage)
