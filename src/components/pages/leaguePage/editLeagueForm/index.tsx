import { useEffect } from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'

import { LEAGUES_URL } from 'utilities/constants'
import LeagueForm from 'components/pages/leaguesPage/leagueForm'

import type { LeagueContext } from '..'

const EditLeagueForm = () => {
  const {
    league,
    errors = [],
    updateLeague,
    initializeForm,
    league: { id, isOwner },
    setTab,
    setAction
  } = useOutletContext<LeagueContext>()

  const tab = 'details'
  const action = 'edit'

  const returnUrl = `${LEAGUES_URL}/${id}/details`

  if (!isOwner) return <Navigate to={returnUrl} />

  useEffect(() => {
    setTab(tab)
    setAction(action)
  }, [])

  return (
    <div data-testid='EditLeagueForm'>
      <LeagueForm
        league={league}
        title='Edit details'
        errors={errors}
        submitFn={updateLeague}
        initializeForm={initializeForm}
        create
        hideFplTeamName
        returnUrl={returnUrl}
      />
    </div>
  )
}

export default EditLeagueForm
