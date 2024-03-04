import { useEffect, Fragment } from 'react'
import moment from 'moment'
import { groupBy } from 'lodash'
import { makeStyles } from 'tss-react/mui'
import {
  Accordion,
  Typography,
  Theme
} from '@mui/material'

import FixtureSummary from '../fixtureSummary'
import FixtureDetails from '../fixtureDetails'
import { colors } from 'utilities/colors'

import type { Round, Fixture } from 'types'

type Props = {
  roundId?: string,
  round?: Round,
  fetchRound: (string) => void
}

type GroupedFixtures = {
  [key: string]: Fixture[]
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {

  },

  title: {
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  },

  summary: {
    textAlign: 'center',
    backgroundColor: colors.grey200,
    border: `0.5px solid ${colors.grey300}`
  },

  disabled: {
    paddingRight: theme.spacing(6)
  },

  statsContainer: {
    width: '100%',
    paddingRight: theme.spacing(3)
  }
}))

const RoundDetails = (props: Props) => {
  const { roundId, round, fetchRound } = props

  const { classes } = useStyles()

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
