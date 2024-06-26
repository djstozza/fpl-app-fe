import { connect } from 'react-redux'

import { leaguesActions } from 'state/leagues'
import LeagueForm from '../leagueForm'

import type { Error } from 'types'

type Props = {
  errors: Error[],
  createLeague: Function,
  initializeForm: () => void
}

export const CreateLeague = (props: Props) => {
  const { errors = [], createLeague, initializeForm } = props

  return (
    <div data-testid='CreateLeague'>
      <LeagueForm
        title='Create a League'
        errors={errors}
        submitFn={createLeague}
        initializeForm={initializeForm}
        create
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    leagues: {
      errors
    }
  } = state

  return {
    errors
  }
}

const matchDispatchToProps = {
  createLeague: leaguesActions.createLeague,
  initializeForm: leaguesActions.initializeForm
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateLeague)
