import { Link } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Theme,
  Tooltip,
  makeStyles,
  createStyles
} from '@material-ui/core'

import type { PlayerSummary } from 'types'

import { teamCrestPathLoader } from 'utilities/helpers'
import { ROUNDS_URL, TEAMS_URL } from 'utilities/constants'

type Props = {
  players: PlayerSummary[]
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
  { cellId: 'lastName', label: 'LN', toolTipLabel: 'Last Name', sticky: true },
  { cellId: 'firstName', label: 'FN', toolTipLabel: 'First Name' },
  { cellId: 'position', label: 'P', toolTipLabel: 'Position' },
  { cellId: 'totalPoints', label: 'TP', toolTipLabel: 'Total Points' },
  { cellId: 'goalsScored', label: 'GS', toolTipLabel: 'Goals Scored' },
  { cellId: 'assists', label: 'A', toolTipLabel: 'Assists' },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets' },
  { cellId: 'yellowCards', label: 'YC', toolTipLabel: 'Yellow Cards' },
  { cellId: 'redCards', label: 'RC', toolTipLabel: 'Red Cards' },
  { cellId: 'bonus', label: 'BP', toolTipLabel: 'Bonus Points' },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets' },
  { cellId: 'saves', label: 'S', toolTipLabel: 'Saves' },
  { cellId: 'penaltiesSaved', label: 'PS', toolTipLabel: 'Penalties Saved' },
  { cellId: 'penaltiesMissed', label: 'PM', toolTipLabel: 'Penalties Missed' },
  { cellId: 'ownGoals', label: 'OG', toolTipLabel: 'Own Goals' }
]

const FixturesTable = (props: Props) => {
  const { players } = props

  const classes = useStyles()

  return (
    <Table
      size='small'
      className={classes.table}
      stickyHeader
    >
      <TableHead>
        <TableRow>
          {
            PLAYERS_TABLE_CELLS.map(({ cellId, label, toolTipLabel, sticky }, key) => (
              <TableCell
                align='center'
                key={key}
                className={classnames({ [classes.mainHeaderCell]: sticky })}
              >
                <Tooltip title={toolTipLabel}>
                  <div>
                    {label}
                  </div>
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
                PLAYERS_TABLE_CELLS.map(({ cellId, sticky }, cellKey) => (
                  <TableCell
                    key={cellKey}
                    align='center'
                    className={classnames({ [classes.mainCell]: sticky })}
                  >
                    {  player[cellId] }
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

export default FixturesTable
