import { useEffect, useState, Fragment } from 'react'
import { useOutletContext } from 'react-router-dom'

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

import type { DraftContext } from '..'
import type { PlayerSummary, CellHash } from 'types'

const AvailablePlayersTable = () => {
  const {
    players: { data: players, facets = {}, meta: { total }, fetching },
    draftPicks,
    fetchAvailablePlayers,
    fetchPlayerFacets,
    updateAvailablePlayersFilter,
    updateAvailablePlayersSort,
    updateAvailablePlayersPage,
    updateDraftPick,
    setTab
  } = useOutletContext<DraftContext>()

  const { userCanPick, nextDraftPickId, submitting } = draftPicks

  const [dialogOpen, setDialogOpen] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerId, setPlayerId] = useState('')

  const tab = 'availablePlayers'

  useEffect(() => {
    setTab(tab)
  }, [])

  useEffect(() => {
      fetchPlayerFacets()
  }, [fetchPlayerFacets])

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
    <div data-testid='AvailablePlayersTable'>
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
    </div>
  )
}

export default AvailablePlayersTable
