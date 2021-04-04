import { useEffect } from 'react'

import SortTable from 'components/common/sortTable'

import type { PlayerSummary } from 'types'

type Props = {
  players: PlayerSummary[],
  fetchTeamPlayers: Function,
  sort: {
    players: Object,
    fixtures: Object
  },
  teamId: string,
  tab: string
}

const PLAYERS_TABLE_CELLS = [
  { cellId: 'lastName', label: 'LN', toolTipLabel: 'Last Name', sticky: true, sort: true },
  { cellId: 'firstName', label: 'FN', toolTipLabel: 'First Name', sort: true },
  {
    cellId: 'positionId',
    label: 'P',
    toolTipLabel: 'Position',
    sort: true,
    customRender: ({ position: { singularNameShort }}: PlayerSummary) => singularNameShort
  },
  { cellId: 'totalPoints', label: 'TP', toolTipLabel: 'Total Points', sort: true },
  { cellId: 'goalsScored', label: 'GS', toolTipLabel: 'Goals Scored', sort: true },
  { cellId: 'assists', label: 'A', toolTipLabel: 'Assists', sort: true },
  { cellId: 'yellowCards', label: 'YC', toolTipLabel: 'Yellow Cards', sort: true },
  { cellId: 'redCards', label: 'RC', toolTipLabel: 'Red Cards', sort: true },
  { cellId: 'bonus', label: 'BP', toolTipLabel: 'Bonus Points', sort: true },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets', sort: true },
  { cellId: 'saves', label: 'S', toolTipLabel: 'Saves', sort: true },
  { cellId: 'penaltiesSaved', label: 'PS', toolTipLabel: 'Penalties Saved', sort: true },
  { cellId: 'penaltiesMissed', label: 'PM', toolTipLabel: 'Penalties Missed', sort: true },
  { cellId: 'ownGoals', label: 'OG', toolTipLabel: 'Own Goals', sort: true }
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
      recordName='players'
      handleSortChange={(newSort) => fetchTeamPlayers(teamId, tab, newSort)}
      sort={sort}
      cells={PLAYERS_TABLE_CELLS}
    />
  )
}

export default PlayersTable
