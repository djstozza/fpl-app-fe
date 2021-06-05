import { useState } from 'react'
import { connect } from 'react-redux'

import {
  Paper,
  Theme,
  TextField,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  PROFILE_URL,
  LEAGUES_URL
} from 'utilities/constants'
import ButtonLink from 'components/common/buttonLink'

import { leaguesActions } from 'state/leagues'

import type { Error } from 'types'

type Props = {
  errors: Error[],
  createLeague: Function
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
  codeContainer: {
    display: 'flex',
    alignItems: 'baseline'
  },
  generateButtonContainer: {
    marginRight: theme.spacing(1)
  },
  generateButton: {
    whiteSpace: 'nowrap'
  }
}))

const CreateLeagueForm = (props: Props) => {
  const { errors, createLeague } = props

  const classes = useStyles()

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [fplTeamName, setFplTeamName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createLeague({ league: { name, code, fplTeamName } })
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Paper className={classes.paper}>
        <Typography
          variant='h5'
          className={classes.formHeader}
        >
          Create a league
        </Typography>
        <TextField
          required
          className={classes.textField}
          fullWidth
          variant='outlined'
          label='Name'
          name='name'
          type='text'
          onChange={({ target: { value }}) => setName(value)}
          value={name}
          error={Boolean(errors.find(({ source }) => source === 'name'))}
          helperText={errors.find(({ source }) => source === 'name')?.detail}
        />
        <div className={classes.codeContainer}>
          <div className={classes.generateButtonContainer}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setCode(Math.random().toString(36).slice(2, 10))}
              className={classes.generateButton}
            >
              Generate Code
            </Button>
          </div>
          <TextField
            required
            className={classes.textField}
            fullWidth
            variant='outlined'
            label='Code'
            name='code'
            type='text'
            disabled
            value={code}
            error={Boolean(errors.find(({ source }) => source === 'code'))}
            helperText={errors.find(({ source }) => source === 'code')?.detail}
          />
        </div>
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
        <div className={classes.actions}>
          <ButtonLink
            to={`${PROFILE_URL}${LEAGUES_URL}`}
            color='default'
            rightMargin
          >
            Cancel
          </ButtonLink>
          <Button
            type='submit'
            disabled={!name || !code || !fplTeamName}
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

const mapStateToProps = (state) => {
  const {
    leagues: {
      errors = []
    }
  } = state

  return {
    errors
  }
}

const matchDispatchToProps = {
  createLeague: leaguesActions.createLeague
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateLeagueForm)
