import { useEffect, useState, Fragment } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from '@mui/material'

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
  submitting: boolean,
  submitAction: Function
}

const TradeablePlayersTable = (props: Props) => {
  const {
    isOwner,
    isWaiver,
    players: { data: players, facets = {}, meta: { total }, fetching },
    outListPosition,
    fetchTradeablePlayers,
    fetchPlayerFacets,
    updateTradeablePlayersFilter,
    updateTradeablePlayersSort,
    updateTradeablePlayersPage,
    submitting,
    submitAction
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
  const { firstName: inFirstName = '', lastName: inLastName = '' } = player || {}

  const handleOpenDialog = (player) => {
    setPlayer(player)
    setDialogOpen(true)
  }

  const handleConfirm = () => {
    if (!player) return
    setDialogOpen(false)
    submitAction(player.id)
    setPlayer(undefined)
  }

  const cells: CellHash = playersTableCells()
  cells.positions.filterParam = ''
  cells.positions.sortParam = ''

  const tradeInColumn = {
    cellId: 'tradeIn',
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

  if (isOwner) cells['tradeInColumn'] = tradeInColumn

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
          fetching={fetching}
          name='tradeable players'
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
            In: {inFirstName} {inLastName}
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
            color='inherit'
            onClick={() => setDialogOpen(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
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
