import reducer from './reducer'
import type { State } from './reducer'

import * as tradesActions from './actions'
import tradesSagas from './sagas'

export {
  tradesActions,
  tradesSagas
}

export type TradesState = State

export default reducer
