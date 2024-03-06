import { useState, useEffect } from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import {
  Paper,
  Theme,
  TextField,
  Button,
  Typography
} from '@mui/material'

import { FPL_TEAMS_URL } from 'utilities/constants'
import ButtonLink from 'components/common/buttonLink'

import type { FplTeamContext } from '..'


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
  }
}))

const EditFplTeamForm = () => {
  const {
    errors = [],
    updateFplTeam,
    submitting,
    fplTeam: { id, name, isOwner },
    setTab,
    setAction
  } = useOutletContext<FplTeamContext>()

  const { classes } = useStyles()

  const [newName, setName] = useState(name)

  const tab = 'details'
  const action = 'edit'

  useEffect(() => {
    setTab(tab)
    setAction(action)
  }, [])

  if (!isOwner) return <Navigate to={`${FPL_TEAMS_URL}/${id}/details`} />

  const handleSubmit = (e) => {
    e.preventDefault()
    updateFplTeam({ fplTeam: { name: newName } })
  }

  return (
    <form
      data-testid='EditFplTeamForm'
      onSubmit={handleSubmit}
      className={classes.form}
    >
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
            color='inherit'
            rightMargin
          >
            Cancel
          </ButtonLink>
          <Button
            type='submit'
            disabled={!newName || submitting || name === newName}
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
