import reducer from './reducer'
import type { State } from './reducer'

import * as fplTeamListsActions from './actions'
import fplTeamListsSagas from './sagas'

export {
  fplTeamListsActions,
  fplTeamListsSagas
}

export type FplTeamListsState = State

export default reducer
