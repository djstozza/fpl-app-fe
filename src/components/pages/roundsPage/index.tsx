import { useEffect, useState, useMemo, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'

import { roundActions } from 'state/round'
import { roundsActions } from 'state/rounds'
import { ROUNDS_URL, TITLE, cable } from 'utilities/constants'

import TabPanel from 'components/common/tabPanel'
import RoundDetails from './roundDetails'

import type { Round, RoundSummary } from 'types'

type Props = {
  round: Round,
  rounds: RoundSummary[],
  fetchRounds: Function,
  fetchRound: Function,
  match: { params: { roundId?: string } }
}

export const labelRenderer = (roundSummary: RoundSummary) => roundSummary.name

export const RoundsPage = (props: Props) => {
  const {
    round,
    rounds,
    fetchRound,
    fetchRounds,
    match: { params: { roundId } }
  } = props
  const [selectedRounId, setSelectedRoundId] = useState<string | undefined>()
  const [lastUpdatedAt, setLastUpdatedAt] = useState(0)

  const currentRoundId = rounds.find(({ current }) => current)?.id
  const lastRoundId = rounds[rounds.length - 1]?.id

  const handleReceived = useCallback(
    ({ updatedAt }) => {
      if (updatedAt <= lastUpdatedAt) return
      fetchRound(selectedRounId)
      setLastUpdatedAt(updatedAt)
    }, [selectedRounId, fetchRound, lastUpdatedAt, setLastUpdatedAt]
  )

  useEffect(
    () => {
      fetchRounds()
    }, [fetchRounds]
  )

  useMemo(
    () => {
      setSelectedRoundId(roundId || currentRoundId || lastRoundId)
    }, [setSelectedRoundId, roundId, currentRoundId, lastRoundId]
  )

  useEffect(
    () => {
      if (!selectedRounId) return
      let isActive = true

      cable.subscriptions.create(
        { channel: 'RoundsChannel', round_id: selectedRounId },
        { received: received => { if (isActive) handleReceived(received) } }
      )

      return () => { isActive = false }
    }, [handleReceived, selectedRounId]
  )

  if (rounds.length === 0) return null
  if (round) document.title = `${TITLE} - ${round.name}`

  return (
    <Fragment>
      <TabPanel
        collection={rounds}
        collectionId={selectedRounId}
        labelRenderer={labelRenderer}
        url={ROUNDS_URL}
      />
      <RoundDetails
        roundId={selectedRounId}
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
