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
import LeagueForm from 'components/pages/leaguesPage/leagueForm'

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
    errors = [],
    updateLeague,
    submitting,
    initializeForm,
    league: { id, name, code, isOwner }
  } = props

  const classes = useStyles()
  const returnUrl = `${LEAGUES_URL}/${id}/details`

  if (!isOwner) return <Redirect to={returnUrl} />

  return (
    <LeagueForm
      title='Edit details'
      errors={errors}
      submitFn={updateLeague}
      initializeForm={initializeForm}
      create
      hideFplTeamName
      returnUrl={returnUrl}
    />
  )
}

export default EditLeagueForm
