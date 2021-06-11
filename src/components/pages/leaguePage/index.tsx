import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {
  Typography,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'

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
  generateDraftPicks: Function,
  sort: Object,
  match: { params: { leagueId: string, tab: string } }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

const TABS = [
  { label: 'Details', value: 'details', display: true },
  { label: 'Fpl Teams', value: 'fplTeams', display: true }
]

const LeaguePage = (props: Props) => {
  const {
    league,
    fplTeams,
    fetchLeague,
    fetchFplTeams,
    updateLeague,
    updateFplTeamsSort,
    generateDraftPicks,
    errors,
    submitting,
    sort,
    match: { params: { leagueId, tab = 'details' } }
  } = props
  const classes = useStyles()

  useEffect(
    () => {
      fetchLeague(leagueId)
    }, [fetchLeague, leagueId]
  )

  if (!league) return null

  const { name } = league

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {name}
      </Typography>
      <Tabs
        currentTab={tab}
        tabs={TABS}
        url={LEAGUES_URL}
        id={leagueId}
      />
      <Switch>
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId`}
          render={() => (
            <LeagueDetails
              league={league}
              generateDraftPicks={generateDraftPicks}
              submitting={submitting}
            />
          )}
        />
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/details`}
          render={() => (
            <LeagueDetails
              league={league}
              generateDraftPicks={generateDraftPicks}
              submitting={submitting}
            />
          )}
        />
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/details/edit`}
          render={() => (
            <EditLeagueForm
              league={league}
              updateLeague={updateLeague}
              errors={errors}
              submitting={submitting}
            />
          )}
        />
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/fplTeams`}
          render={() => (
            <FplTeamsTable
              league={league}
              leagueId={leagueId}
              fplTeams={fplTeams}
              fetchFplTeams={fetchFplTeams}
              updateFplTeamsSort={updateFplTeamsSort}
              generateDraftPicks={generateDraftPicks}
              submitting={submitting}
              sort={sort}
              errors={errors}
            />
          )}
        />
      </Switch>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    league: {
      data: league,
      fplTeams,
      errors,
      submitting,
      sort
    }
  } = state

  return {
    league,
    fplTeams,
    errors,
    submitting,
    sort
  }
}

const matchDispatchToProps = {
  fetchLeague: leagueActions.fetchLeague,
  updateLeague: leagueActions.updateLeague,
  fetchFplTeams: leagueActions.fetchFplTeams,
  updateFplTeamsSort: leagueActions.updateFplTeamsSort,
  generateDraftPicks: leagueActions.generateDraftPicks
}

export default connect(mapStateToProps, matchDispatchToProps)(LeaguePage)
