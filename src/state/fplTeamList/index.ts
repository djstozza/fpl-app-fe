import reducer from './reducer'
import type { State } from './reducer'

import * as fplTeamListActions from './actions'
import fplTeamListSagas from './sagas'

export {
  fplTeamListActions,
  fplTeamListSagas
}

export type FplTeamListState = State

export default reducer
