import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import ListPositionsTable from '../../listPositionsTable'
import OutListPosition from '../../outListPosition'
import TradeableListPositionsTable from '../tradeableListPositionsTable'

import type { FplTeamContext } from '../..'

const NewTeamTrade = () => {
  const {
    currentFplTeamList,
    fplTeam: { isOwner },
    fplTeamList: { listPositions, fetching, outListPosition },
    fetchListPositions,
    deadline,
    setOutListPosition,
    listPosition,
    createInterTeamTradeGroup,
    fetchTradeableListPositions,
    interTeamTradeGroups: { errors, submitting },
    updateTradeableListPositionsSort,
    updateTradeableListPositionsFilter,
    fetchTradeableListPositionFacets
  } = useOutletContext<FplTeamContext>()
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
    <div data-testid='NewTeamTrade'>
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
        submitAction={createInterTeamTradeGroup}
        updateTradeableListPositionsFilter={updateTradeableListPositionsFilter}
        updateTradeableListPositionsSort={updateTradeableListPositionsSort}
        fetchTradeableListPositionFacets={fetchTradeableListPositionFacets}
        submitting={submitting}
      />
    }
    </div>
  )
}

export default NewTeamTrade
