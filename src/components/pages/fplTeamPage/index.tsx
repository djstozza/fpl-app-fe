import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, Outlet } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { Typography, Theme } from '@mui/material'
import { capitalize } from 'lodash'
import pluralize from 'pluralize'

import Tabs from 'components/common/tabs'
import { fplTeamActions } from 'state/fplTeam'
import { fplTeamListsActions } from 'state/fplTeamLists'
import { fplTeamListActions } from 'state/fplTeamList'
import { listPositionActions } from 'state/listPosition'
import { playersActions } from 'state/players'
import { waiverPicksActions } from 'state/waiverPicks'
import { tradesActions } from 'state/trades'
import { interTeamTradeGroupActions } from 'state/interTeamTradeGroup'
import { interTeamTradeGroupsActions } from 'state/interTeamTradeGroups'
import {
  FPL_TEAMS_URL
} from 'utilities/constants'
import FplTeamAlert from './fplTeamAlert'

import type { FplTeam, FplTeamList, InterTeamTradeGroup, Error } from 'types'
import type { FplTeamListState } from 'state/fplTeamList'
import type { FplTeamListsState } from 'state/fplTeamLists'
import type { ListPositionState } from 'state/listPosition'
import type { PlayersState } from 'state/players'
import type { WaiverPicksState } from 'state/waiverPicks'
import type { TradesState } from 'state/trades'
import type { InterTeamTradeGroupsState } from 'state/interTeamTradeGroups'

type Props = {
  fplTeam: FplTeam,
  errors: Error[],
  submitting: boolean,
  fetchFplTeam: Function,
  updateFplTeam: Function,
  fplTeamLists: FplTeamListsState,
  fplTeamList: FplTeamListState,
  listPosition: ListPositionState,
  fetchFplTeamLists: Function,
  fetchFplTeamList: Function,
  fetchValidSubstitutions: Function,
  processSubstitution: Function,
  clearValidSubstitutions: Function,
  fetchListPositions: Function,
  setOutListPosition: Function,
  fetchTradeablePlayers: Function,
  updateTradeablePlayersFilter: Function,
  updateTradeablePlayersSort: Function,
  updateTradeablePlayersPage: Function,
  players: PlayersState,
  fetchPlayerFacets: Function,
  fetchWaiverPicks: Function,
  createWaiverPick: Function,
  waiverPicks: WaiverPicksState,
  changeWaiverPickOrder: Function,
  createTrade: Function,
  fetchTrades: Function,
  trades: TradesState,
  fetchTradeableListPositions: Function,
  interTeamTradeGroups: InterTeamTradeGroupsState,
  createInterTeamTradeGroup: Function,
  updateTradeableListPositionsFilter: Function,
  updateTradeableListPositionsSort: Function,
  fetchTradeableListPositionFacets: Function,
  fetchInterTeamTradeGroups: Function,
  addToInterTeamTradeGroup: Function,
  cancelInterTeamTradeGroup: Function,
  submitInterTeamTradeGroup: Function,
  approveInterTeamTradeGroup: Function,
  declineInterTeamTradeGroup: Function,
  fetchInterTeamTradeGroup: Function,
  interTeamTradeGroup: InterTeamTradeGroup,
  removeTrade: Function
}

type Tab = 'details' | 'teamLists' | 'waiverPicks' | 'trades' | 'teamTrades'

export type FplTeamContext = {
  fplTeamId: string,
  fplTeamListId: string | undefined,
  teamTradeId: string | undefined,
  selectedFplTeamListId: string,
  currentFplTeamList: FplTeamList | undefined,
  deadline: Date | undefined,
  isWaiver: boolean,
  setTab: (tab: Tab) => void,
  setAction: (action?: string) => void
} & Props

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  }
}))

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  teamLists: {
    label: 'Lists',
    value: 'teamLists',

    display: true
  },
  waiverPicks: {
    label: 'Waiver',
    value: 'waiverPicks',
    display: true
  },
  trades: {
    label: 'Free',
    value: 'trades',
    display: true
  },
  teamTrades: {
    label: 'Trades',
    value: 'teamTrades',
    display: true
  }
}

export const FplTeamPage = (props: Props) => {
  const {
    fplTeam,
    fetchFplTeam,
    fplTeamLists,
    fplTeamList,
    fetchFplTeamLists,
    fetchFplTeamList,
    fetchListPositions,
    setOutListPosition
  } = props
  const { classes } = useStyles()
  const { fplTeamId, fplTeamListId, teamTradeId } = useParams()
  const [deadlineTimeAsTime, setDeadlineTimeAsTime] = useState<Date|undefined>()
  const [waiverDeadlineAsTime, setWaiverDeadlineAsTime] = useState<Date|undefined>()
  const [deadline, setDeadline] = useState<Date|undefined>()
  const [isWaiver, setIsWaiver] = useState(false)
  const [tab, setTab] = useState<Tab>('details')
  const [action, setAction] = useState<string>()

  const sanitizedFplTeamListId = (fplTeamListId || '').match(/^\d+$/) ? fplTeamListId : undefined
  const currentFplTeamList = fplTeamLists.data.find(({ round: { current } }) => current)
  const currentFplTeamListId = (currentFplTeamList || {}).id
  const lastFplTeamListId = fplTeamLists.data[fplTeamLists.data.length - 1]?.id
  const getSelectedFplteamListId = () => sanitizedFplTeamListId || currentFplTeamListId || lastFplTeamListId

  const selectedFplTeamListId = getSelectedFplteamListId()

  useEffect(
    () => {
      fetchFplTeam(fplTeamId)
    }, [fetchFplTeam, fplTeamId]
  )

  useEffect(
    () => {
      fetchFplTeamLists(fplTeamId)
    }, [fetchFplTeamLists, fplTeamId]
  )

  useEffect(
    () => {
      if (!currentFplTeamList) return
      const { round: { deadlineTime, waiverDeadline } } = currentFplTeamList

      setDeadlineTimeAsTime(new Date(deadlineTime))
      setWaiverDeadlineAsTime(new Date(waiverDeadline))
    }, [currentFplTeamList, setDeadlineTimeAsTime, setWaiverDeadlineAsTime]
  )

  useEffect(
    () => {
      if (!selectedFplTeamListId) return

      fetchFplTeamList(selectedFplTeamListId)
      fetchListPositions(selectedFplTeamListId)
    }, [fetchFplTeamList, fetchListPositions, selectedFplTeamListId]
  )

  useEffect(
    () => {
      if (!deadlineTimeAsTime || !waiverDeadlineAsTime) return
      if (new Date() > deadlineTimeAsTime) return setDeadline(undefined)

      const waiverDeadlinePassed = new Date() > waiverDeadlineAsTime

      setDeadline(waiverDeadlinePassed ? deadlineTimeAsTime : waiverDeadlineAsTime)
      setIsWaiver(!waiverDeadlinePassed)
    }, [deadlineTimeAsTime, waiverDeadlineAsTime, setDeadline, setIsWaiver]
  )

  if (!fplTeamId) return null
  if (!fplTeam) return null

  const { name, isOwner, league: { id: leagueId, showLiveColumns } } = fplTeam
  const { round: { name: roundName = '', miniDraft = false } = {} } = currentFplTeamList || {}
  const { data : { totalScore, round: { name: selectedRoundName = '' } = {} } = {} } = fplTeamList

  const extraTitleInfo = capitalize(action || roundName)

  TABS.teamLists['display'] = showLiveColumns
  TABS.waiverPicks['display'] = showLiveColumns && isOwner
  TABS.trades['display'] = showLiveColumns && isOwner
  TABS.teamTrades['display'] = showLiveColumns && isOwner
  TABS.waiverPicks['extraTitleInfo'] = extraTitleInfo
  TABS.teamLists['extraTitleInfo'] = extraTitleInfo
  TABS.trades['extraTitleInfo'] = extraTitleInfo
  TABS.teamTrades['extraTitleInfo'] = extraTitleInfo
  TABS.details['extraTitleInfo'] = capitalize(action)
  const tabsArr = Object.values(TABS)
  const showSelectedRoundNameTabs = tabsArr.map(({ value }) => {
    if (value === 'details') return null
    return value
  }).filter(Boolean)

  const value: FplTeamContext = {
    ...props,
    fplTeamId,
    fplTeamListId,
    teamTradeId,
    selectedFplTeamListId,
    currentFplTeamList,
    deadline,
    isWaiver,
    setTab,
    setAction
  }

  return (
    <div data-testid='FplTeamPage'>
      <Typography variant='h4' className={classes.title}>
        {name}
        {
          showSelectedRoundNameTabs.includes(tab) && selectedRoundName &&
          ` - ${selectedRoundName}`
        }
        {
          tab === 'teamLists' && Boolean(totalScore) &&
          ` - ${totalScore} ${pluralize('Point', totalScore)}`
        }
      </Typography>
      <Tabs
        currentTab={tab}
        tabs={tabsArr}
        url={FPL_TEAMS_URL}
        id={fplTeamId}
        titleSubstr={name}
      />
      <FplTeamAlert
        fplTeamId={fplTeamId}
        currentFplTeamList={currentFplTeamList}
        isWaiver={isWaiver}
        setIsWaiver={setIsWaiver}
        deadlineTimeAsTime={deadlineTimeAsTime}
        deadline={deadline}
        setDeadline={setDeadline}
        isOwner={isOwner}
        setOutListPosition={setOutListPosition}
        miniDraft={miniDraft}
        leagueId={leagueId}
      />
      <Outlet context={value} />
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    fplTeam: {
      data: fplTeam,
      errors,
      submitting
    },
    fplTeamLists,
    fplTeamList,
    interTeamTradeGroup: {
      data: interTeamTradeGroup
    },
    interTeamTradeGroups,
    listPosition,
    waiverPicks,
    players,
    trades
  } = state

  return {
    fplTeam,
    fplTeamLists,
    fplTeamList,
    errors,
    submitting,
    listPosition,
    players,
    waiverPicks,
    trades,
    interTeamTradeGroups,
    interTeamTradeGroup
  }
}

const matchDispatchToProps = {
  fetchFplTeam: fplTeamActions.fetchFplTeam,
  updateFplTeam: fplTeamActions.updateFplTeam,
  fetchFplTeamLists: fplTeamListsActions.fetchFplTeamLists,
  fetchFplTeamList: fplTeamListActions.fetchFplTeamList,
  fetchListPositions: fplTeamListActions.fetchListPositions,
  processSubstitution: fplTeamListActions.processSubstitution,
  fetchValidSubstitutions: listPositionActions.fetchValidSubstitutions,
  clearValidSubstitutions: listPositionActions.clearValidSubstitutions,
  setOutListPosition: fplTeamListActions.setOutListPosition,
  fetchTradeablePlayers: listPositionActions.fetchTradeablePlayers,
  updateTradeablePlayersSort: listPositionActions.updateTradeablePlayersSort,
  updateTradeablePlayersFilter: listPositionActions.updateTradeablePlayersFilter,
  updateTradeablePlayersPage: listPositionActions.updateTradeablePlayersPage,
  fetchPlayerFacets: playersActions.fetchFacets,
  fetchWaiverPicks: waiverPicksActions.fetchWaiverPicks,
  createWaiverPick: waiverPicksActions.createWaiverPick,
  changeWaiverPickOrder: waiverPicksActions.changeWaiverPickOrder,
  fetchTrades: tradesActions.fetchTrades,
  createTrade: tradesActions.createTrade,
  fetchTradeableListPositions: listPositionActions.fetchTradeableListPositions,
  updateTradeableListPositionsFilter: listPositionActions.updateTradeableListPositionsFilter,
  updateTradeableListPositionsSort: listPositionActions.updateTradeableListPositionsSort,
  createInterTeamTradeGroup: interTeamTradeGroupsActions.createInterTeamTradeGroup,
  fetchTradeableListPositionFacets: listPositionActions.fetchTradeableListPositionFacets,
  fetchInterTeamTradeGroups: interTeamTradeGroupsActions.fetchInterTeamTradeGroups,
  cancelInterTeamTradeGroup: interTeamTradeGroupsActions.cancelInterTeamTradeGroup,
  submitInterTeamTradeGroup: interTeamTradeGroupsActions.submitInterTeamTradeGroup,
  addToInterTeamTradeGroup: interTeamTradeGroupsActions.addToInterTeamTradeGroup,
  approveInterTeamTradeGroup: interTeamTradeGroupsActions.approveInterTeamTradeGroup,
  declineInterTeamTradeGroup: interTeamTradeGroupsActions.declineInterTeamTradeGroup,
  fetchInterTeamTradeGroup: interTeamTradeGroupActions.fetchInterTeamTradeGroup,
  removeTrade: interTeamTradeGroupsActions.removeTrade
}

export default connect(mapStateToProps, matchDispatchToProps)(FplTeamPage)
