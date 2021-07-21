import { useEffect, useState, Fragment } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from '@material-ui/core'

import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/players/reducer'
import SearchListener from 'components/common/searchListener'
import { playersTableCells } from 'components/pages/playersPage'

import type { PlayersState } from 'state/players'
import type { PlayerSummary, ListPosition, CellHash } from 'types'

type Props = {
  isOwner: boolean,
  isWaiver: boolean,
  players: PlayersState,
  outListPosition?: ListPosition,
  fetchTradeablePlayers: Function,
  fetchPlayerFacets: Function,
  updateTradeablePlayersFilter: Function,
  updateTradeablePlayersSort: Function,
  updateTradeablePlayersPage: Function,
  createWaiverPick: Function,
  submitting: boolean
}

const TradeablePlayersTable = (props: Props) => {
  const {
    isOwner,
    isWaiver,
    players: { data: players, facets = {}, meta: { total } },
    outListPosition,
    fetchTradeablePlayers,
    fetchPlayerFacets,
    updateTradeablePlayersFilter,
    updateTradeablePlayersSort,
    updateTradeablePlayersPage,
    createWaiverPick,
    submitting
  } = props
  const [dialogOpen, setDialogOpen] = useState(false)
  const [player, setPlayer] = useState<undefined | PlayerSummary>()

  useEffect(
    () => {
      fetchPlayerFacets()
    }, [fetchPlayerFacets]
  )

  if (!outListPosition) return null

  const { player: { firstName: outFirstName, lastName: outLastName } } = outListPosition

  const handleOpenDialog = (player) => {
    setPlayer(player)
    setDialogOpen(true)
  }

  const handleConfirmWaiverPick = () => {
    if (!player) return
    setDialogOpen(false)
    createWaiverPick(player.id)
    setPlayer(undefined)
  }

  const cells: CellHash = playersTableCells()
  cells.positions.filterParam = ''
  cells.positions.sortParam = ''

  const waiverPlayerColumn = {
    cellId: 'waiverPlayer',
    label: '',
    toolTipLabel: '',
    sortParam: '',
    customRender: (player: PlayerSummary, classes) => (
      <Fragment>
        <Button
          className={classes.noWrap}
          variant='contained'
          color='secondary'
          onClick={() => handleOpenDialog(player)}
          disabled={submitting}
        >
          {isWaiver ? 'Waiver' : 'Trade'} In
        </Button>
      </Fragment>
    )
  }


  if (isOwner) cells['waiverPlayerColumn'] = waiverPlayerColumn

  return (
    <Fragment>
      <SearchListener fetchAction={fetchTradeablePlayers} initialFilterState={initialFilterState}>
        <SortTable
          collection={players}
          facets={facets}
          handleSortChange={(newSort) => updateTradeablePlayersSort(newSort)}
          handleFilterChange={(newFilter) => updateTradeablePlayersFilter(newFilter)}
          handleChangePage={(newOffset) => updateTradeablePlayersPage(newOffset)}
          cells={Object.values(cells)}
          total={total}
        />
      </SearchListener>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>
          Confirm {isWaiver ? 'waiver pick' : 'trade'}
        </DialogTitle>
        <DialogContent>
          <div>
            Out: {outFirstName} {outLastName}
          </div>
          <div>
            In: {player?.firstName} {player?.lastName}
          </div>
          {
            Boolean(!isWaiver) &&
            <div>
              This trade cannot be reversed once confirmed
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='default'
            onClick={() => setDialogOpen(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmWaiverPick}
            variant='contained'
            color='secondary'
            disabled={submitting}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default TradeablePlayersTable
