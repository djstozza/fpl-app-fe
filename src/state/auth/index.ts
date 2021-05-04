import reducer from './reducer'
import type { State } from './reducer'

import * as authActions from './actions'
import authSagas from './sagas'

export {
  authActions,
  authSagas
}

export type AuthState = State

export default reducer
