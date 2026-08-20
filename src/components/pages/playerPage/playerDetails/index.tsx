import { useRef, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Box
} from '@mui/material'

import { SetElHeight } from 'utilities/helpers'
import PlayerImage from '../playerImage'
import { playersTableCells } from 'components/pages/playersPage'

import { CellHash } from 'types'
import type { PlayerContext } from '..'

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

  const cells: CellHash = playersTableCells()
  delete cells.firstName
  delete cells.lastName
  delete cells.teams

  return (
    <Grid data-testid='PlayerDetails' container>
      <Grid size={{ md: 3, sm: 5, xs: 12 }}>
        <Box sx={{ textAlign: 'center' }}>
          <PlayerImage
            key={code}
            code={code}
            lastName={lastName}
            maxHeight={tableHeight}
          />
        </Box>
      </Grid>
      <Grid size={{ md: 9, sm: 7, xs: 12 }}>
        <Box
          ref={tableRef}
          sx={(theme) => ({
            maxWidth: '100vw',
            overflow: 'scroll',
            [theme.breakpoints.up('sm')]: {
              maxHeight: tableHeight
            },
            maxHeight: tableHeight
          })}
        >
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
        </Box>
      </Grid>
    </Grid>
  )
}


export default PlayerDetails
