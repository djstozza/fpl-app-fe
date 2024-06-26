import { useEffect } from 'react'
import moment from 'moment'
import { Navigate, useOutletContext } from 'react-router-dom'

import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/player/reducer'
import { PLAYERS_URL, ROUNDS_URL } from 'utilities/constants'
import Link from 'components/common/link'
import ContainedTeamCrestLink from 'components/common/teamCrestLink/contained'

import type { History } from 'types'
import type { PlayerContext } from '..'

const HISTORY_TABLE_CELLS = [
  {
    cellId: 'rounds',
    label: 'R',
    toolTipLabel: 'Round',
    sticky: true,
    customRender: ({ round: { id, name } }: History) => (
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
    customRender: ({ opponent }: History) => <ContainedTeamCrestLink team={opponent} />,
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

const HistoryTable = () => {
  const {
    player: { data: { hasHistory }, history = [], fetching },
    playerId,
    fetchPlayerHistory,
    updatePlayerHistorySort,
    setTab
  } = useOutletContext<PlayerContext>()
  
  const tab = 'history'
  
  useEffect(() => {
    if(hasHistory) setTab(tab)
  }, [])

  if (!hasHistory) return <Navigate to={`${PLAYERS_URL}/${playerId}`} />

  return (
    <div data-testid='HistoryTable'>
      <SearchListener
        id={playerId}
        fetchAction={fetchPlayerHistory}
        initialFilterState={initialFilterState}
      >
        <SortTable
          collection={history}
          handleSortChange={(newSort) => updatePlayerHistorySort({ tab, sort: newSort })}
          cells={HISTORY_TABLE_CELLS}
          tab={tab}
          fetching={fetching}
          name='history'
        />
      </SearchListener>
    </div>
  )
}

export default HistoryTable
