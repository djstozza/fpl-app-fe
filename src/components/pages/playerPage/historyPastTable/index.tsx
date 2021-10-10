import { Redirect } from 'react-router-dom'

import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/player/reducer'
import { PLAYERS_URL } from 'utilities/constants'

import type { HistoryPast } from 'types'

type Props = {
  playerId: string,
  tab: string,
  historyPast: HistoryPast[],
  fetchPlayerHistoryPast: Function,
  updatePlayerHistoryPastSort: Function,
  hasHistoryPast: boolean,
  fetching: boolean
}

const HISTORY_PAST_TABLE_CELLS = [
  { cellId: 'seasonName', label: 'S', toolTipLabel: 'Season', sticky: true, sortParam: 'seasonName' },
  { cellId: 'minutes', label: 'M', toolTipLabel: 'Minutes', sortParam: 'minutes' },
  { cellId: 'totalPoints', label: 'TP', toolTipLabel: 'Total Points', sortParam: 'totalPoints' },
  { cellId: 'goalsScored', label: 'GS', toolTipLabel: 'Goals Scored', sortParam: 'goalsScored' },
  { cellId: 'assists', label: 'A', toolTipLabel: 'Assists', sortParam: 'assists' },
  { cellId: 'yellowCards', label: 'YC', toolTipLabel: 'Yellow Cards', sortParam: 'yellowCards' },
  { cellId: 'redCards', label: 'RC', toolTipLabel: 'Red Cards', sortParam: 'redCards' },
  { cellId: 'bonus', label: 'BP', toolTipLabel: 'Bonus Points', sortParam: 'bonus' },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets', sortParam: 'cleanSheets' },
  { cellId: 'saves', label: 'S', toolTipLabel: 'Saves', sortParam: 'saves' },
  { cellId: 'goalsConceded', label: 'GC', toolTipLabel: 'Goals Conceded', sortParam: 'goalsConceded' },
  { cellId: 'penaltiesSaved', label: 'PS', toolTipLabel: 'Penalties Saved' , sortParam: 'penaltiesSaved'},
  { cellId: 'penaltiesMissed', label: 'PM', toolTipLabel: 'Penalties Missed', sortParam: 'penaltiesMissed' },
  { cellId: 'ownGoals', label: 'OG', toolTipLabel: 'Own Goals', sortParam: 'ownGoals' }
]

const HistoryPastTable = (props: Props) => {
  const {
    historyPast = [],
    playerId,
    tab,
    hasHistoryPast,
    fetchPlayerHistoryPast,
    updatePlayerHistoryPastSort,
    fetching
  } = props

  if (!hasHistoryPast) return <Redirect to={`${PLAYERS_URL}/${playerId}`} />

  return (
    <SearchListener id={playerId} fetchAction={fetchPlayerHistoryPast} initialFilterState={initialFilterState}>
      <SortTable
        collection={historyPast}
        cells={HISTORY_PAST_TABLE_CELLS}
        handleSortChange={(newSort) => updatePlayerHistoryPastSort({ tab, sort: newSort })}
        tab={tab}
        fetching={fetching}
        name='past seasons'
      />
    </SearchListener>
  )
}

export default HistoryPastTable
