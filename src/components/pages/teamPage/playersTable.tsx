import { useEffect } from 'react'

import SortTable from 'components/common/sortTable'

import type { TeamPlayer } from 'types'

type Props = {
  players: TeamPlayer[],
  fetchTeamPlayers: Function,
  sort: {
    players: Object,
    fixtures: Object
  },
  teamId: string,
  tab: string
}

const PLAYERS_TABLE_CELLS = [
  { cellId: 'lastName', label: 'LN', toolTipLabel: 'Last Name', sticky: true, sortParam: 'lastName' },
  { cellId: 'firstName', label: 'FN', toolTipLabel: 'First Name', sortParam: 'firstName' },
  {
    cellId: 'positions',
    label: 'P',
    toolTipLabel: 'Position',
    sortParam: 'positions.singularNameShort',
    customRender: ({ position: { singularNameShort }}: TeamPlayer) => singularNameShort
  },
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

const PlayersTable = (props: Props) => {
  const { teamId, players = [], tab, fetchTeamPlayers, sort } = props

  useEffect(
    () => {
      fetchTeamPlayers(teamId, tab, sort.players)
    }, [fetchTeamPlayers, teamId]
  )

  return (
    <SortTable
      collection={players}
      handleSortChange={(newSort) => fetchTeamPlayers(teamId, tab,  newSort, 'push')}
      sort={sort.players}
      cells={PLAYERS_TABLE_CELLS}
    />
  )
}

export default PlayersTable
