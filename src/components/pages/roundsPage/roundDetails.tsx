import { useEffect, Fragment } from 'react'
import {
  Typography
} from '@material-ui/core'

import type { Round } from 'types'

type Props = {
  roundId?: string,
  round?: Round,
  fetchRound: Function
}

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

  console.log(fixtures)

  return (
    <Fragment>
      <Typography variant='h4'>
        {name}
      </Typography>
    </Fragment>
  )
}

export default RoundDetails
