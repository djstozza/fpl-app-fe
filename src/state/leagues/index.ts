import reducer from './reducer'
import type { State } from './reducer'

import * as leaguesActions from './actions'
import leaguesSagas from './sagas'

export {
  leaguesActions,
  leaguesSagas
}

export type LeaguesState = State

export default reducer
