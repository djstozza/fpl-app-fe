import reducer from './reducer'
import type { State } from './reducer'

import * as playerActions from './actions'

export {
  playerActions
}

export type PlayerState = State

export default reducer
