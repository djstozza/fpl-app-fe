import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/team/reducer'
import { playersTableCells } from 'components/pages/playersPage'

import type { TeamPlayer, CellHash } from 'types'

type Props = {
  players: TeamPlayer[],
  fetchTeamPlayers: Function,
  sort: {
    players: Object,
    fixtures: Object
  },
  teamId: string,
  tab: string,
  updateTeamPlayersSort: Function
}

const PlayersTable = (props: Props) => {
  const { teamId, players = [], tab, fetchTeamPlayers, updateTeamPlayersSort } = props

  const cellHash: CellHash = playersTableCells()
  delete cellHash['teams']
  const cells = Object.values(cellHash).map(cell => ({ ...cell, filterParam: '' }))

  return (
    <SearchListener id={teamId} fetchAction={fetchTeamPlayers} initialFilterState={initialFilterState}>
      <SortTable
        collection={players}
        handleSortChange={(newSort) => updateTeamPlayersSort({ tab, sort: newSort })}
        cells={cells}
        tab={tab}
      />
    </SearchListener>
  )
}

export default PlayersTable
