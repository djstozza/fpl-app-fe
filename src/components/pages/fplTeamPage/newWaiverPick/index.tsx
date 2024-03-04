import { Fragment, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import ListPositionsTable from '../listPositionsTable'
import OutListPosition from '../outListPosition'
import TradeablePlayersTable from '../tradeablePlayersTable'

import type { FplTeamContext } from '..'

const NewWaiverPick = () => {
  const {
    isWaiver,
    currentFplTeamList,
    fplTeam: { isOwner },
    fplTeamList: { listPositions, fetching, outListPosition },
    fetchListPositions,
    deadline,
    setOutListPosition,
    fetchTradeablePlayers,
    updateTradeablePlayersSort,
    updateTradeablePlayersFilter,
    updateTradeablePlayersPage,
    players,
    fetchPlayerFacets,
    createWaiverPick,
    createTrade,
    waiverPicks: { errors: waiverErrors, submitting: waiverPickSubmitting },
    trades: { errors: tradeErrors, submitting: tradeSubmitting },
    setTab,
    setAction
  } = useOutletContext<FplTeamContext>()
  const { enqueueSnackbar } = useSnackbar()
  const tab = isWaiver ? 'waiverPicks' : 'trades'
  const action = 'new'
  
  useEffect(() => {
    setTab(tab)
    setAction(action)
  })

  useEffect(
    () => {
      if (!currentFplTeamList) return

      fetchListPositions(currentFplTeamList.id)
    }, [fetchListPositions, currentFplTeamList]
  )

  useEffect(
    () => {
      (isWaiver ? waiverErrors : tradeErrors).forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, isWaiver, waiverErrors, tradeErrors]
  )

  if (!listPositions.length) return null

  return (
    <Fragment>
    {
      !outListPosition &&
      <ListPositionsTable
        listPositions={listPositions}
        isOwner={isOwner}
        isWaiver={isWaiver}
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
      <TradeablePlayersTable
        isOwner={isOwner}
        isWaiver={isWaiver}
        outListPosition={outListPosition}
        fetchTradeablePlayers={fetchTradeablePlayers}
        updateTradeablePlayersFilter={updateTradeablePlayersFilter}
        updateTradeablePlayersSort={updateTradeablePlayersSort}
        updateTradeablePlayersPage={updateTradeablePlayersPage}
        players={players}
        fetchPlayerFacets={fetchPlayerFacets}
        submitting={isWaiver ? waiverPickSubmitting : tradeSubmitting}
        submitAction={isWaiver ? createWaiverPick : createTrade}
      />
    }
    </Fragment>
  )
}

export default NewWaiverPick
