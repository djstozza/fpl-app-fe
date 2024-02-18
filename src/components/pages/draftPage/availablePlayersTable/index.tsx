import { useEffect, useState, Fragment } from 'react'

import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/players/reducer'
import SearchListener from 'components/common/searchListener'
import { playersTableCells } from 'components/pages/playersPage'

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button
} from '@mui/material'

import type { DraftPicksState } from 'state/draftPicks'
import type { PlayersState } from 'state/players'
import type { PlayerSummary, CellHash } from 'types'

type Props = {
  players: PlayersState,
  draftPicks: DraftPicksState,
  fetchAvailablePlayers: Function,
  fetchPlayerFacets: Function,
  updateAvailablePlayersFilter: Function,
  updateAvailablePlayersSort: Function,
  updateAvailablePlayersPage: Function,
  updateDraftPick: Function
}

const AvailablePlayersTable = (props: Props) => {
  const {
    players: { data: players, facets = {}, meta: { total }, fetching },
    draftPicks,
    fetchAvailablePlayers,
    fetchPlayerFacets,
    updateAvailablePlayersFilter,
    updateAvailablePlayersSort,
    updateAvailablePlayersPage,
    updateDraftPick
  } = props

  const { userCanPick, nextDraftPickId, submitting } = draftPicks

  const [dialogOpen, setDialogOpen] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerId, setPlayerId] = useState('')

  useEffect(
    () => {
      fetchPlayerFacets()
    }, [fetchPlayerFacets]
  )

  const handleOpenDialog = (playerId, firstName, lastName) => {
    setPlayerId(playerId)
    setPlayerName(`${firstName} ${lastName}`)
    setDialogOpen(true)
  }

  const handleConfirmDraftPick = () => {
    setDialogOpen(false)
    updateDraftPick({ nextDraftPickId, playerId })
    setPlayerName('')
    setPlayerId('')
  }

  let cells: CellHash = playersTableCells()

  const draftPlayerColumn = {
    cellId: 'draftPlayer',
    label: '',
    toolTipLabel: '',
    sortParam: '',
    customRender: ({ id, firstName, lastName }: PlayerSummary) => (
      <Fragment>
        <Button
          disabled={submitting}
          variant='contained'
          color='secondary'
          onClick={() => handleOpenDialog(id, firstName, lastName)}
        >
          Draft
        </Button>
      </Fragment>
    )
  }

  if (nextDraftPickId && userCanPick) cells = { ...cells, draftPlayerColumn }

  return (
    <Fragment>
      <SearchListener fetchAction={fetchAvailablePlayers} initialFilterState={initialFilterState}>
        <SortTable
          collection={players}
          facets={facets}
          handleSortChange={(newSort) => updateAvailablePlayersSort(newSort)}
          handleFilterChange={(newFilter) => updateAvailablePlayersFilter(newFilter)}
          handleChangePage={(newOffset) => updateAvailablePlayersPage(newOffset)}
          cells={Object.values(cells)}
          total={total}
          fetching={fetching}
          name='available players'
        />
      </SearchListener>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogContent>
          Are you wish to draft {playerName}?
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={submitting}
            variant='contained'
            color='secondary'
            onClick={handleConfirmDraftPick}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default AvailablePlayersTable
