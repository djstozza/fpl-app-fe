import reducer from './reducer'
import type { State } from './reducer'

import * as teamActions from './actions'
import teamSagas from './sagas'

export {
  teamActions,
  teamSagas
}

export type TeamState = State

export default reducer
