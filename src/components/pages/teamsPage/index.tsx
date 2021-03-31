import { useEffect, MouseEvent } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import { teamsActions } from 'state/teams'
import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableSortLabel,
  Theme,
  Tooltip,
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
    container: {
      height: '100vh',
      overflow: 'auto'
    },
    table: {
      maxWidth: theme.spacing(100),
      margin: '0 auto'
    },
    nameLink: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textDecoration: 'none',
      color: '#0645AD'
    },
    crest: {
      marginRight: theme.spacing(0.5),
      maxHeight: theme.spacing(3)
    },
    mainHeaderCell: {
      zIndex: 3
    },
    mainCell: {
      position: 'sticky',
      left: 0,
      backgroundColor: '#ffffff',
      zIndex: 2
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
    customRender: (shortName, id, classes) => (
      <Link to={`${TEAMS_URL}/${id}`} className={classes.nameLink}>
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

  const { sort: sortParams } = qs.parse(window.location.search.substring(1))

  const classes = useStyles()

  useEffect(
    () => {
      fetchTeams({ sort: { ...sortParams }, updateUrl: true })
    }, [fetchTeams]
  )

  const handleSort = (sort, id, direction) => (event: MouseEvent<unknown>) => {
    if (!sort) return

    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    const newSortParams = {
      [id]: newDirection
    }

    fetchTeams({ sort: newSortParams, updateUrl: true })
  }

  if (teams.length === 0) return null

  return (
    <div className={classes.container}>
      <Table
        size='small'
        className={classes.table}
        stickyHeader
      >
        <TableHead>
          <TableRow>
            {
              TEAMS_TABLE_CELLS.map(({ cellId, label, toolTipLabel, sort, sticky }, key) => (
                <TableCell
                  align='center'
                  key={key}
                  className={classnames({ [classes.mainHeaderCell]: sticky })}
                >
                  <Tooltip title={toolTipLabel}>
                    <TableSortLabel
                      hideSortIcon={!sort}
                      onClick={handleSort(sort, cellId, sortParams[cellId])}
                      active={Boolean(sortParams[cellId])}
                      direction={sortParams[cellId]}
                    >
                      {label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            teams.map((team, rowKey) => (
              <TableRow key={rowKey}>
                {
                  TEAMS_TABLE_CELLS.map(({ cellId, customRender, sticky }, cellKey) => (
                    <TableCell
                      key={cellKey}
                      className={classnames({ [classes.mainCell]: sticky })}
                    >
                      { customRender ? customRender(team[cellId], team.id, classes) : team[cellId] }
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  teams: state.teams.data
})

const matchDispatchToProps = {
  fetchTeams: teamsActions.fetchTeams
}


export default connect(mapStateToProps, matchDispatchToProps)(TeamsPage)
