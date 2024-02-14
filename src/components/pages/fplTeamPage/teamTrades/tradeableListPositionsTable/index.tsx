import { useEffect, useState, Fragment } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from '@mui/material'

import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/listPosition/reducer'
import SearchListener from 'components/common/searchListener'
import { listPositionTableCells } from '../../listPositionsTable'
import Link from 'components/common/link'
import {
  FPL_TEAMS_URL
} from 'utilities/constants'

import type { ListPositionState } from 'state/listPosition'
import type { ListPosition, CellHash, InterTeamTradeGroup } from 'types'

type Props = {
  isOwner: boolean,
  deadline?: Date,
  listPosition: ListPositionState,
  outListPosition?: ListPosition,
  fetchTradeableListPositions: Function,
  submitAction: Function,
  updateTradeableListPositionsFilter: Function,
  updateTradeableListPositionsSort: Function,
  fetchTradeableListPositionFacets: Function,
  submitting?: boolean,
  interTeamTradeGroup?: InterTeamTradeGroup
}

const TradeableListPositionsTable = (props: Props) => {
  const {
    isOwner,
    listPosition: { tradeableListPositions, facets, fetching },
    outListPosition,
    fetchTradeableListPositions,
    submitAction,
    deadline,
    updateTradeableListPositionsFilter,
    updateTradeableListPositionsSort,
    fetchTradeableListPositionFacets,
    submitting,
    interTeamTradeGroup
  } = props
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inListPosition, setInListPosition] = useState<undefined | ListPosition>()

  useEffect(
    () => {
      fetchTradeableListPositionFacets()
    }, [fetchTradeableListPositionFacets]
  )

  if (!outListPosition) return null

  const { player: { firstName: outFirstName, lastName: outLastName } } = outListPosition
  const { player: { firstName: inFirstName = '', lastName: inLastName = '' } = {} } = inListPosition || {}

  const handleOpenDialog = (inListPosition) => {
    setInListPosition(inListPosition)
    setDialogOpen(true)
  }

  const handleConfirm = () => {
    setDialogOpen(false)
    submitAction(inListPosition)
    setInListPosition(undefined)
  }

  const cells: CellHash = listPositionTableCells()
  cells['lastName'].sortParam = 'lastName'
  cells['team'] = {
    ...cells['team'],
    filterParam: 'team_id',
    sortParam: 'teams.shortName'
  }
  cells['fplTeam'] = {
    cellId: 'fplTeams',
    label: 'FTN',
    toolTipLabel: 'Fpl Team Name',
    sortParam: 'fplTeams.name',
    filterParam: 'fpl_team_id',
    customRender: ({ fplTeam: { id, name } }: ListPosition) => (
      <Link to={`${FPL_TEAMS_URL}/${id}`} >
        {name}
      </Link>
    )
  }

  delete cells['role']
  const tradeInColumn = {
    cellId: 'tradeIn',
    label: '',
    toolTipLabel: '',
    sortParam: '',
    customRender: (listPosition: ListPosition, classes) => (
      <Fragment>
        <Button
          className={classes.noWrap}
          variant='contained'
          color='secondary'
          onClick={() => handleOpenDialog(listPosition)}

        >
          Trade In
        </Button>
      </Fragment>
    )
  }


  if (isOwner && deadline) cells['tradeInColumn'] = tradeInColumn
  const { inFplTeamListId, trades = [] } = interTeamTradeGroup || {}
  const excludedPlayerIds = trades.map(({ inPlayer: { id } }) => id)

  initialFilterState.filter = {
    ...initialFilterState.filter,
    inFplTeamListId,
    excludedPlayerIds
  }

  if (!interTeamTradeGroup) {
    delete initialFilterState.filter['inFplTeamListId']
    delete initialFilterState.filter['excludedPlayerIds']
  }

  return (
    <Fragment>
      <SearchListener fetchAction={fetchTradeableListPositions} initialFilterState={initialFilterState}>
        <SortTable
          collection={tradeableListPositions}
          cells={Object.values(cells)}
          facets={facets}
          handleSortChange={(newSort) => updateTradeableListPositionsSort(newSort)}
          handleFilterChange={(newFilter) => updateTradeableListPositionsFilter(newFilter)}
          fetching={fetching}
          name='tradeable list positions'
        />
      </SearchListener>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>
          Confirm trade
        </DialogTitle>
        <DialogContent>
          <div>
            Out: {outFirstName} {outLastName}
          </div>
          <div>
            In: {inFirstName} {inLastName}
          </div>
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

export default TradeableListPositionsTable
