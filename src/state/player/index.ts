import reducer from './reducer'
import type { State } from './reducer'

import * as playerActions from './actions'
import playerSagas from './sagas'

export {
  playerActions,
  playerSagas
}

export type PlayerState = State

export default reducer
