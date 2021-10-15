import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/team/reducer'
import { playersTableCells } from 'components/pages/playersPage'


import type { PlayersState } from 'state/players'
import type { CellHash } from 'types'

type Props = {
  players: PlayersState,
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
  const { teamId, players: { data: players, fetching }, tab, fetchTeamPlayers, updateTeamPlayersSort } = props

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
        fetching={fetching}
        name='players'
      />
    </SearchListener>
  )
}

export default PlayersTable
