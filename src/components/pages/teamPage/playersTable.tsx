import { MouseEvent } from 'react'
import classnames from 'classnames'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Theme,
  Tooltip,
  TableSortLabel,
  makeStyles,
  createStyles
} from '@material-ui/core'

import type { PlayerSummary } from 'types'

type Props = {
  players: PlayerSummary[],
  fetchTeamPlayers: Function,
  sort: {
    players: Object,
    fixtures: Object
  },
  teamId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      maxWidth: theme.spacing(100),
      margin: '0 auto'
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    link: {
      textDecoration: 'none',
      color: '#0645AD'
    },
    noWrap: {
      whiteSpace: 'nowrap'
    },
    crest: {
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

const PLAYERS_TABLE_CELLS = [
  { cellId: 'lastName', label: 'LN', toolTipLabel: 'Last Name', sticky: true, sort: true },
  { cellId: 'firstName', label: 'FN', toolTipLabel: 'First Name', sort: true },
  {
    cellId: 'positionId',
    label: 'P',
    toolTipLabel: 'Position',
    sort: true,
    customRender: ({ position: { singularNameShort }}: PlayerSummary) => singularNameShort
  },
  { cellId: 'totalPoints', label: 'TP', toolTipLabel: 'Total Points', sort: true },
  { cellId: 'goalsScored', label: 'GS', toolTipLabel: 'Goals Scored', sort: true },
  { cellId: 'assists', label: 'A', toolTipLabel: 'Assists', sort: true },
  { cellId: 'yellowCards', label: 'YC', toolTipLabel: 'Yellow Cards', sort: true },
  { cellId: 'redCards', label: 'RC', toolTipLabel: 'Red Cards', sort: true },
  { cellId: 'bonus', label: 'BP', toolTipLabel: 'Bonus Points', sort: true },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets', sort: true },
  { cellId: 'saves', label: 'S', toolTipLabel: 'Saves', sort: true },
  { cellId: 'penaltiesSaved', label: 'PS', toolTipLabel: 'Penalties Saved', sort: true },
  { cellId: 'penaltiesMissed', label: 'PM', toolTipLabel: 'Penalties Missed', sort: true },
  { cellId: 'ownGoals', label: 'OG', toolTipLabel: 'Own Goals', sort: true }
]

const PlayersTable = (props: Props) => {
  const { teamId, players = [], fetchTeamPlayers, sort } = props
  const { players: sortParams } = sort

  const classes = useStyles()

  const handleSort = (sort, id, direction) => (event: MouseEvent<unknown>) => {
    if (!sort) return

    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    const newSortParams = {
      [id]: newDirection
    }

    fetchTeamPlayers(teamId, newSortParams)
  }

  return (
    <Table
      size='small'
      className={classes.table}
      stickyHeader
    >
      <TableHead>
        <TableRow>
          {
            PLAYERS_TABLE_CELLS.map(({ cellId, label, toolTipLabel, sort, sticky }, key) => (
              <TableCell
                align='center'
                key={key}
                className={classnames({ [classes.mainHeaderCell]: sticky })}
              >
                <Tooltip title={toolTipLabel}>
                  <TableSortLabel
                    hideSortIcon={!sort}
                    onClick={
                      handleSort(sort, cellId, sortParams[cellId])
                    }
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
          players.map((player, rowKey) => (
            <TableRow key={rowKey}>
              {
                PLAYERS_TABLE_CELLS.map(({ cellId, sticky, customRender }, cellKey) => (
                  <TableCell
                    key={cellKey}
                    className={classnames({ [classes.mainCell]: sticky })}
                  >
                    {customRender ? customRender(player) : player[cellId]}
                  </TableCell>
                ))
              }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

export default PlayersTable
