import moment from 'moment'
import { Redirect } from 'react-router-dom'

import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/player/reducer'
import { PLAYERS_URL, ROUNDS_URL } from 'utilities/constants'
import Link from 'components/common/link'
import TeamCrestLink from 'components/common/teamCrestLink'

import type { History } from 'types'

type Props = {
  playerId: string,
  tab: string,
  history: History[],
  fetchPlayerHistory: Function,
  updatePlayerHistorySort: Function,
  hasHistory: boolean
}

const HISTORY_TABLE_CELLS = [
  {
    cellId: 'rounds',
    label: 'R',
    toolTipLabel: 'Round',
    sticky: true,
    customRender: ({ round: { id, name } }: History, classes, tab) => (
      <Link to={`${ROUNDS_URL}/${id}`} noWrap>
        {name}
      </Link>
    ),
    sortParam: 'rounds.deadlineTime'
  },
  {
    cellId: 'opponent',
    label: 'O',
    toolTipLabel: 'Opponent',
    customRender: ({ opponent }: History, classes, tab) => <TeamCrestLink team={opponent} />,
    sortParam: 'oppositionTeam.shortName',
  },

  {
    cellId: 'kickoffTime',
    label: 'K',
    toolTipLabel: 'Kickoff Time',
    customRender: ({ kickoffTime }: History, classes) => (
      <div className={classes.noWrap}>
        {moment(kickoffTime).format('DD/MM/YY HH:mm')}
      </div>
    ),
    sortParam: 'kickoffTime'
  },
  { cellId: 'minutes', label: 'M', toolTipLabel: 'Minutes', sortParam: 'minutes' },
  { cellId: 'totalPoints', label: 'TP', toolTipLabel: 'Total Points', sortParam: 'totalPoints' },
  { cellId: 'goalsScored', label: 'GS', toolTipLabel: 'Goals Scored', sortParam: 'goalsScored' },
  { cellId: 'assists', label: 'A', toolTipLabel: 'Assists', sortParam: 'assists' },
  { cellId: 'yellowCards', label: 'YC', toolTipLabel: 'Yellow Cards', sortParam: 'yellowCards' },
  { cellId: 'redCards', label: 'RC', toolTipLabel: 'Red Cards', sortParam: 'redCards' },
  { cellId: 'bonus', label: 'BP', toolTipLabel: 'Bonus Points', sortParam: 'bonus' },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets', sortParam: 'cleanSheets' },
  { cellId: 'saves', label: 'S', toolTipLabel: 'Saves', sortParam: 'saves' },
  { cellId: 'penaltiesSaved', label: 'PS', toolTipLabel: 'Penalties Saved', sortParam: 'penaltiesSaved' },
  { cellId: 'penaltiesMissed', label: 'PM', toolTipLabel: 'Penalties Missed', sortParam: 'penaltiesMissed' },
  { cellId: 'ownGoals', label: 'OG', toolTipLabel: 'Own Goals', sortParam: 'ownGoals' }
]

const HistoryTable = (props: Props) => {
  const { history = [], playerId, tab, fetchPlayerHistory, updatePlayerHistorySort, hasHistory } = props

  if (!hasHistory) return <Redirect to={`${PLAYERS_URL}/${playerId}`} />

  return (
    <SearchListener id={playerId} fetchAction={fetchPlayerHistory} initialFilterState={initialFilterState}>
      <SortTable
        collection={history}
        handleSortChange={(newSort) => updatePlayerHistorySort({ tab, sort: newSort })}
        cells={HISTORY_TABLE_CELLS}
        tab={tab}
      />
    </SearchListener>
  )
}

export default HistoryTable
