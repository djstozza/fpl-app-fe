import { useState, useEffect } from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material'

import { FPL_TEAMS_URL } from 'utilities/constants'
import ButtonLink from 'components/common/buttonLink'

import type { FplTeamContext } from '..'

const textFieldSx = (theme) => ({ paddingBottom: theme.spacing(2) })

export const tab = 'details'
export const action = 'edit'

const EditFplTeamForm = () => {
  const {
    errors = [],
    updateFplTeam,
    submitting,
    fplTeam: { id, name, isOwner },
    setTab,
    setAction
  } = useOutletContext<FplTeamContext>()

  const [newName, setName] = useState(name)

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
    <Box
      component='form'
      data-testid='EditFplTeamForm'
      onSubmit={handleSubmit}
      sx={(theme) => ({ marginTop: theme.spacing(2) })}
    >
      <Paper sx={(theme) => ({ padding: theme.spacing(3) })}>
        <Typography
          variant='h5'
          sx={textFieldSx}
        >
          Edit details
        </Typography>
        <TextField
          required
          sx={textFieldSx}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        </Box>
      </Paper>
    </Box>
  )
}

export default EditFplTeamForm
