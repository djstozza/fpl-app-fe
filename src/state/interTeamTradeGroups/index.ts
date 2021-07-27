import reducer from './reducer'
import type { State } from './reducer'

import * as interTeamTradeGroupsActions from './actions'
import interTeamTradeGroupsSagas from './sagas'

export {
  interTeamTradeGroupsActions,
  interTeamTradeGroupsSagas
}

export type InterTeamTradeGroupsState = State

export default reducer
