import { Redirect } from 'react-router-dom'

import {
  LEAGUES_URL
} from 'utilities/constants'
import LeagueForm from 'components/pages/leaguesPage/leagueForm'

import type { League, Error } from 'types'

type Props = {
  league: League,
  errors: Error[],
  submitting: boolean,
  updateLeague: Function,
  initializeForm: Function
}

const EditLeagueForm = (props: Props) => {
  const {
    errors = [],
    updateLeague,
    initializeForm,
    league: { id, isOwner }
  } = props

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
