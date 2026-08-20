import { useState, useEffect, useRef } from 'react'
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material'
import {
  PROFILE_URL,
  LEAGUES_URL
} from 'utilities/constants'
import ButtonLink from 'components/common/buttonLink'

import type { Error, League } from 'types'

type Props = {
  league?: League,
  errors: Error[],
  title: string,
  submitFn: Function,
  initializeForm: () => void,
  create?: boolean,
  hideFplTeamName?: boolean,
  returnUrl?: string
}

interface Params {
  [key: string]: string
}

const textFieldSx = (theme) => ({ paddingBottom: theme.spacing(2) })

const LeagueForm = (props: Props) => {
  const {
    league: { name = '', code = '' } = {},
    title,
    errors,
    submitFn,
    initializeForm,
    create,
    hideFplTeamName = false,
    returnUrl
  } = props

  const firstUpdate = useRef(true)

  useEffect(
    () => {
      if (firstUpdate.current) {
        initializeForm()
        firstUpdate.current = false
      }
    }, [initializeForm]
  )

  const [newName, setNewName] = useState(name)
  const [newCode, setNewCode] = useState(code)
  const [fplTeamName, setFplTeamName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params: Params = { name: newName, code: newCode, fplTeamName }
    if (hideFplTeamName) delete params.fplTeamName
    submitFn({ league: params })
  }

  const baseErrors = errors.filter(({ source }) => source === 'base')

  const disableSubmit = (
    !newName ||
    !newCode ||
    (!hideFplTeamName && !fplTeamName) ||
    (newName === name && newCode === code)
  )

  return (
    <Box component='form' onSubmit={handleSubmit} sx={(theme) => ({ marginTop: theme.spacing(2) })}>
      <Paper sx={(theme) => ({ padding: theme.spacing(3) })}>
        <Typography
          variant='h5'
          sx={textFieldSx}
        >
          {title}
        </Typography>
        {
          Boolean(baseErrors.length) &&
          <Box
            data-testid='league-form-base-errors'
            sx={(theme) => ({ marginBottom: theme.spacing(1) })}
          >
            {
              baseErrors.map(({ detail }, i) => (
                <Typography key={i} color='error'>{detail}</Typography>
              ))
            }
          </Box>
        }
        <TextField
          required
          sx={textFieldSx}
          fullWidth
          variant='outlined'
          label='Name'
          name='name'
          type='text'
          onChange={({ target: { value }}) => setNewName(value)}
          value={newName}
          error={Boolean(errors.find(({ source }) => source === 'name'))}
          helperText={errors.find(({ source }) => source === 'name')?.detail}
        />
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          {
            create &&
            <Box sx={(theme) => ({ marginRight: theme.spacing(1) })}>
              <Button
                variant='contained'
                color='primary'
                name='generateCode'
                onClick={() => setNewCode(Math.random().toString(36).slice(2, 10))}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Generate Code
              </Button>
            </Box>
          }
          <TextField
            required
            sx={textFieldSx}
            fullWidth
            variant='outlined'
            label='Code'
            name='code'
            type='text'
            disabled={create}
            value={newCode}
            onChange={({ target: { value }}) => !create && setNewCode(value)}
            error={Boolean(errors.find(({ source }) => source === 'code'))}
            helperText={errors.find(({ source }) => source === 'code')?.detail}
          />
        </Box>
        {
          !hideFplTeamName &&
          <TextField
            required
            sx={textFieldSx}
            fullWidth
            variant='outlined'
            label='Fpl Team Name'
            name='fplTeamName'
            type='text'
            onChange={({ target: { value }}) => setFplTeamName(value)}
            value={fplTeamName}
            error={Boolean(errors.find(({ source }) => source === 'fpl_team_name'))}
            helperText={errors.find(({ source }) => source === 'fpl_team_name')?.detail}
          />
        }
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonLink
            to={returnUrl || `${PROFILE_URL}${LEAGUES_URL}`}
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
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default LeagueForm
