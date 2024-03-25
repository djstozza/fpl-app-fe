import { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui'
import {
  Paper,
  Theme,
  TextField,
  Button,
  Typography
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
  },
  codeContainer: {
    display: 'flex',
    alignItems: 'baseline'
  },
  generateButtonContainer: {
    marginRight: theme.spacing(1)
  },
  generateButton: {
    whiteSpace: 'nowrap'
  },
  baseErrorsContainer: {
    marginBottom: theme.spacing(1)
  }
}))

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

  const { classes } = useStyles()

  useEffect(
    () => {
      initializeForm()
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
    !name ||
    !code ||
    (!hideFplTeamName && !fplTeamName) ||
    (newName === name && newCode === code)
  )

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Paper className={classes.paper}>
        <Typography
          variant='h5'
          className={classes.formHeader}
        >
          {title}
        </Typography>
        {
          Boolean(baseErrors.length) &&
          <div className={classes.baseErrorsContainer}>
            {
              baseErrors.map(({ detail }, i) => (
                <Typography key={i} color='error'>{detail}</Typography>
              ))
            }
          </div>
        }
        <TextField
          required
          className={classes.textField}
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
        <div className={classes.codeContainer}>
          {
            create &&
            <div className={classes.generateButtonContainer}>
              <Button
                variant='contained'
                color='primary'
                name='generateCode'
                onClick={() => setNewCode(Math.random().toString(36).slice(2, 10))}
                className={classes.generateButton}
              >
                Generate Code
              </Button>
            </div>
          }
          <TextField
            required
            className={classes.textField}
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
        </div>
        {
          !hideFplTeamName &&
          <TextField
            required
            className={classes.textField}
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
        <div className={classes.actions}>
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
        </div>
      </Paper>
    </form>
  )
}

export default LeagueForm
