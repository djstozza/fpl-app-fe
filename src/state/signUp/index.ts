import reducer from './reducer'
import type { State } from './reducer'

import * as signUpActions from './actions'
import signUpSagas from './sagas'

export {
  signUpActions,
  signUpSagas
}

export type SignUpState = State

export default reducer
