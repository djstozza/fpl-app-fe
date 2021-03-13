import { useEffect } from 'react'
import { connect } from 'react-redux'

import { roundActions } from 'state/round'
import { roundsActions } from 'state/rounds'


import type { Round, RoundSummary } from 'types'

type Props = {
  round: Round,
  rounds: RoundSummary[],
  fetchRounds: Function,
  fetchRound: Function,
  match: { params: { roundId?: string } }
}

const RoundsPage = (props: Props) => {
  const {
    round,
    rounds,
    fetchRound,
    fetchRounds,
    match: { params: { roundId } }
  } = props

  const currentRoundId = rounds.find(({ isCurrent }) => isCurrent)?.id
  const lastRoundId = rounds[rounds.length - 1]?.id

  const selectedRoundId = roundId || currentRoundId || lastRoundId

  useEffect(
    () => {
      fetchRounds()
    }, [fetchRounds]
  )

  useEffect(
    () => {
      if (!selectedRoundId) return

      fetchRound(selectedRoundId)
    }, [selectedRoundId, fetchRound]
  )

  return null
}

const mapStateToProps = (state) => {

return {
  round: state.round?.data,
  rounds: state.rounds.data
}}

const matchDispatchToProps = {
  fetchRound: roundActions.fetchRound,
  fetchRounds: roundsActions.fetchRounds
}


export default connect(mapStateToProps, matchDispatchToProps)(RoundsPage)
