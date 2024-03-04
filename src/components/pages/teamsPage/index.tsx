import { connect } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { teamsActions } from 'state/teams'
import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/teams/reducer'
import ContainedTeamCrestLink from 'components/common/teamCrestLink/contained'
import { TITLE } from 'utilities/constants'

import { makeStyles } from 'tss-react/mui';
import {
  Theme,
  Typography
} from '@mui/material'

import type { TeamsState } from 'state/teams'
import type { TeamSummary } from 'types'

type Props = {
  teams: TeamsState,
  fetchTeams: Function,
  updateSort: Function
}

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  }
}))

const TEAMS_TABLE_CELLS = [
  {
    cellId: 'shortName',
    label: 'N',
    toolTipLabel: 'Name',
    sortParam: 'shortName',
    sticky: true,
    customRender: (team: TeamSummary) => <ContainedTeamCrestLink team={team} />
  },
  { cellId: 'position', label: 'R', toolTipLabel: 'Rank', sortParam: 'position' },
  { cellId: 'played', label: 'MP', toolTipLabel: 'Matches Played', sortParam: 'played' },
  { cellId: 'wins', label: 'W', toolTipLabel: 'Wins', sortParam: 'wins' },
  { cellId: 'losses', label: 'L', toolTipLabel: 'Losses', sortParam: 'losses' },
  { cellId: 'draws', label: 'D', toolTipLabel: 'Draws', sortParam: 'draws' },
  { cellId: 'goalsFor', label: 'GF', toolTipLabel: 'Goals For', sortParam: 'goalsFor' },
  { cellId: 'goalsAgainst', label: 'GA', toolTipLabel: 'Goals Against', sortParam: 'goalsAgainst' },
  { cellId: 'goalDifference', label: 'GD', toolTipLabel: 'Goal Difference', sortParam: 'goalDifference' },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets', sortParam: 'cleanSheets' },
  { cellId: 'points', label: 'Pts', toolTipLabel: 'Points', sortParam: 'points' },
  { cellId: 'currentForm', label: 'Last 5', toolTipLabel: 'Last 5' }
]

export const TeamsPage = (props: Props) => {
  const {
    teams: { data: teams, fetching },
    fetchTeams,
    updateSort
  } = props

  const { teamId } = useParams()
  const { classes } = useStyles()

  if (teamId) return <Outlet />

  document.title = `${TITLE} - Teams`

  return (
    <div data-testid='TeamsPage'>
      <Typography variant='h4' className={classes.title}>
        Team Ladder
      </Typography>
      <SearchListener fetchAction={fetchTeams} initialFilterState={initialFilterState}>
        <SortTable
          collection={teams}
          handleSortChange={(newSort) => updateSort(newSort)}
          cells={TEAMS_TABLE_CELLS}
          fetching={fetching}
          name='teams'
        />
      </SearchListener>
    </div >
  )
}

const mapStateToProps = ({ teams }) => ({
  teams
})

const matchDispatchToProps = {
  fetchTeams: teamsActions.fetchTeams,
  updateSort: teamsActions.updateSort
}


export default connect(mapStateToProps, matchDispatchToProps)(TeamsPage)
