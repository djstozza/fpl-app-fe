import { useEffect, useState, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { makeStyles } from 'tss-react/mui';
import {
  Typography,
  Theme
} from '@mui/material'

import { leagueActions } from 'state/league'
import { playersActions } from 'state/players'
import { miniDraftPicksActions } from 'state/miniDraftPicks'
import { fplTeamListActions } from 'state/fplTeamList'
import Tabs from 'components/common/tabs'
import MiniDraftPicksTable from './miniDraftPicksTable'
import NewMiniDraftPick from './newMiniDraftPick'
import UserCanPickAlert from './userCanPickAlert'
import DraftCompletedAlert from 'components/common/draftCompletedAlert'
import { LEAGUES_URL, cable } from 'utilities/constants'

import type { FplTeamListState } from 'state/fplTeamList'
import type { MiniDraftPicksState } from 'state/miniDraftPicks'
import type { PlayersState } from 'state/players'

import type { League } from 'types'

type Props = {
  league: League,
  players: PlayersState,
  miniDraftPicks: MiniDraftPicksState,
  fetchLeague: Function,
  fetchMiniDraftPicks: Function,
  createMiniDraftPick: Function,
  updateMiniDraftPicksFilter: Function,
  updateMiniDraftPicksSort: Function,
  fetchMiniDraftPickFacets: Function,
  fetchPlayerFacets: Function,
  fetchMiniDraftPicksStatus: Function,
  fetchTradeablePlayers: Function,
  updateTradeablePlayersSort: Function,
  updateTradeablePlayersFilter: Function,
  updateTradeablePlayersPage: Function,
  passMiniDraftPick: Function,
  fetchListPositions: Function,
  fplTeamList: FplTeamListState,
  setOutListPosition: Function,
  match: { params: { leagueId: string, tab: string } }
}

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  }
}))

const TABS = [
  { label: 'Tradeable List Positions', value: 'miniDraft/tradeableListPositions', display: true },
  { label: 'Mini Draft Picks', value: 'miniDraft/miniDraftPicks', display: true }
]

export const MiniDraftPage = (props: Props) => {
  const {
    league,
    miniDraftPicks,
    players,
    fetchLeague,
    fetchMiniDraftPicks,
    fetchMiniDraftPickFacets,
    updateMiniDraftPicksSort,
    updateMiniDraftPicksFilter,
    fetchPlayerFacets,
    createMiniDraftPick,
    fetchMiniDraftPicksStatus,
    fetchTradeablePlayers,
    updateTradeablePlayersSort,
    updateTradeablePlayersFilter,
    updateTradeablePlayersPage,
    passMiniDraftPick,
    fetchListPositions,
    fplTeamList,
    setOutListPosition,
    match: { params: { leagueId, tab = 'miniDraftPicks' } }
  } = props

  const { classes } = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [miniDraftPickUpdatedAt, setMiniDraftPickUpdatedAt] = useState(0)
  const [deadline, setDeadline] = useState<Date|undefined>()

  const { outListPosition } = fplTeamList
  const { round: { waiverDeadline } = {}, fplTeamListId, miniDraftFinished } = miniDraftPicks

  useEffect(
    () => {
      if (!waiverDeadline) return
      const deadlineTimeAsTime = new Date(waiverDeadline)

      if (new Date() > deadlineTimeAsTime) return setDeadline(undefined)

      setDeadline(new Date(deadlineTimeAsTime))
    }, [waiverDeadline, setDeadline]
  )

  useEffect(
    () => {
      if (!fplTeamListId) return

      fetchListPositions(fplTeamListId)
    }, [fetchListPositions, fplTeamListId]
  )

  useEffect(
    () => {
      fetchLeague(leagueId)
    }, [fetchLeague, leagueId]
  )

  useEffect(
    () => {
      fetchMiniDraftPicksStatus(leagueId)
    }, [fetchMiniDraftPicksStatus, leagueId]
  )

  const handleReceived = useCallback(
    ({ updatedAt, message }) => {
      if (updatedAt <= miniDraftPickUpdatedAt) return
      fetchMiniDraftPicksStatus(leagueId)
      enqueueSnackbar(message, { variant: 'success' })
      setMiniDraftPickUpdatedAt(updatedAt)
    }, [leagueId, fetchMiniDraftPicksStatus, miniDraftPickUpdatedAt, enqueueSnackbar]
  )

  useEffect(
    () => {
      let isActive = true

      cable.subscriptions.create(
        { channel: 'MiniDraftPicksChannel', league_id: leagueId },
        { received: received  => { if (isActive) handleReceived(received) } }
      )

      return () => { isActive = false }
    }, [handleReceived, leagueId]
  )

  const { errors } = miniDraftPicks

  useEffect(
    () => {
      errors.forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

  if (!league) return null

  const { name } = league
  const key = `${leagueId}-${miniDraftPickUpdatedAt}`

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {name} Mini Draft
      </Typography>
      <Tabs
        key={leagueId}
        currentTab={`miniDraft/${tab}`}
        tabs={TABS}
        url={LEAGUES_URL}
        id={leagueId}
        titleSubstr={`${name} - Mini Draft`}
      />
      <UserCanPickAlert
        leagueId={leagueId}
        deadline={deadline}
        miniDraftPicks={miniDraftPicks}
        passMiniDraftPick={passMiniDraftPick}
      />
      <DraftCompletedAlert
        substr='mini draft'
        showAlert={!deadline || miniDraftFinished}
      />
      <Routes>
        <Route
          exact
          path={[
            `${LEAGUES_URL}/:leagueId/miniDraft`,
            `${LEAGUES_URL}/:leagueId/miniDraft/miniDraftPicks`
          ]}
        >
          <MiniDraftPicksTable
            key={key}
            miniDraftPicks={miniDraftPicks}
            fetchMiniDraftPicks={fetchMiniDraftPicks}
            updateMiniDraftPicksSort={updateMiniDraftPicksSort}
            updateMiniDraftPicksFilter={updateMiniDraftPicksFilter}
            fetchMiniDraftPickFacets={fetchMiniDraftPickFacets}
          />
        </Route>
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/miniDraft/tradeableListPositions`}
        >
          <NewMiniDraftPick
            fetchListPositions={fetchListPositions}
            fplTeamList={fplTeamList}
            isWaiver={false}
            deadline={deadline}
            outListPosition={outListPosition}
            setOutListPosition={setOutListPosition}
            fetchTradeablePlayers={fetchTradeablePlayers}
            updateTradeablePlayersFilter={updateTradeablePlayersFilter}
            updateTradeablePlayersSort={updateTradeablePlayersSort}
            updateTradeablePlayersPage={updateTradeablePlayersPage}
            players={players}
            fetchPlayerFacets={fetchPlayerFacets}
            miniDraftPicks={miniDraftPicks}
            createMiniDraftPick={createMiniDraftPick}
          />
        </Route>
      </Routes>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    league: { data: league },
    miniDraftPicks,
    fplTeamList,
    players
  } = state

  return {
    players,
    league,
    fplTeamList,
    miniDraftPicks
  }
}

const matchDispatchToProps = {
  fetchLeague: leagueActions.fetchLeague,
  fetchMiniDraftPicks: miniDraftPicksActions.fetchMiniDraftPicks,
  fetchMiniDraftPickFacets: miniDraftPicksActions.fetchMiniDraftPickFacets,
  createMiniDraftPick: miniDraftPicksActions.createMiniDraftPick,
  updateMiniDraftPicksSort: miniDraftPicksActions.updateSort,
  updateMiniDraftPicksFilter: miniDraftPicksActions.updateFilter,
  fetchPlayerFacets: playersActions.fetchFacets,
  fetchMiniDraftPicksStatus: miniDraftPicksActions.fetchMiniDraftPicksStatus,
  fetchTradeablePlayers: miniDraftPicksActions.fetchTradeablePlayers,
  updateTradeablePlayersSort: miniDraftPicksActions.updateTradeablePlayersSort,
  updateTradeablePlayersFilter: miniDraftPicksActions.updateTradeablePlayersFilter,
  updateTradeablePlayersPage: miniDraftPicksActions.updateTradeablePlayersPage,
  passMiniDraftPick: miniDraftPicksActions.passMiniDraftPick,
  fetchListPositions: fplTeamListActions.fetchListPositions,
  setOutListPosition: fplTeamListActions.setOutListPosition
}


export default connect(mapStateToProps, matchDispatchToProps)(MiniDraftPage)
