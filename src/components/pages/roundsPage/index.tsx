import { useEffect } from 'react'
import { connect } from 'react-redux'

import { roundsActions } from 'state/rounds'

import type { Round } from 'types'

type Props = {
  data: Round[],
  fetchRounds: Function
}

const RoundsPage = (props: Props) => {
  const {
    data: rounds,
    fetchRounds
  } = props

  console.log(rounds)

  useEffect(
    () => {
      fetchRounds()
    }, [fetchRounds]
  )
  return null
}

const mapStateToProps = (state) => {

return {

  data: state?.rounds?.data
}}

const matchDispatchToProps = {
  fetchRounds: roundsActions.fetchRounds
}


export default connect(mapStateToProps, matchDispatchToProps)(RoundsPage)
