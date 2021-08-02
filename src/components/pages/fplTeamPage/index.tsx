import { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {
  Typography,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'

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
import FplTeamDetails from './fplTeamDetails'
import EditFplTeamForm from './editFplTeamForm'
import FplTeamListChart from './fplTeamListChart'
import FplTeamAlert from './fplTeamAlert'
import NewWaiverPick from './newWaiverPick'
import WaiverPicksTable from './waiverPicksTable'
import NewTeamTrade from './teamTrades/new'
import TeamTradeTabs from './teamTrades/tabs'
import AddPlayer from './teamTrades/addPlayer'

import type { FplTeam, InterTeamTradeGroup, Error } from 'types'
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
  removeTrade: Function,
  match: { params: { fplTeamId: string, tab: string, fplTeamListId: string, action: string, teamTradeId: string } }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  teamLists: {
    label: 'Team Lists',
    value: 'teamLists',
    matcher: /teamLists((\/\d+)?\/)?$/,
    display: true
  },
  waiverPicks: {
    label: 'Waiver Picks',
    value: 'waiverPicks',
    matcher: /(teamLists\/\d+\/)?waiverPicks/,
    display: true
  },
  trades: {
    label: 'Trades',
    value: 'trades',
    matcher: /(teamLists\/\d+\/)?trades/,
    display: true
  },
  teamTrades: {
    label: 'Team Trades',
    value: 'teamTrades',
    matcher: /(teamLists\/\d+\/)?teamTrades/,
    display: true
  }
}

const FplTeamPage = (props: Props) => {
  const {
    fplTeam,
    errors,
    submitting,
    fetchFplTeam,
    updateFplTeam,
    fplTeamLists,
    fplTeamList,
    listPosition,
    fetchFplTeamLists,
    fetchFplTeamList,
    fetchValidSubstitutions,
    processSubstitution,
    clearValidSubstitutions,
    fetchListPositions,
    setOutListPosition,
    fetchTradeablePlayers,
    updateTradeablePlayersSort,
    updateTradeablePlayersFilter,
    updateTradeablePlayersPage,
    players,
    fetchPlayerFacets,
    createWaiverPick,
    fetchWaiverPicks,
    waiverPicks,
    changeWaiverPickOrder,
    fetchTrades,
    createTrade,
    trades,
    fetchTradeableListPositions,
    createInterTeamTradeGroup,
    interTeamTradeGroups,
    updateTradeableListPositionsFilter,
    updateTradeableListPositionsSort,
    fetchTradeableListPositionFacets,
    fetchInterTeamTradeGroups,
    addToInterTeamTradeGroup,
    cancelInterTeamTradeGroup,
    submitInterTeamTradeGroup,
    approveInterTeamTradeGroup,
    declineInterTeamTradeGroup,
    fetchInterTeamTradeGroup,
    interTeamTradeGroup,
    removeTrade,
    match: { params: { fplTeamId, tab = 'details', fplTeamListId, action, teamTradeId } }
  } = props
  const classes = useStyles()
  const [deadlineTimeAsTime, setDeadlineTimeAsTime] = useState<Date|undefined>()
  const [waiverDeadlineAsTime, setWaiverDeadlineAsTime] = useState<Date|undefined>()
  const [deadline, setDeadline] = useState<Date|undefined>()
  const [isWaiver, setIsWaiver] = useState(false)
  const sanitizedFplTeamListId = (fplTeamListId || '').match(/^\d+$/) ? fplTeamListId : undefined

  const currentFplTeamList = fplTeamLists.data.find(({ round: { current } }) => current)
  const currentFplTeamListId = (currentFplTeamList || {}).id
  const lastFplTeamListId = fplTeamLists[fplTeamLists.data.length - 1]?.id
  const getSelectedFplteamListId = () => sanitizedFplTeamListId || currentFplTeamListId || lastFplTeamListId
  const selectedFplTeamListId = getSelectedFplteamListId()

  const { outListPosition } = fplTeamList

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

      setDeadline(new Date() > waiverDeadlineAsTime ? deadlineTimeAsTime : waiverDeadlineAsTime)
      setIsWaiver(!waiverDeadlinePassed)

    }, [deadlineTimeAsTime, waiverDeadlineAsTime, setDeadline, setIsWaiver]
  )

  if (!fplTeam) return null

  const { name, isOwner, league: { showLiveColumns } } = fplTeam

  TABS.teamLists['display'] = showLiveColumns
  TABS.waiverPicks['display'] = showLiveColumns && isOwner
  TABS.trades['display'] = showLiveColumns && isOwner
  TABS.teamTrades['display'] = showLiveColumns && isOwner

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {name}
      </Typography>
      <Tabs
        currentTab={tab}
        tabs={Object.values(TABS)}
        url={FPL_TEAMS_URL}
        id={fplTeamId}
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
      />
      <Switch>
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId`}
          render={() => (
            <FplTeamDetails
              fplTeam={fplTeam}
            />
          )}
        />
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId/details`}
          render={() => (
            <FplTeamDetails
              fplTeam={fplTeam}
            />
          )}
        />
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId/details/edit`}
          render={() => (
            <EditFplTeamForm
              fplTeam={fplTeam}
              submitting={submitting}
              errors={errors}
              updateFplTeam={updateFplTeam}
            />
          )}
        />
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId?`}
          render={() => (
            <FplTeamListChart
              isOwner={isOwner}
              fplTeamId={fplTeamId}
              fplTeamLists={fplTeamLists}
              fplTeamList={fplTeamList}
              listPosition={listPosition}
              fetchValidSubstitutions={fetchValidSubstitutions}
              processSubstitution={processSubstitution}
              clearValidSubstitutions={clearValidSubstitutions}
              selectedFplTeamListId={selectedFplTeamListId}
            />
          )}
        />
        <Route
          exact
          path={
            [
              `${FPL_TEAMS_URL}/:fplTeamId/waiverPicks`,
              `${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId/waiverPicks`,
              `${FPL_TEAMS_URL}/:fplTeamId/trades`,
              `${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId/trades`
            ]
          }
          render={() => (
            <WaiverPicksTable
              isOwner={isOwner}
              isWaiver={isWaiver}
              waiverPicks={waiverPicks}
              trades={trades}
              selectedFplTeamListId={selectedFplTeamListId}
              fetchWaiverPicks={fetchWaiverPicks}
              changeWaiverPickOrder={changeWaiverPickOrder}
              fetchTrades={fetchTrades}
              fplTeamList={fplTeamList}
              fplTeamLists={fplTeamLists}
              fplTeamId={fplTeamId}
            />
          )}
        />
        <Route
          exact
          path={
            [
              `${FPL_TEAMS_URL}/:fplTeamId/waiverPicks/new`,
              `${FPL_TEAMS_URL}/:fplTeamId/trades/new`
            ]
          }
          render={() => (
            <NewWaiverPick
              isOwner={isOwner}
              currentFplTeamList={currentFplTeamList}
              fetchListPositions={fetchListPositions}
              fplTeamList={fplTeamList}
              isWaiver={isWaiver}
              deadline={deadline}
              outListPosition={outListPosition}
              setOutListPosition={setOutListPosition}
              fetchTradeablePlayers={fetchTradeablePlayers}
              updateTradeablePlayersFilter={updateTradeablePlayersFilter}
              updateTradeablePlayersSort={updateTradeablePlayersSort}
              updateTradeablePlayersPage={updateTradeablePlayersPage}
              players={players}
              fetchPlayerFacets={fetchPlayerFacets}
              createWaiverPick={createWaiverPick}
              selectedFplTeamListId={selectedFplTeamListId}
              waiverPicks={waiverPicks}
              trades={trades}
              createTrade={createTrade}
            />
          )}
        />
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId/teamTrades/new`}
          render={() => (
            <NewTeamTrade
              isOwner={isOwner}
              currentFplTeamList={currentFplTeamList}
              fetchListPositions={fetchListPositions}
              fplTeamList={fplTeamList}
              deadline={deadline}
              outListPosition={outListPosition}
              setOutListPosition={setOutListPosition}
              fetchTradeableListPositions={fetchTradeableListPositions}
              createInterTeamTradeGroup={createInterTeamTradeGroup}
              selectedFplTeamListId={selectedFplTeamListId}
              listPosition={listPosition}
              interTeamTradeGroups={interTeamTradeGroups}
              updateTradeableListPositionsFilter={updateTradeableListPositionsFilter}
              updateTradeableListPositionsSort={updateTradeableListPositionsSort}
              fetchTradeableListPositionFacets={fetchTradeableListPositionFacets}
            />
          )}
        />
        <Route
          exact
          path={
            [
              `${FPL_TEAMS_URL}/:fplTeamId/teamTrades`,
              `${FPL_TEAMS_URL}/:fplTeamId/teamTrades/out`,
              `${FPL_TEAMS_URL}/:fplTeamId/teamTrades/in`,
              `${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId/teamTrades`,
              `${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId/teamTrades/out`,
              `${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId/teamTrades/in`
            ]
          }
          render={() => (
            <TeamTradeTabs
              isOwner={isOwner}
              interTeamTradeGroups={interTeamTradeGroups}
              fetchInterTeamTradeGroups={fetchInterTeamTradeGroups}
              fplTeamList={fplTeamList}
              fplTeamLists={fplTeamLists}
              deadline={deadline}
              fplTeamId={fplTeamId}
              selectedFplTeamListId={selectedFplTeamListId}
              action={action}
              cancelInterTeamTradeGroup={cancelInterTeamTradeGroup}
              submitInterTeamTradeGroup={submitInterTeamTradeGroup}
              approveInterTeamTradeGroup={approveInterTeamTradeGroup}
              declineInterTeamTradeGroup={declineInterTeamTradeGroup}
              removeTrade={removeTrade}
            />
          )}
        />
      </Switch>
      <Route
        exact
        path={`${FPL_TEAMS_URL}/:fplTeamId/teamTrades/:teamTradeId/addPlayer`}
        render={
          () => (
            <AddPlayer
              isOwner={isOwner}
              currentFplTeamList={currentFplTeamList}
              selectedFplTeamListId={selectedFplTeamListId}
              teamTradeId={teamTradeId}
              fetchInterTeamTradeGroup={fetchInterTeamTradeGroup}
              interTeamTradeGroup={interTeamTradeGroup}
              fetchListPositions={fetchListPositions}
              outListPosition={outListPosition}
              setOutListPosition={setOutListPosition}
              deadline={deadline}
              fetchTradeableListPositions={fetchTradeableListPositions}
              listPosition={listPosition}
              fplTeamList={fplTeamList}
              interTeamTradeGroups={interTeamTradeGroups}
              updateTradeableListPositionsFilter={updateTradeableListPositionsFilter}
              updateTradeableListPositionsSort={updateTradeableListPositionsSort}
              fetchTradeableListPositionFacets={fetchTradeableListPositionFacets}
              addToInterTeamTradeGroup={addToInterTeamTradeGroup}
            />
          )
        }
      />
    </Fragment>
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
