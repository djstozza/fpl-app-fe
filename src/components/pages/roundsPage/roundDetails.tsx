import { useEffect, Fragment } from 'react'
import moment from 'moment'
import { groupBy } from 'lodash'
import {
  Accordion,
  Typography,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'

import FixtureSummary from './fixtureSummary'
import FixtureDetails from './fixtureDetails'

import type { Round, Fixture } from 'types'

type Props = {
  roundId?: string,
  round?: Round,
  fetchRound: Function
}

type GroupedFixtures = {
  [key: string]: Fixture[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    title: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1)
    },
    summary: {
      textAlign: 'center',
      backgroundColor: '#eeeeee',
      border: '0.5px solid #e0e0e0'
    },
    disabled: {
      paddingRight: theme.spacing(6)
    },
    statsContainer: {
      width: '100%',
      paddingRight: theme.spacing(3)
    }
  })
)

const RoundDetails = (props: Props) => {
  const { roundId, round, fetchRound } = props

  const classes = useStyles()

  useEffect(
    () => {
      if (!roundId) return

      fetchRound(roundId)
    }, [fetchRound, roundId]
  )

  if (!round) return null

  const { name, fixtures } = round

  const groupedFixtures: GroupedFixtures =
    groupBy(fixtures, ({ kickoffTime }) => moment(kickoffTime).format('Do MMMM YYYY'))

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {name}
      </Typography>
      {
        Object.entries(groupedFixtures).map(([day, fixtures]) => (
          <div key={day} className={classes.root}>
            <Typography variant='subtitle1' className={classes.title}>
              {day}
            </Typography>
            {
              fixtures.map((fixture, key) => (
                <Accordion key={key}>
                  <FixtureSummary fixture={fixture} />
                  <FixtureDetails fixture={fixture} />
                </Accordion>
              ))
            }
          </div>
        ))
      }
    </Fragment>
  )
}

export default RoundDetails
