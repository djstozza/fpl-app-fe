import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
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
import TeamDetails from './teamDetails'

import type { Team, TeamSummary, PlayerSummary } from 'types'

type Props = {
  team?: Team,
  teams: TeamSummary[],
  fetchTeam: Function,
  fetchTeams: Function,
  fetchTeamPlayers: Function,
  players: PlayerSummary[],
  match: { params: { teamId } },
  sort: {
    players: Object
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  crest: {
    marginRight: theme.spacing(0.5),
    maxHeight: theme.spacing(3)
  },
  wrapper: {
    flexDirection: 'row',
    display: 'flex'
  }
}))

const TeamPage = (props: Props) => {
  const {
    team,
    teams,
    fetchTeam,
    fetchTeams,
    fetchTeamPlayers,
    players,
    sort,
    match: { params: { teamId } }
  } = props

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
      fetchTeam(teamId)
    }, [fetchTeam, teamId]
  )

  useEffect(
    () => {
      fetchTeamPlayers(teamId, sortQuery)
    }, [fetchTeamPlayers, teamId]
  )

  return (
    <Fragment>
      <TabPanel
        collection={teams}
        collectionId={teamId}
        labelRenderer={labelRenderer}
        url={TEAMS_URL}
      />
      <TeamDetails
        team={team}
        teamId={teamId}
        players={players}
        fetchTeamPlayers={fetchTeamPlayers}
        sort={sortQuery}
      />
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    teams: { data: teams },
    team: { data: team, sort },
    players: { data: players }
  } = state

  return {
    teams,
    team,
    sort,
    players
  }
}

const matchDispatchToProps = {
  fetchTeams: teamsActions.fetchTeams,
  fetchTeam: teamActions.fetchTeam,
  fetchTeamPlayers: teamActions.fetchTeamPlayers
}


export default connect(mapStateToProps, matchDispatchToProps)(TeamPage)
