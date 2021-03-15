import { Fragment } from 'react'
import classnames from 'classnames'
import { map, startCase, orderBy } from 'lodash'
import {
  AccordionDetails,
  Typography,
  Grid,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'

import type { Fixture } from 'types'

type Props = {
  fixture: Fixture
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statsContainer: {
      width: '100%',
      marginRight: theme.spacing(3),
      textAlign: 'center'
    },
    foo: {
      marginTop: theme.spacing(1.5)
    }
  })
)

const FixtureDetails = (props: Props) => {
  const { fixture: { stats } } = props

  const classes = useStyles()

  const playerStatsDisplay = (statGroup) => (
    orderBy(statGroup, ({ value }) => value, 'desc').map(({ value, player: { id, name } }, key) => (
      <Typography variant='body1' key={key}>
        {value} {name}
      </Typography>
    ))
  )

  return (
    <AccordionDetails>
      <div className={classes.statsContainer}>
        <Grid container spacing={1}>
          {
            orderBy(stats, ({ displayOrder }) => displayOrder).map(({ displayOrder, identifier, home, away }, key) => {
              if (home.length === 0 && away.length === 0) return null

              return (
                <Fragment key={key}>
                  <Grid item xs={12} md={12}>
                    <Typography variant='body1' className={classnames({ [classes.foo]: displayOrder === 1 })}>
                      {startCase(identifier)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={3} lg={4}>
                    {playerStatsDisplay(home)}
                  </Grid>
                  <Grid item xs={4} md={4} lg={4} />
                  <Grid item xs={4} md={4} lg={4}>
                    {playerStatsDisplay(away)}
                  </Grid>
                </Fragment>
              )
            })
          }
        </Grid>
      </div>
    </AccordionDetails>
  )
}

export default FixtureDetails
