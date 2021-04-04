import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import qs from 'qs'
import {
  Typography,
  Theme,
  makeStyles
} from '@material-ui/core'

import { teamsActions } from 'state/teams'
import { teamActions } from 'state/team'
import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'

import TabPanel from 'components/common/tabPanel'
import TeamTabs from './teamTabs'
import TeamDetails from './teamDetails'
import FixturesTable from './fixturesTable'
import PlayersTable from './playersTable'

import type { TeamState } from 'state/team'
import type { TeamSummary, PlayerSummary } from 'types'

type Props = {
  team: TeamState,
  players: PlayerSummary[],
  teams: TeamSummary[],
  fetchTeam: Function,
  fetchTeams: Function,
  fetchTeamPlayers: Function,
  fetchTeamFixtures: Function,
  match: { params: { teamId: string, tab: string } },
}

const useStyles = makeStyles((theme: Theme) => ({
  crest: {
    marginRight: theme.spacing(0.5),
    maxHeight: theme.spacing(3)
  },
  wrapper: {
    flexDirection: 'row',
    display: 'flex'
  },
  titleWrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center'
  },
  titleCrest: {
    marginRight: theme.spacing(0.5),
    maxHeight: theme.spacing(6)
  },
}))

const TeamPage = (props: Props) => {
  const {
    team,
    teams,
    fetchTeam,
    fetchTeams,
    fetchTeamPlayers,
    players,
    fetchTeamFixtures,
    match: { params: { teamId, tab = 'details' } }
  } = props

  const {
    data,
    sort,
    fixtures
  } = team


  const searchQuery = qs.parse(window.location.search.substring(1))
  const sortQuery = searchQuery.sort || sort

  const classes = useStyles()

  const labelRenderer = (teamSummary: TeamSummary) => {
    const { shortName } = teamSummary
    return (
      <Fragment>
        <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
        <Typography>{shortName}</Typography>
      </Fragment>
    )
  }

  useEffect(
    () => {
      fetchTeams({ sort: { shortName: 'asc' } })
    }, [fetchTeams]
  )

  useEffect(
    () => {
      fetchTeam(teamId, tab, sortQuery)
    }, [fetchTeam, teamId]
  )

  if (!data) return null

  const { name, shortName } = data

  return (
    <Fragment>
      <TabPanel
        collection={teams}
        collectionId={teamId}
        labelRenderer={labelRenderer}
        url={TEAMS_URL}
        tab={tab}
      />
      <div className={classes.titleWrapper}>
        <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.titleCrest} />
        <Typography variant='h4'>
          {name}
        </Typography>
      </div>
      <TeamTabs
        currentTab={tab}
        teamId={teamId}
      />
      <Switch>
        <Route
          exact
          path={`${TEAMS_URL}/:teamId/details`}
          render={() => <TeamDetails team={data} />}
        />
        <Route
          exact
          path={`${TEAMS_URL}/:teamId/fixtures`}
          render={
            () => (
              <FixturesTable
                teamId={teamId}
                fixtures={fixtures}
                fetchTeamFixtures={fetchTeamFixtures}
                sort={sortQuery}
                tab={tab}
              />
            )
          }
        />
        <Route
          exact
          path={`${TEAMS_URL}/:teamId/players`}
          render={() => (
            <PlayersTable
              players={players}
              fetchTeamPlayers={fetchTeamPlayers}
              sort={sortQuery}
              teamId={teamId}
              tab={tab}
            />
          )}
        />
      </Switch>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    teams: { data: teams },
    team,
    players: { data: players = [] }
  } = state

  return {
    teams,
    team,
    players
  }
}

const matchDispatchToProps = {
  fetchTeams: teamsActions.fetchTeams,
  fetchTeam: teamActions.fetchTeam,
  fetchTeamPlayers: teamActions.fetchTeamPlayers,
  fetchTeamFixtures: teamActions.fetchTeamFixtures
}


export default connect(mapStateToProps, matchDispatchToProps)(TeamPage)
