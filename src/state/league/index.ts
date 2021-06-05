import reducer from './reducer'
import type { State } from './reducer'

import * as leagueActions from './actions'
import leagueSagas from './sagas'

export {
  leagueActions,
  leagueSagas
}

export type LeagueState = State

export default reducer
