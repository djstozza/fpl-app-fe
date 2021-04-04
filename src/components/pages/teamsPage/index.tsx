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
    sort: true,
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
  { cellId: 'position', label: 'R', toolTipLabel: 'Rank', sort: true },
  { cellId: 'played', label: 'MP', toolTipLabel: 'Matches Played', sort: true },
  { cellId: 'wins', label: 'W', toolTipLabel: 'Wins', sort: true },
  { cellId: 'losses', label: 'L', toolTipLabel: 'Losses', sort: true },
  { cellId: 'draws', label: 'D', toolTipLabel: 'Draws', sort: true },
  { cellId: 'goalsFor', label: 'GF', toolTipLabel: 'Goals For', sort: true },
  { cellId: 'goalsAgainst', label: 'GA', toolTipLabel: 'Goals Against', sort: true },
  { cellId: 'goalDifference', label: 'GD', toolTipLabel: 'Goal Difference', sort: true },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets', sort: true },
  { cellId: 'points', label: 'Pts', toolTipLabel: 'Points', sort: true },
  { cellId: 'currentForm', label: 'Last 5', toolTipLabel: 'Last 5', sort: false }
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
        recordName='fixtures'
        handleSortChange={(newSort) => fetchTeams({ sort: newSort, updateUrl: true })}
        sort={sort}
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
