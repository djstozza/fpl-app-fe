import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import ListPositionsTable from '../../listPositionsTable'
import OutListPosition from '../../outListPosition'
import TradeableListPositionsTable from '../tradeableListPositionsTable'
import { TITLE } from 'utilities/constants'

import type { FplTeamContext } from '../..'

const AddPlayer = () => {
  const {
    currentFplTeamList,
    interTeamTradeGroup,
    fetchInterTeamTradeGroup,
    teamTradeId,
    selectedFplTeamListId,
    fplTeam: { isOwner, name },
    fplTeamList: { listPositions, fetching, outListPosition },
    fetchListPositions,
    deadline,
    setOutListPosition,
    listPosition,
    fetchTradeableListPositions,
    updateTradeableListPositionsFilter,
    updateTradeableListPositionsSort,
    fetchTradeableListPositionFacets,
    addToInterTeamTradeGroup,
    interTeamTradeGroups: { errors, submitting },
  } = useOutletContext<FplTeamContext>()

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
    <div data-testid='AddPlayer'>
      {
        !outListPosition &&
        <ListPositionsTable
          listPositions={listPositions}
          isOwner={isOwner}
          deadline={deadline}
          setOutListPosition={setOutListPosition}
          fetching={fetching}
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
    </div>
  )
}

export default AddPlayer
