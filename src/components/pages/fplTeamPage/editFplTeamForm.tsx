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
  FPL_TEAMS_URL
} from 'utilities/constants'
import ButtonLink from 'components/common/buttonLink'

import type { FplTeam, Error } from 'types'

type Props = {
  fplTeam: FplTeam,
  errors: Error[],
  submitting: boolean,
  updateFplTeam: Function
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
  }
}))

const EditFplTeamForm = (props: Props) => {
  const {
    errors,
    updateFplTeam,
    submitting,
    fplTeam: { id, name, isOwner }
  } = props

  const classes = useStyles()

  const [newName, setName] = useState(name)

  if (!isOwner) return <Redirect to={`${FPL_TEAMS_URL}/${id}/details`} />

  const handleSubmit = (e) => {
    e.preventDefault()
    updateFplTeam({ fplTeam: { name: newName } })
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
        <div className={classes.actions}>
          <ButtonLink
            to={`${FPL_TEAMS_URL}/${id}/details`}
            color='default'
            rightMargin
          >
            Cancel
          </ButtonLink>
          <Button
            type='submit'
            disabled={!newName || submitting}
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

export default EditFplTeamForm
