import { connect } from 'react-redux'

import { leaguesActions } from 'state/leagues'
import LeagueForm from './leagueForm'

import type { Error } from 'types'

type Props = {
  errors: Error[],
  joinLeague: Function,
  initializeForm: Function
}

const JoinLeague = (props: Props) => {
  const { errors, joinLeague, initializeForm } = props

  return (
    <LeagueForm
      title='Join a League'
      errors={errors}
      submitFn={joinLeague}
      initializeForm={initializeForm}
    />
  )
}

const mapStateToProps = (state) => {
  const {
    leagues: {
      errors = []
    }
  } = state

  return {
    errors
  }
}

const matchDispatchToProps = {
  joinLeague: leaguesActions.joinLeague,
  initializeForm: leaguesActions.initializeForm
}

export default connect(mapStateToProps, matchDispatchToProps)(JoinLeague)
