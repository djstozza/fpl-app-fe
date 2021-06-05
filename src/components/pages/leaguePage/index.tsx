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

import type { League, Error } from 'types'

type Props = {
  league: League,
  errors: Error[],
  submitting: boolean,
  fetchLeague: Function,
  updateLeague: Function,
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
    fetchLeague,
    updateLeague,
    errors,
    submitting,
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
          render={() => <LeagueDetails league={league} />}
        />
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/details`}
          render={() => <LeagueDetails league={league} />}
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
      </Switch>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    league: {
      data: league,
      errors,
      submitting
    }
  } = state

  return {
    league,
    errors,
    submitting
  }
}

const matchDispatchToProps = {
  fetchLeague: leagueActions.fetchLeague,
  updateLeague: leagueActions.updateLeague
}

export default connect(mapStateToProps, matchDispatchToProps)(LeaguePage)
