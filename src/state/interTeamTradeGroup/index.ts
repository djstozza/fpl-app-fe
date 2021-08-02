import reducer from './reducer'
import type { State } from './reducer'

import * as interTeamTradeGroupActions from './actions'
import interTeamTradeGroupSagas from './sagas'

export {
  interTeamTradeGroupActions,
  interTeamTradeGroupSagas
}

export type InterTeamTradeGroupState = State

export default reducer
