import reducer from './reducer'
import type { State } from './reducer'

import * as teamsActions from './actions'
import teamsSagas from './sagas'

export {
  teamsActions,
  teamsSagas
}

export type TeamsState = State

export default reducer
