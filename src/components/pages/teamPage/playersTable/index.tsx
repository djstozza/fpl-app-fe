import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/team/reducer'
import { playersTableCells } from 'components/pages/playersPage'


import type { TeamContext } from '..'
import type { CellHash } from 'types'

const PlayersTable = () => {
  const {
    teamId,
    players: { data: players, fetching },
    fetchTeamPlayers,
    updateTeamPlayersSort,
    setTab
  } = useOutletContext<TeamContext>()

  const tab = 'players'

  useEffect(() => {
    setTab(tab)
  }, [])

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
