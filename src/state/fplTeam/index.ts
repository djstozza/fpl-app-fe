import reducer from './reducer'
import type { State } from './reducer'

import * as fplTeamActions from './actions'
import fplTeamSagas from './sagas'

export {
  fplTeamActions,
  fplTeamSagas
}

export type FplTeamState = State

export default reducer
