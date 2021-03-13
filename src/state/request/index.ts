import reducer from './reducer'
import type { State } from './reducer'

import * as requestActions from './actions'
import requestSagas from './sagas'

export {
  requestActions,
  requestSagas
}

export type RequestState = State

export default reducer
