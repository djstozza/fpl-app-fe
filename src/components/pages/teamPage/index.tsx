import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, useLocation, Outlet } from 'react-router-dom'
import qs from 'qs'
import { makeStyles } from 'tss-react/mui'
import {
  Typography,
  Theme
} from '@mui/material'

import { teamsActions } from 'state/teams'
import { teamActions } from 'state/team'
import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'

import Tabs from 'components/common/tabs'
import TabPanel from 'components/common/tabPanel'

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
  updateTeamPlayersSort: Function
}

type TeamParams = {
  teamId: string
}

type Tab = 'details' | 'fixtures' | 'players'

const useStyles = makeStyles()((theme: Theme) => ({
  crest: {
    marginRight: theme.spacing(0.75),
    maxHeight: theme.spacing(4)
  },
  titleWrapper: {
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center'
  },
  titleCrest: {
    marginRight: theme.spacing(0.5),
    maxHeight: theme.spacing(5)
  },
  tabTextWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export const TABS = [
  { label: 'Details', value: 'details', display: true },
  { label: 'Fixtures', value: 'fixtures', display: true },
  { label: 'Players', value: 'players', display: true }
]

export type TeamContext = {
  teamId: string,
  sort: Object,
  setTab: (string: Tab) => void
} & Props

export const TeamPage = (props: Props) => {
  const {
    team,
    teams,
    fetchTeam,
    fetchTeams
  } = props

  const { teamId } = useParams<TeamParams>()
  const { search } = useLocation()
  const [tab, setTab] = useState<Tab>('details')
 
  const {
    data,
    sort,
  } = team

  const sortQuery = qs.parse(search.substring(1)).sort || sort

  const { classes } = useStyles()

  const labelRenderer = (teamSummary: TeamSummary) => {
    const { shortName } = teamSummary
    return (
      <div className={classes.tabTextWrapper}>
        <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
        <Typography>{shortName}</Typography>
      </div>
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
  if (!teamId) return null

  const { name, shortName } = data

  const value: TeamContext = {
    ...props,
    teamId,
    sort: sortQuery,
    setTab
  }
 
  return (
    <div data-testid='TeamPage'>
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
      <Outlet context={value} />
    </div>
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
