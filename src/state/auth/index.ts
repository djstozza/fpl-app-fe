import reducer from './reducer'
import type { State } from './reducer'

import * as authActions from './actions'

export {
  authActions
}

export type AuthState = State

export default reducer
