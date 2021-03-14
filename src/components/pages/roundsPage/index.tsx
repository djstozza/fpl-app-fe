import { useEffect, useState, useMemo, Fragment } from 'react'
import { connect } from 'react-redux'

import { roundActions } from 'state/round'
import { roundsActions } from 'state/rounds'
import history from 'state/history'

import TabPanel from './tabPanel'
import RoundDetails from './roundDetails'

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

  const getSelectedRoundId = () => roundId || currentRoundId || lastRoundId

  const [selectedRoundId, setSelectedRoundId] = useState(getSelectedRoundId())

  const handleChange = (newRoundId) => {
    fetchRound(newRoundId)
  }

  useEffect(
    () => {
      fetchRounds()
    }, [fetchRounds]
  )

  // useEffect(
  //   () => {
  //     if (!selectedRoundId) return
  //
  //     fetchRound(selectedRoundId)
  //   }, [fetchRound, selectedRoundId]
  // )

  if (rounds.length === 0) return null

  return (
    <Fragment>
      <TabPanel
        rounds={rounds}
        roundId={getSelectedRoundId()}
        onChange={handleChange}
      />
      <RoundDetails
        roundId={getSelectedRoundId()}
        round={round}
        fetchRound={fetchRound}
      />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  round: state.round?.data,
  rounds: state.rounds.data
})

const matchDispatchToProps = {
  fetchRound: roundActions.fetchRound,
  fetchRounds: roundsActions.fetchRounds
}


export default connect(mapStateToProps, matchDispatchToProps)(RoundsPage)
