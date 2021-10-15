import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { capitalize } from 'lodash'
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
  generateDraftPicks: (string) => void,
  createDraft: Function,
  initializeForm: () => void,
  sort: Object,
  fetching: boolean,
  match: { params: { leagueId: string, tab: string, action: string } }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

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
    fetching,
    match: { params: { leagueId, tab = 'details', action } }
  } = props
  const classes = useStyles()

  useEffect(
    () => {
      fetchLeague(leagueId)
    }, [fetchLeague, leagueId]
  )

  if (!league) return null

  const { name } = league

  TABS.details['extraTitleInfo'] = capitalize(action)

  return (
    <Fragment>
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
      <Switch>
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId`}
        >
          <LeagueDetails
            league={league}
            generateDraftPicks={generateDraftPicks}
            createDraft={createDraft}
            submitting={submitting}
          />
        </Route>
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/details`}
        >
          <LeagueDetails
            league={league}
            generateDraftPicks={generateDraftPicks}
            createDraft={createDraft}
            submitting={submitting}
          />
        </Route>
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/details/edit`}
        >
          <EditLeagueForm
            league={league}
            updateLeague={updateLeague}
            errors={errors}
            submitting={submitting}
            initializeForm={initializeForm}
          />
        </Route>
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/fplTeams`}
        >
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
        </Route>
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
