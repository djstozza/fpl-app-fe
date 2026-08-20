import reducer from './reducer'
import type { State } from './reducer'

import * as playersActions from './actions'

export {
  playersActions
}

export type PlayersState = State

export default reducer
