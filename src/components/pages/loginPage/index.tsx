import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from 'tss-react/mui'
import {
  Typography,
  TextField,
  Button,
  Theme,
  Paper
} from '@mui/material'

import Link from 'components/common/link'
import { SetElHeight } from 'utilities/helpers'
import { SIGN_UP_URL, TITLE } from 'utilities/constants'

import { authActions } from 'state/auth'
import { stadiumCrowdLoader } from 'utilities/helpers'

import type { Error } from 'types'

type Props = {
  token?: string,
  submitting: boolean,
  logIn: Function,
  initializeAuth: () => void,
  errors: Error[]
}

type StyleProps = {
  height: number
}

const useStyles = makeStyles<StyleProps>()((theme: Theme, { height }) => ({
  background: {
    width: '100vw',
    height: height,
    display: 'block',
    backgroundImage: `url(${stadiumCrowdLoader()})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  form: {
    display: 'flex',
    position: 'fixed',
    [theme.breakpoints.up('sm')]: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      top: '35%'
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
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noWrap: {
    whiteSpace: 'nowrap'
  }
}));

export const LoginPage = (props: Props) => {
  const { 
    logIn,
    errors,
    submitting,
    initializeAuth
  } = props
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

  const firstUpdate = useRef(true)

  useEffect(
    () => {
      if (firstUpdate.current) {
        initializeAuth()
        firstUpdate.current = false
      }
    }, [initializeAuth]
  )

  const { classes } = useStyles({ height })

  document.title = `${TITLE} - Log In`

  return (
    <div
      data-testid='LoginPage'
      ref={backgroundRef}
      className={classes.background}
    >
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
            error={Boolean(errors?.find(({ source }) => source.includes('email')))}
            helperText={errors?.find(({ source }) => source === 'email')?.detail}
          />
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
            error={Boolean(errors?.find(({ source }) => source.includes('password')))}
            helperText={errors?.find(({ source }) => source.includes('password'))?.detail}
          />
          <div className={classes.actions}>
            <div>
              <Typography>
                Don't have an account?
              </Typography>
              <Typography>
                <Link to={SIGN_UP_URL}>Sign up</Link> now!
              </Typography>
            </div>
            <Button
              className={classes.noWrap}
              type='submit'
              disabled={!email || !password || submitting}
              variant='contained'
              color='primary'
            >
              Log in
            </Button>
          </div>
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
