import { useEffect, Fragment } from 'react'

import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/players/reducer'
import SearchListener from 'components/common/searchListener'
import { PLAYERS_TABLE_CELLS } from 'components/pages/playersPage'

import {
  Button
} from '@material-ui/core'

import type { PlayersState } from 'state/players'
import type { PlayerSummary } from 'types'

type Props = {
  players: PlayersState,
  fetchAvailablePlayers: Function,
  fetchPlayerFacets: Function,
  updateAvailablePlayersFilter: Function,
  updateAvailablePlayersSort: Function,
  updateAvailablePlayersPage: Function,
  userCanPick: boolean,
  nextDraftPickId?: string,
  updateDraftPick: Function,
  submitting: boolean
}

const AvailablePlayersTable = (props: Props) => {
  const {
    players: { data: players, facets = {}, meta: { total } },
    fetchAvailablePlayers,
    fetchPlayerFacets,
    updateAvailablePlayersFilter,
    updateAvailablePlayersSort,
    updateAvailablePlayersPage,
    updateDraftPick,
    userCanPick,
    nextDraftPickId,
    submitting
  } = props

  useEffect(
    () => {
      fetchPlayerFacets()
    }, [fetchPlayerFacets]
  )

  const cells = [...PLAYERS_TABLE_CELLS]
  const draftPlayerColumn = {
    cellId: 'draftPlayer',
    label: '',
    toolTipLabel: '',
    sortParam: '',
    customRender: ({ id }: PlayerSummary, classes) => (
      <Button
        disabled={submitting}
        variant='contained'
        color='secondary'
        onClick={() => updateDraftPick({ nextDraftPickId, playerId: id })}
      >
        Draft
      </Button>
    )
  }

  if (nextDraftPickId && userCanPick) cells.push(draftPlayerColumn)

  return (
    <Fragment>
      <SearchListener fetchAction={fetchAvailablePlayers} initialFilterState={initialFilterState}>
        <SortTable
          collection={players}
          facets={facets}
          handleSortChange={(newSort) => updateAvailablePlayersSort(newSort)}
          handleFilterChange={(newFilter) => updateAvailablePlayersFilter(newFilter)}
          handleChangePage={(newOffset) => updateAvailablePlayersPage(newOffset)}
          cells={cells}
          total={total}
        />
      </SearchListener>
    </Fragment>
  )
}

export default AvailablePlayersTable
