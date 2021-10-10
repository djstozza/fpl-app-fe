import { Fragment, useEffect } from 'react'
import { useSnackbar } from 'notistack'

import ListPositionsTable from '../../listPositionsTable'
import OutListPosition from '../../outListPosition'
import TradeableListPositionsTable from '../tradeableListPositionsTable'
import { TITLE } from 'utilities/constants'

import type { InterTeamTradeGroup, FplTeamList, ListPosition } from 'types'
import type { FplTeamListState } from 'state/fplTeamList'
import type { ListPositionState } from 'state/listPosition'
import type { InterTeamTradeGroupsState } from 'state/interTeamTradeGroups'

type Props = {
  isOwner: boolean,
  currentFplTeamList?: FplTeamList,
  interTeamTradeGroup: InterTeamTradeGroup,
  fetchInterTeamTradeGroup: Function,
  teamTradeId: string,
  selectedFplTeamListId?: string,
  outListPosition?: ListPosition,
  setOutListPosition: Function,
  fetchTradeableListPositions: Function,
  listPosition: ListPositionState,
  fetchListPositions: Function,
  deadline?: Date,
  fplTeamList: FplTeamListState,
  interTeamTradeGroups: InterTeamTradeGroupsState,
  updateTradeableListPositionsFilter: Function,
  updateTradeableListPositionsSort: Function,
  fetchTradeableListPositionFacets: Function,
  addToInterTeamTradeGroup: Function,
  name: string
}

const AddPlayer = (props: Props) => {
  const {
    isOwner,
    currentFplTeamList,
    interTeamTradeGroup,
    fetchInterTeamTradeGroup,
    teamTradeId,
    selectedFplTeamListId,
    fplTeamList: { listPositions },
    fetchListPositions,
    deadline,
    outListPosition,
    setOutListPosition,
    listPosition,
    fetchTradeableListPositions,
    updateTradeableListPositionsFilter,
    updateTradeableListPositionsSort,
    fetchTradeableListPositionFacets,
    addToInterTeamTradeGroup,
    interTeamTradeGroups: { errors, submitting },
    name
  } = props

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      if (!selectedFplTeamListId) return
      fetchInterTeamTradeGroup(selectedFplTeamListId, teamTradeId)
    }, [fetchInterTeamTradeGroup, selectedFplTeamListId, teamTradeId]
  )

  useEffect(
    () => {
      if (!currentFplTeamList || !interTeamTradeGroup) return

      fetchListPositions(currentFplTeamList.id, interTeamTradeGroup)
    }, [fetchListPositions, currentFplTeamList, interTeamTradeGroup]
  )

  useEffect(
    () => {
      (errors).forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

  document.title = `${TITLE} - ${name} - Team Trades - Add Player`

  if (!listPositions.length) return null

  return (
    <Fragment>
      {
        !outListPosition &&
        <ListPositionsTable
          listPositions={listPositions}
          isOwner={isOwner}
          deadline={deadline}
          setOutListPosition={setOutListPosition}
        />
      }
      <OutListPosition
        outListPosition={outListPosition}
        setOutListPosition={setOutListPosition}
      />
      {
        Boolean(outListPosition) &&
        <TradeableListPositionsTable
          isOwner={isOwner}
          deadline={deadline}
          outListPosition={outListPosition}
          fetchTradeableListPositions={fetchTradeableListPositions}
          listPosition={listPosition}
          submitAction={addToInterTeamTradeGroup}
          updateTradeableListPositionsFilter={updateTradeableListPositionsFilter}
          updateTradeableListPositionsSort={updateTradeableListPositionsSort}
          fetchTradeableListPositionFacets={fetchTradeableListPositionFacets}
          interTeamTradeGroup={interTeamTradeGroup}
          submitting={submitting}
        />
      }
    </Fragment>
  )
}

export default AddPlayer
