import { Fragment } from 'react'
import classnames from 'classnames'
import { startCase, orderBy } from 'lodash'
import {
  AccordionDetails,
  Typography,
  Theme,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
  createStyles
} from '@material-ui/core'

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
      backgroundColor: '#f4f5f4',
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
      <div>
        {value} {lastName}
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
                  <TableCell align='center' className={classes.detailsCell}>
                    {playerStatsDisplay(home)}
                  </TableCell>
                  <TableCell  align='center' className={classes.detailsCell}>
                     {playerStatsDisplay(away)}
                  </TableCell>
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
