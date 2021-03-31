import reducer from './reducer'
import type { State } from './reducer'

import * as playersActions from './actions'
import playersSagas from './sagas'

export {
  playersActions,
  playersSagas
}

export type PlayersState = State

export default reducer
