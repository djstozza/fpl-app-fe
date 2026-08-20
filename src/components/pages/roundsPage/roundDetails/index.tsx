import { useEffect } from 'react'
import moment from 'moment'
import { groupBy } from 'lodash'
import {
  Accordion,
  Typography
} from '@mui/material'

import FixtureSummary from '../fixtureSummary'
import FixtureDetails from '../fixtureDetails'

import type { Round, Fixture } from 'types'

type Props = {
  roundId?: string,
  round?: Round,
  fetchRound: (string) => void
}

type GroupedFixtures = {
  [key: string]: Fixture[]
}

const titleSx = (theme) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
})

const RoundDetails = (props: Props) => {
  const { roundId, round, fetchRound } = props

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
    <div data-testid='RoundDetails'>
      <Typography variant='h4' sx={titleSx}>
        {name}
      </Typography>
      {
        Object.entries(groupedFixtures).map(([day, fixtures]) => (
          <div
            data-testid='round-day-container'
            key={day}
          >
            <Typography variant='subtitle1' sx={titleSx}>
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
    </div>
  )
}

export default RoundDetails
