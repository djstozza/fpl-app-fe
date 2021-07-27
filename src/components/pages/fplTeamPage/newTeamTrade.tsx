import { Fragment, useEffect } from 'react'
import { useSnackbar } from 'notistack'

import ListPositionsTable from './listPositionsTable'
import OutListPosition from './outListPosition'
import TradeableListPositionsTable from './tradeableListPositionsTable'
import {
  FPL_TEAMS_URL
} from 'utilities/constants'

import type { ListPositionState } from 'state/listPosition'
import type { FplTeamListState } from 'state/fplTeamList'
import type { InterTeamTradeGroupsState } from 'state/interTeamTradeGroups'
import type { TradesState } from 'state/trades'
import type { FplTeamList, ListPosition } from 'types'

type Props = {
  isOwner: boolean,
  fplTeamList: FplTeamListState,
  currentFplTeamList?: FplTeamList,
  fetchListPositions: Function,
  deadline?: Date,
  outListPosition?: ListPosition,
  setOutListPosition: Function,
  fetchTradeableListPositions: Function,
  listPosition: ListPositionState,
  createInterTeamTradeGroup: Function,
  selectedFplTeamListId?: string,
  interTeamTradeGroups: InterTeamTradeGroupsState,
  updateTradeableListPositionsFilter: Function,
  updateTradeableListPositionsSort: Function,
  fetchTradeableListPositionFacets: Function
}

const NewTeamTrade = (props: Props) => {
  const {
    isOwner,
    currentFplTeamList,
    fplTeamList: { listPositions },
    fetchListPositions,
    deadline,
    outListPosition,
    setOutListPosition,
    listPosition,
    createInterTeamTradeGroup,
    fetchTradeableListPositions,
    interTeamTradeGroups: { errors, submitting },
    updateTradeableListPositionsSort,
    updateTradeableListPositionsFilter,
    fetchTradeableListPositionFacets
  } = props
  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      if (!currentFplTeamList) return

      fetchListPositions(currentFplTeamList.id)
    }, [fetchListPositions, currentFplTeamList]
  )

  useEffect(
    () => {
      (errors).forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

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
        createInterTeamTradeGroup={createInterTeamTradeGroup}
        updateTradeableListPositionsFilter={updateTradeableListPositionsFilter}
        updateTradeableListPositionsSort={updateTradeableListPositionsSort}
        fetchTradeableListPositionFacets={fetchTradeableListPositionFacets}
      />
    }

    </Fragment>
  )
}

export default NewTeamTrade