import { Fragment } from 'react'

import { startCase, orderBy } from 'lodash'
import {
  AccordionDetails,
  Theme,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
  createStyles
} from '@material-ui/core'

import Link from 'components/common/link'
import { PLAYERS_URL } from 'utilities/constants'
import { colors } from 'utilities/colors'

import type { Fixture } from 'types'

type Props = {
  fixture: Fixture
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 0
    },
    headerCell: {
      backgroundColor: colors.grey200,
      '&:last-child': {
        paddingRight: theme.spacing(6.5)
      }
    },
    detailsCell: {
      width: '50%',
      paddingRight: theme.spacing(12.5)
    }
  })
)

const FixtureDetails = (props: Props) => {
  const { fixture: { stats } } = props

  const classes = useStyles()

  const playerStatsDisplay = (statGroup) => (
    orderBy(statGroup, ({ value }) => value, 'desc').map(({ value, player: { id, lastName } }, key) => (
      <div key={key}>
        {value} <Link to={`${PLAYERS_URL}/${id}`}>{lastName}</Link>
      </div>
    ))
  )

  return (
    <AccordionDetails className={classes.container}>
      <Table size='small'>
        {
          orderBy(stats, ({ displayOrder }) => displayOrder).map(({ displayOrder, identifier, home, away }, key) => {
            if (home.length === 0 && away.length === 0) return null

            return (
              <Fragment key={key}>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' colSpan={2} className={classes.headerCell}>
                      {startCase(identifier)}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='center' className={classes.detailsCell}>
                      {playerStatsDisplay(home)}
                    </TableCell>
                    <TableCell  align='center' className={classes.detailsCell}>
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
