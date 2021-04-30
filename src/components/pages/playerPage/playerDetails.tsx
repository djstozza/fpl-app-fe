import { useRef, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'

import { SetElHeight } from 'utilities/helpers'
import PlayerImage from './playerImage'

import { Player } from 'types'

type Props = {
  player: Player
}

type HeightProps = {
  tableHeight: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100vw',
      overflow: 'scroll',
      [theme.breakpoints.up('sm')]: {
        maxHeight: ({ tableHeight }: HeightProps) => tableHeight
      },
      maxHeight: ({ tableHeight }: HeightProps) => tableHeight
    },
    playerImageContainer: {
      textAlign: 'center'
    },
    playerImage: {
      [theme.breakpoints.up('sm')]: {
        maxHeight: ({ tableHeight }: HeightProps) => tableHeight
      }
    }
  })
)

const PLAYER_DETAILS_ROWS = [
  {
    rowId: 'position',
    label: 'Position',
    customRender: ({ position: { singularNameShort }}: Player) => singularNameShort
  },
  { rowId: 'totalPoints', label: 'Total Points' },
  { rowId: 'minutes', label: 'Minutes' },
  {
    rowId: 'goalsScored',
    label: 'Goals Scored'
  },
  { rowId: 'assists', label: 'Assists' },
  { rowId: 'saves', label: 'Saves' },
  { rowId: 'cleanSheets', label: 'Clean Sheets' },
  { rowId: 'penaltiesSaved', label: 'Penalties Saved' },
  { rowId: 'penaltiesMissed', label: 'Penalties Missed' },
  { rowId: 'ownGoals', label: 'Own Goals' },
  { rowId: 'bonus', label: 'Bonus' }
]

const PlayerDetails = ({ player }: Props) => {
  const tableRef = useRef(null)
  const { code, lastName } = player

  const { height: tableHeight } = SetElHeight(tableRef)

  useEffect(() => {
    if (!tableHeight) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [tableHeight])

  const classes = useStyles({ tableHeight })

  return (
    <Grid container >
      <Grid item md={3} sm={5} xs={12}>
        <div className={classes.playerImageContainer}>
          <PlayerImage
            key={code}
            code={code}
            lastName={lastName}
            maxHeight={tableHeight}
          />
        </div>
      </Grid>
      <Grid item md={9} sm={7} xs={12}>
        <div ref={tableRef} className={classes.container}>
          <Table size='small'>
            <TableBody>
              {
                PLAYER_DETAILS_ROWS.map(({ rowId, label, customRender }) => (
                  <TableRow key={rowId}>
                    <TableCell align='center'>
                      {label}
                    </TableCell>
                    <TableCell align='center'>
                      {customRender ? customRender(player) : player[rowId]}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </Grid>
    </Grid>
  )
}


export default PlayerDetails
