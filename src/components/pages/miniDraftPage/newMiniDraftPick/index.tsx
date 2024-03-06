import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import ListPositionsTable from 'components/pages/fplTeamPage/listPositionsTable'
import OutListPosition from 'components/pages/fplTeamPage/outListPosition'
import TradeablePlayersTable from 'components/pages/fplTeamPage/tradeablePlayersTable'

import type { MiniDraftContext } from '..'

const NewMiniDraftPick = () => {
  const {
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
    createMiniDraftPick,
    miniDraftPicks,
    setTab
  } = useOutletContext<MiniDraftContext>()
  const { enqueueSnackbar } = useSnackbar()
  const { errors, submitting, fplTeamListId, canMakeMiniDraftPick } = miniDraftPicks
  const isWaiver = false
  const tab = 'tradeableListPositions'

  useEffect(
    () => {
      setTab(tab)
    }, []
  )

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
    <div data-testid='NewMiniDraftPick'>
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
    </div>
  )
}

export default NewMiniDraftPick
