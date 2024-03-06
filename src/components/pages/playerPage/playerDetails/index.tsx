import { useRef, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Theme
} from '@mui/material'

import { SetElHeight } from 'utilities/helpers'
import PlayerImage from '../playerImage'
import { playersTableCells } from 'components/pages/playersPage'

import { CellHash } from 'types'
import type { PlayerContext } from '..'

type HeightProps = {
  tableHeight: number
}

const useStyles = makeStyles<HeightProps>()((theme: Theme, { tableHeight }) => ({
  container: {
    maxWidth: '100vw',
    overflow: 'scroll',
    [theme.breakpoints.up('sm')]: {
      maxHeight: tableHeight
    },
    maxHeight: tableHeight
  },

  playerImageContainer: {
    textAlign: 'center'
  },

  playerImage: {
    [theme.breakpoints.up('sm')]: {
      maxHeight: tableHeight
    }
  }
}))

const PlayerDetails = () => {
  const tableRef = useRef(null)
  const { player: { data: player }, setTab } = useOutletContext<PlayerContext>()
  const { code, lastName } = player
  const tab = 'details'
  const { height: tableHeight } = SetElHeight(tableRef)

  useEffect(() => {
    setTab(tab)
  }, [])

  useEffect(() => {
    if (!tableHeight) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [tableHeight])

  const { classes } = useStyles({ tableHeight })

  const cells: CellHash = playersTableCells()
  delete cells.firstName
  delete cells.lastName
  delete cells.teams

  return (
    <Grid data-testid='PlayerDetails' container>
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
                Object.values(cells).map(({ cellId, toolTipLabel: label, customRender }) => (
                  <TableRow key={cellId}>
                    <TableCell align='center'>
                      {label}
                    </TableCell>
                    <TableCell align='center'>
                      {customRender ? customRender(player) : player[cellId]}
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
