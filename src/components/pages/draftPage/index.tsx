import { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { useParams, Outlet } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { makeStyles } from 'tss-react/mui'
import { Typography, Theme } from '@mui/material'

import { leagueActions } from 'state/league'
import { playersActions } from 'state/players'
import { draftPicksActions } from 'state/draftPicks'
import Tabs from 'components/common/tabs'
import UserCanPickAlert from './userCanPickAlert'
import DraftCompletedAlert from 'components/common/draftCompletedAlert'
import { LEAGUES_URL, cable } from 'utilities/constants'

import type { DraftPicksState } from 'state/draftPicks'
import type { PlayersState } from 'state/players'

import type { League } from 'types'

type Props = {
  league: League,
  players: PlayersState,
  draftPicks: DraftPicksState,
  fetchLeague: Function,
  fetchDraftPicks: Function,
  updateDraftPick: Function,
  updateDraftPicksFilter: Function,
  updateDraftPicksSort: Function,
  fetchAvailablePlayers: Function,
  updateAvailablePlayersFilter: Function,
  updateAvailablePlayersSort: Function,
  updateAvailablePlayersPage: Function,
  fetchDraftPickFacets: Function,
  fetchPlayerFacets: Function,
  fetchDraftPicksStatus: Function
}

type Tab = 'draftPicks' | 'availablePlayers'

export type DraftContext = {
  leagueId: string,
  setTab: (string: Tab) => void
} & Props

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  }
}))

export const TABS = [
  { label: 'Available Players', value: 'draft/availablePlayers', display: true },
  { label: 'Draft Picks', value: 'draft/draftPicks', display: true }
]

export const DraftPage = (props: Props) => {
  const {
    league,
    draftPicks,
    fetchLeague,
    updateDraftPick,
    fetchDraftPicksStatus
  } = props

  const { classes } = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [draftPickUpdatedAt, setDraftPickUpdatedAt] = useState(0)
  const { leagueId } = useParams()
  const [tab, setTab] = useState<Tab>('draftPicks')

  useEffect(
    () => {
      fetchLeague(leagueId)

    }, [fetchLeague, leagueId]
  )

  useEffect(
    () => {
      fetchDraftPicksStatus(leagueId)
    }, [fetchDraftPicksStatus, leagueId]
  )

  const handleReceived = useCallback(
    ({ updatedAt, message }) => {
      if (updatedAt <= draftPickUpdatedAt) return
      fetchDraftPicksStatus(leagueId)
      enqueueSnackbar(message, { variant: 'success' })
      setDraftPickUpdatedAt(updatedAt)
    }, [leagueId, fetchDraftPicksStatus, draftPickUpdatedAt, enqueueSnackbar]
  )

  useEffect(
    () => {
      let isActive = true

      cable.subscriptions.create(
        { channel: 'DraftPicksChannel', league_id: leagueId },
        { received: received => { if (isActive) handleReceived(received) } }
      )

      return () => { isActive = false }
    }, [handleReceived, leagueId]
  )

  const { draftFinished, errors } = draftPicks

  useEffect(
    () => {
      errors.forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

  if (!leagueId) return null
  if (!league) return null

  const { name } = league
  const key = `${leagueId}-${draftPickUpdatedAt}`

  const value: DraftContext = {
    ...props,
    leagueId,
    setTab
  }

  return (
    <div data-testid='DraftPage'>
      <Typography variant='h4' className={classes.title}>
        {name} Draft
      </Typography>
      <Tabs
        key={leagueId}
        currentTab={`draft/${tab}`}
        tabs={TABS}
        url={LEAGUES_URL}
        id={leagueId}
        titleSubstr={`${name} - Draft`}
      />
      <UserCanPickAlert
        leagueId={leagueId}
        draftPicks={draftPicks}
        updateDraftPick={updateDraftPick}
      />
      <DraftCompletedAlert
        substr='draft'
        showAlert={draftFinished}
      />
      <Outlet key={key} context={value} />
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    league: { data: league },
    draftPicks,
    players
  } = state

  return {
    players,
    league,
    draftPicks
  }
}

const matchDispatchToProps = {
  fetchLeague: leagueActions.fetchLeague,
  fetchDraftPicks: draftPicksActions.fetchDraftPicks,
  fetchDraftPickFacets: draftPicksActions.fetchDraftPickFacets,
  updateDraftPick: draftPicksActions.updateDraftPick,
  updateDraftPicksSort: draftPicksActions.updateSort,
  updateDraftPicksFilter: draftPicksActions.updateFilter,
  fetchAvailablePlayers: leagueActions.fetchAvailablePlayers,
  updateAvailablePlayersSort: leagueActions.updateAvailablePlayersSort,
  updateAvailablePlayersPage: leagueActions.updateAvailablePlayersPage,
  updateAvailablePlayersFilter: leagueActions.updateAvailablePlayersFilter,
  fetchPlayerFacets: playersActions.fetchFacets,
  fetchDraftPicksStatus: draftPicksActions.fetchDraftPicksStatus
}


export default connect(mapStateToProps, matchDispatchToProps)(DraftPage)
