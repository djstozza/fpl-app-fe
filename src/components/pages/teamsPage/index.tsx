import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import { teamsActions } from 'state/teams'
import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'
import SortTable from 'components/common/sortTable'

import {
  Theme,
  Typography,
  makeStyles,
  createStyles
} from '@material-ui/core'

import type { TeamSummary } from 'types'

type Props = {
  teams: TeamSummary[],
  fetchTeams: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

const TEAMS_TABLE_CELLS = [
  {
    cellId: 'shortName',
    label: 'N',
    toolTipLabel: 'Name',
    sortParam: 'shortName',
    sticky: true,
    customRender: ({ shortName, id }: TeamSummary, classes) => (
      <Link to={`${TEAMS_URL}/${id}`} className={classnames(classes.imageContainer, classes.link)}>
        <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
        <div>
          {shortName}
        </div>
      </Link>
    )
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

const TeamsPage = (props: Props) => {
  const {
    teams,
    fetchTeams
  } = props

  const classes = useStyles()

  const { sort } = qs.parse(window.location.search.substring(1))

  useEffect(
    () => {
      fetchTeams({ sort, updateUrl: true })
    }, [fetchTeams]
  )

  if (teams.length === 0) return null

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        Team Ladder
      </Typography>
      <SortTable
        collection={teams}
        handleSortChange={(newSort) => fetchTeams({ sort: newSort, updateUrl: true })}
        sort={sort || {}}
        cells={TEAMS_TABLE_CELLS}
      />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  teams: state.teams.data
})

const matchDispatchToProps = {
  fetchTeams: teamsActions.fetchTeams
}


export default connect(mapStateToProps, matchDispatchToProps)(TeamsPage)
