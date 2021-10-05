import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'

import { Team } from 'types'

type Props = {
  team: Team
}

const TEAM_DETAILS_ROWS = [
  { rowId: 'position', label: 'Rank' },
  { rowId: 'played', label: 'Matches Played' },
  { rowId: 'wins', label: 'Wins' },
  { rowId: 'losses', label: 'Losses' },
  { rowId: 'draws', label: 'Draws' },
  { rowId: 'goalsFor', label: 'Goals For' },
  { rowId: 'goalsAgainst', label: 'Goals Against' },
  { rowId: 'goalDifference', label: 'Goal Difference' },
  { rowId: 'cleanSheets', label: 'Clean Sheets' },
  { rowId: 'points', label: 'Points' },
  { rowId: 'currentForm', label: 'Last 5' }
]

const TeamDetails = ({ team }: Props) => (
  <Table size='small'>
    <TableBody>
      {
        TEAM_DETAILS_ROWS.map(({ rowId, label }) => (
          <TableRow key={rowId}>
            <TableCell align='center'>
              {label}
            </TableCell>
            <TableCell align='center'>
              {team[rowId]}
            </TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  </Table>
)


export default TeamDetails
