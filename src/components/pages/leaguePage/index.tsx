import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes, useParams } from 'react-router-dom'
import { capitalize } from 'lodash'
import { makeStyles } from 'tss-react/mui'
import { Typography, Theme } from '@mui/material'

import { leagueActions } from 'state/league'
import Tabs from 'components/common/tabs'
import { LEAGUES_URL } from 'utilities/constants'
import LeagueDetails from './leagueDetails'
import EditLeagueForm from './editLeagueForm'
import FplTeamsTable from './fplTeamsTable'

import type { League, FplTeam, Error } from 'types'

type Props = {
  league: League,
  fplTeams: FplTeam[],
  errors: Error[],
  submitting: boolean,
  fetchLeague: Function,
  fetchFplTeams: Function,
  updateFplTeamsSort: Function,
  updateLeague: Function,
  generateDraftPicks: (string) => void,
  createDraft: Function,
  initializeForm: () => void,
  sort: Object,
  fetching: boolean
}

type LeagueParams = {
  leagueId: string,
  tab?: string,
  action?: string
}

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  }
}))

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  fplTeams: { label: 'Fpl Teams', value: 'fplTeams', display: true }
}

export const LeaguePage = (props: Props) => {
  const {
    league,
    fplTeams,
    fetchLeague,
    fetchFplTeams,
    updateLeague,
    updateFplTeamsSort,
    generateDraftPicks,
    createDraft,
    initializeForm,
    errors,
    submitting,
    sort,
    fetching
  } = props
  const { classes } = useStyles()
  const { leagueId, tab = 'details', action } = useParams<LeagueParams>()

  useEffect(
    () => {
      fetchLeague(leagueId)
    }, [fetchLeague, leagueId]
  )

  if (!leagueId) return null
  if (!league) return null

  const { name } = league

  TABS.details['extraTitleInfo'] = capitalize(action)

  const detailsPaths = [
    `${LEAGUES_URL}/:leagueId`,
    `${LEAGUES_URL}/:leagueId/details`
  ]

  return (
    <div data-testid='LeaguePage'>
      <Typography variant='h4' className={classes.title}>
        {name}
      </Typography>
      <Tabs
        currentTab={tab}
        tabs={Object.values(TABS)}
        url={LEAGUES_URL}
        id={leagueId}
        titleSubstr={name}
      />
      <Routes>
        {
          detailsPaths.map(path => (
            <Route
              key={path}
              path={path}
              element={
                <LeagueDetails
                  league={league}
                  generateDraftPicks={generateDraftPicks}
                  createDraft={createDraft}
                  submitting={submitting}
                />
              }
            />
          ))
        }
        <Route
          path={`${LEAGUES_URL}/:leagueId/details/edit`}
          element={
            <EditLeagueForm
              league={league}
              updateLeague={updateLeague}
              errors={errors}
              submitting={submitting}
              initializeForm={initializeForm}
            />
          }
        />
        <Route
          path={`${LEAGUES_URL}/:leagueId/fplTeams`}
          element={
            <FplTeamsTable
              league={league}
              leagueId={leagueId}
              fplTeams={fplTeams}
              fetchFplTeams={fetchFplTeams}
              updateFplTeamsSort={updateFplTeamsSort}
              generateDraftPicks={generateDraftPicks}
              createDraft={createDraft}
              submitting={submitting}
              sort={sort}
              errors={errors}
              fetching={fetching}
            />
          }
        />
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    league: {
      data: league,
      fplTeams,
      errors,
      submitting,
      sort,
      fetching
    }
  } = state

  return {
    league,
    fplTeams,
    errors,
    submitting,
    sort,
    fetching
  }
}

const matchDispatchToProps = {
  initializeForm: leagueActions.initializeForm,
  fetchLeague: leagueActions.fetchLeague,
  updateLeague: leagueActions.updateLeague,
  fetchFplTeams: leagueActions.fetchFplTeams,
  updateFplTeamsSort: leagueActions.updateFplTeamsSort,
  generateDraftPicks: leagueActions.generateDraftPicks,
  createDraft: leagueActions.createDraft
}

export default connect(mapStateToProps, matchDispatchToProps)(LeaguePage)
