import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Paper,
  Theme,
  TextField,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core'

import {
  LEAGUES_URL
} from 'utilities/constants'
import ButtonLink from 'components/common/buttonLink'

import type { League, Error } from 'types'

type Props = {
  league: League,
  errors: Error[],
  submitting: boolean,
  updateLeague: Function
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

const EditLeagueForm = (props: Props) => {
  const {
    errors,
    updateLeague,
    submitting,
    league: { id, name, code, isOwner }
  } = props

  const classes = useStyles()

  const [newName, setName] = useState(name)
  const [newCode, setNewCode] = useState(code)

  if (!isOwner) return <Redirect to={`${LEAGUES_URL}/${id}/details`} />

  const handleSubmit = (e) => {
    e.preventDefault()
    updateLeague({ league: { name: newName, code: newCode } })
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
          label='Name'
          name='name'
          type='text'
          onChange={({ target: { value }}) => setName(value)}
          value={newName}
          error={Boolean(errors.find(({ source }) => source === 'name'))}
          helperText={errors.find(({ source }) => source === 'name')?.detail}
        />
        <div className={classes.codeContainer}>
          <div className={classes.generateButtonContainer}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setNewCode(Math.random().toString(36).slice(2, 10))}
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
            value={newCode}
            error={Boolean(errors.find(({ source }) => source === 'code'))}
            helperText={errors.find(({ source }) => source === 'code')?.detail}
          />
        </div>
        <div className={classes.actions}>
          <ButtonLink
            to={`${LEAGUES_URL}/${id}/details`}
            color='default'
            rightMargin
          >
            Cancel
          </ButtonLink>
          <Button
            type='submit'
            disabled={!name || !code || submitting}
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

export default EditLeagueForm
