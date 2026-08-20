import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box
} from '@mui/material'

import { SetElHeight } from 'utilities/helpers'

import { authActions } from 'state/auth'
import { stadiumCrowdLoader } from 'utilities/helpers'
import { LOGIN_URL, TITLE } from 'utilities/constants'
import Link from 'components/common/link'

import type { Error } from 'types'

type Props = {
  submitting: boolean,
  signUp: Function,
  initializeAuth: () => void,
  errors: Error[]
}

const formSx = (theme) => ({
  display: 'flex',
  position: 'fixed',
  [theme.breakpoints.up('sm')]: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
    top: '33%'
  },
})

const paperSx = (theme) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.only('sm')]: {
    width: '100vw'
  }
})

const textFieldSx = (theme) => ({ paddingBottom: theme.spacing(2) })

const actionsSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export const SignUpPage = (props: Props) => {
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

  const firstUpdate = useRef(true)

  useEffect(() => {
    if (!height) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [height])

  useEffect(() => {
    if (firstUpdate.current) {
      initializeAuth()
      firstUpdate.current = false
    }
  }, [initializeAuth])

  document.title = `${TITLE} - Sign Up`

  return (
    <Box
      data-testid='SignUpPage'
      ref={backgroundRef}
      sx={{
        width: '100vw',
        height,
        display: 'block',
        backgroundImage: `url(${stadiumCrowdLoader()})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box component='form' onSubmit={handleSubmit} sx={formSx}>
        <Paper sx={paperSx}>
          <Typography variant='h5' sx={textFieldSx}>
            Sign Up
          </Typography>
          <TextField
            required
            sx={textFieldSx}
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
            sx={textFieldSx}
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
            sx={textFieldSx}
            fullWidth
            variant='outlined'
            data-testid='password'
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
          <Box sx={actionsSx}>
            <Typography><Link to={LOGIN_URL}>Log in</Link> if you already have an account</Typography>
            <Button
              type='submit'
              disabled={!email || !username || !password || submitting}
              variant='contained'
              color='primary'
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

const mapStateToProps = ({ auth: { errors, submitting } }) => ({
  errors,
  submitting
})

const matchDispatchToProps = {
  initializeAuth: authActions.initializeAuth,
  signUp: authActions.signUp
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUpPage)
