import { Fragment, useEffect } from 'react'
import { useSnackbar } from 'notistack'

import ListPositionsTable from 'components/pages/fplTeamPage/listPositionsTable'
import OutListPosition from 'components/pages/fplTeamPage/outListPosition'
import TradeablePlayersTable from 'components/pages/fplTeamPage/tradeablePlayersTable'

import type { PlayersState } from 'state/players'
import type { FplTeamListState } from 'state/fplTeamList'
import type { MiniDraftPicksState } from 'state/miniDraftPicks'
import type { ListPosition } from 'types'

type Props = {
  isWaiver: boolean,
  fplTeamList: FplTeamListState,
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
  miniDraftPicks: MiniDraftPicksState,
  createMiniDraftPick: Function
}

const NewMiniDraftPick = (props: Props) => {
  const {
    isWaiver,
    fplTeamList: { listPositions, fetching },
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
    createMiniDraftPick,
    miniDraftPicks
  } = props
  const { enqueueSnackbar } = useSnackbar()
  const { errors, submitting, fplTeamListId, canMakeMiniDraftPick } = miniDraftPicks

  useEffect(
    () => {
      if (!fplTeamListId) return

      fetchListPositions(fplTeamListId)
    }, [fetchListPositions, fplTeamListId]
  )

  useEffect(
    () => {
      errors.forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

  if (!listPositions.length) return null

  return (
    <Fragment>
    {
      !outListPosition &&
      <ListPositionsTable
        listPositions={listPositions}
        isOwner={canMakeMiniDraftPick}
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
        isOwner={canMakeMiniDraftPick}
        isWaiver={isWaiver}
        outListPosition={outListPosition}
        fetchTradeablePlayers={fetchTradeablePlayers}
        updateTradeablePlayersFilter={updateTradeablePlayersFilter}
        updateTradeablePlayersSort={updateTradeablePlayersSort}
        updateTradeablePlayersPage={updateTradeablePlayersPage}
        players={players}
        fetchPlayerFacets={fetchPlayerFacets}
        submitting={submitting}
        submitAction={createMiniDraftPick}
      />
    }
    </Fragment>
  )
}

export default NewMiniDraftPick
