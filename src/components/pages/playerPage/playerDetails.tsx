import { useState, useRef, useEffect } from 'react'
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
import Skeleton from '@material-ui/lab/Skeleton'

import { playerImage } from 'utilities/helpers'
import TeamCrestLink from 'components/common/teamCrestLink'
import { TEAMS_URL } from 'utilities/constants'
import { SetElHeight } from 'utilities/helpers'

import { Player } from 'types'

type Props = {
  player: Player
}

type HeightProps = {
  tableHeight: number,
  imageHeight: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100vw',
      overflow: 'scroll',
      [theme.breakpoints.up('sm')]: {
        maxHeight: ({ tableHeight }: HeightProps) => tableHeight
      },
      maxHeight: ({ tableHeight, imageHeight }: HeightProps) => tableHeight - imageHeight
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
  const [imageHeight, setImageHeight] = useState(0)

  const { height: tableHeight } = SetElHeight(tableRef)

  useEffect(() => {
    if (!tableHeight) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [tableHeight, imageHeight])

  const handleImageLoad = (event) => {
    const target = event.target as HTMLInputElement
    setImageHeight(target.offsetHeight)
  }

  const classes = useStyles({ tableHeight, imageHeight })

  return (
    <Grid container >
      <Grid item md={3} sm={5} xs={12}>
      {
        <div className={classes.playerImageContainer}>
          <img
            className={classes.playerImage}
            src={playerImage(player.code)}
            onLoad={handleImageLoad}
            alt={player.lastName}
          />
        </div>
      }

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
