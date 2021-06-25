import reducer from './reducer'
import type { State } from './reducer'

import * as fplTeamsActions from './actions'
import fplTeamsSagas from './sagas'

export {
  fplTeamsActions,
  fplTeamsSagas
}

export type FplTeamsState = State

export default reducer
