import { Fragment } from 'react'

import { startCase, orderBy } from 'lodash'
import {
  AccordionDetails,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material'

import Link from 'components/common/link'
import { PLAYERS_URL } from 'utilities/constants'
import { colors } from 'utilities/colors'

import type { Fixture } from 'types'

type Props = {
  fixture: Fixture
}

const headerCellSx = (theme) => ({
  backgroundColor: colors.grey200,
  '&:last-child': {
    paddingRight: theme.spacing(6.5)
  }
})

const detailsCellSx = (theme) => ({
  width: '50%',
  paddingRight: theme.spacing(12.5)
})

const FixtureDetails = (props: Props) => {
  const { fixture: { stats } } = props

  const playerStatsDisplay = (statGroup) => (
    orderBy(statGroup, ({ value }) => value, 'desc').map(({ value, player: { id, lastName } }, key) => (
      <div key={key}>
        {value} <Link to={`${PLAYERS_URL}/${id}`}>{lastName}</Link>
      </div>
    ))
  )

  return (
    <AccordionDetails sx={{ padding: 0 }}>
      <Table size='small'>
        {
          orderBy(stats, ({ displayOrder }) => displayOrder).map(({ identifier, home, away }, key) => {
            if (home.length === 0 && away.length === 0) return null

            return (
              <Fragment key={key}>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' colSpan={2} sx={headerCellSx}>
                      {startCase(identifier)}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='center' sx={detailsCellSx}>
                      {playerStatsDisplay(home)}
                    </TableCell>
                    <TableCell  align='center' sx={detailsCellSx}>
                       {playerStatsDisplay(away)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Fragment>
            )
          })
        }
      </Table>
    </AccordionDetails>
  )
}

export default FixtureDetails
