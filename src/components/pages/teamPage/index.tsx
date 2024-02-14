import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import qs from 'qs'
import { makeStyles } from 'tss-react/mui'
import {
  Typography,
  Theme
} from '@mui/material';

import { teamsActions } from 'state/teams'
import { teamActions } from 'state/team'
import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'

import Tabs from 'components/common/tabs'
import TabPanel from 'components/common/tabPanel'
import TeamDetails from './teamDetails'
import FixturesTable from './fixturesTable'
import PlayersTable from './playersTable'

import type { PlayersState } from 'state/players'
import type { TeamState } from 'state/team'
import type { TeamSummary } from 'types'

type Props = {
  team: TeamState,
  players: PlayersState,
  teams: TeamSummary[],
  fetchTeam: Function,
  fetchTeams: Function,
  fetchTeamPlayers: Function,
  fetchTeamFixtures: Function,
  updateTeamFixturesSort: Function,
  updateTeamPlayersSort: Function,
  match: { params: { teamId: string, tab: string } }
}

const useStyles = makeStyles()((theme: Theme) => ({
  crest: {
    marginRight: theme.spacing(0.5),
    maxHeight: theme.spacing(4)
  },
  wrapper: {
    flexDirection: 'row',
    display: 'flex'
  },
  titleWrapper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center'
  },
  titleCrest: {
    marginRight: theme.spacing(0.5),
    maxHeight: theme.spacing(5)
  },
}))

const TABS = [
  { label: 'Details', value: 'details', display: true },
  { label: 'Fixtures', value: 'fixtures', display: true },
  { label: 'Players', value: 'players', display: true }
]

export const TeamPage = (props: Props) => {
  const {
    team,
    teams,
    fetchTeam,
    fetchTeams,
    fetchTeamPlayers,
    players,
    fetchTeamFixtures,
    updateTeamPlayersSort,
    updateTeamFixturesSort,
    match: { params: { teamId, tab = 'details' } }
  } = props

  const {
    data,
    sort,
    fixtures,
    fetching
  } = team

  const search = window.location.search.substring(1)
  const sortQuery = qs.parse(search).sort || sort

  const { classes } = useStyles()

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Tabs
        currentTab={tab}
        tabs={TABS}
        url={TEAMS_URL}
        id={teamId}
        titleSubstr={name}
      />
      <Routes>
        <Route
          exact
          path={
            [
              `${TEAMS_URL}/:teamId`,
              `${TEAMS_URL}/:teamId/details`
            ]
          }
        >
          <TeamDetails team={data} />
        </Route>
        <Route
          exact
          path={`${TEAMS_URL}/:teamId/fixtures`}
        >
          <FixturesTable
            key={teamId}
            teamId={teamId}
            fixtures={fixtures}
            fetchTeamFixtures={fetchTeamFixtures}
            sort={sortQuery}
            tab={tab}
            updateTeamFixturesSort={updateTeamFixturesSort}
            fetching={fetching}
          />
        </Route>
        <Route
          exact
          path={`${TEAMS_URL}/:teamId/players`}
        >
          <PlayersTable
            key={teamId}
            players={players}
            fetchTeamPlayers={fetchTeamPlayers}
            sort={sortQuery}
            teamId={teamId}
            tab={tab}
            updateTeamPlayersSort={updateTeamPlayersSort}
          />
        </Route>
      </Routes>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    teams: { data: teams },
    team,
    players
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
  fetchTeamFixtures: teamActions.fetchTeamFixtures,
  updateTeamFixturesSort: teamActions.updateTeamFixturesSort,
  updateTeamPlayersSort: teamActions.updateTeamPlayersSort
}


export default connect(mapStateToProps, matchDispatchToProps)(TeamPage)
