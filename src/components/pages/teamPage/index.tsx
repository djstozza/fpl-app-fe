import { useEffect, useState, MouseEvent, Fragment } from 'react'
import { connect } from 'react-redux'
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

import type { Team, TeamSummary } from 'types'

type Props = {
  team?: Team,
  teams: TeamSummary[],
  fetchTeam: Function,
  fetchTeams: Function,
  match: { params: { teamId } }
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
    match: { params: { teamId } }
  } = props

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
        fetchTeam={fetchTeam}
      />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  teams: state.teams.data,
  team: state.team?.data
})

const matchDispatchToProps = {
  fetchTeams: teamsActions.fetchTeams,
  fetchTeam: teamActions.fetchTeam
}


export default connect(mapStateToProps, matchDispatchToProps)(TeamPage)
