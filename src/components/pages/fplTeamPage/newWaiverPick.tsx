import { Fragment, useEffect } from 'react'
import { useSnackbar } from 'notistack'

import ListPositionsTable from './listPositionsTable'
import OutListPosition from './outListPosition'
import TradeablePlayersTable from './tradeablePlayersTable'

import type { PlayersState } from 'state/players'
import type { FplTeamListState } from 'state/fplTeamList'
import type { WaiverPicksState } from 'state/waiverPicks'
import type { TradesState } from 'state/trades'
import type { FplTeamList, ListPosition } from 'types'

type Props = {
  isOwner: boolean,
  isWaiver: boolean,
  fplTeamList: FplTeamListState,
  currentFplTeamList?: FplTeamList,
  fetchListPositions: Function,
  deadline?: Date,
  outListPosition?: ListPosition,
  setOutListPosition: Function,
  fetchTradeablePlayers: Function,
  updateTradeablePlayersFilter: Function,
  updateTradeablePlayersSort: Function,
  updateTradeablePlayersPage: Function,
  players: PlayersState,
  fetchPlayerFacets: Function,
  createWaiverPick: Function,
  selectedFplTeamListId?: string,
  waiverPicks: WaiverPicksState,
  trades: TradesState,
  createTrade: Function
}

const NewWaiverPick = (props: Props) => {
  const {
    isOwner,
    isWaiver,
    currentFplTeamList,
    fplTeamList: { listPositions },
    fetchListPositions,
    deadline,
    outListPosition,
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
    trades: { errors: tradeErrors, submitting: tradeSubmitting }
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
