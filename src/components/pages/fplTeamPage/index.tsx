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

import {
  FPL_TEAMS_URL
} from 'utilities/constants'
import FplTeamDetails from './fplTeamDetails'
import EditFplTeamForm from './editFplTeamForm'
import FplTeamListChart from './fplTeamListChart'
import FplTeamAlert from './fplTeamAlert'
import NewWaiverPick from './newWaiverPick'
import WaiverPicksTable from './waiverPicksTable'

import type { FplTeam, Error } from 'types'
import type { FplTeamListState } from 'state/fplTeamList'
import type { FplTeamListsState } from 'state/fplTeamLists'
import type { ListPositionState } from 'state/listPosition'
import type { PlayersState } from 'state/players'
import type { WaiverPicksState } from 'state/waiverPicks'

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
  match: { params: { fplTeamId: string, tab: string, fplTeamListId: string } }
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
  trades: { label: 'Trades', value: 'trades', display: true },
  teamTrades: { label: 'Team Trades', value: 'teamTrades', display: true }
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
    match: { params: { fplTeamId, tab = 'details', fplTeamListId } }
  } = props
  const classes = useStyles()
  const [deadlineTimeAsTime, setDeadlineTimeAsTime] = useState<Date|undefined>()
  const [waiverDeadlineAsTime, setWaiverDeadlineAsTime] = useState<Date|undefined>()
  const [deadline, setDeadline] = useState<Date|undefined>()
  const [isWaiver, setIsWaiver] = useState(false)

  const currentFplTeamList = fplTeamLists.data.find(({ round: { current } }) => current)
  const currentFplTeamListId = (currentFplTeamList || {}).id
  const lastFplTeamListId = fplTeamLists[fplTeamLists.data.length - 1]?.id
  const getSelectedFplteamListId = () => fplTeamListId || currentFplTeamListId || lastFplTeamListId
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
          path={`${FPL_TEAMS_URL}/:fplTeamId/waiverPicks/new`}
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
          path={`${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId/waiverPicks`}
          render={() => (
            <WaiverPicksTable
              isOwner={isOwner}
              isWaiver={isWaiver}
              waiverPicks={waiverPicks}
              selectedFplTeamListId={selectedFplTeamListId}
              fetchWaiverPicks={fetchWaiverPicks}
              changeWaiverPickOrder={changeWaiverPickOrder}
              fplTeamList={fplTeamList}
              fplTeamLists={fplTeamLists}
              fplTeamId={fplTeamId}
            />
          )}
        />
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId/waiverPicks`}
          render={() => (
            <WaiverPicksTable
              isOwner={isOwner}
              isWaiver={isWaiver}
              waiverPicks={waiverPicks}
              selectedFplTeamListId={selectedFplTeamListId}
              fetchWaiverPicks={fetchWaiverPicks}
              changeWaiverPickOrder={changeWaiverPickOrder}
              fplTeamList={fplTeamList}
              fplTeamLists={fplTeamLists}
              fplTeamId={fplTeamId}
            />
          )}
        />

      </Switch>
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
    listPosition,
    waiverPicks,
    players
  } = state

  return {
    fplTeam,
    fplTeamLists,
    fplTeamList,
    errors,
    submitting,
    listPosition,
    players,
    waiverPicks
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
  changeWaiverPickOrder: waiverPicksActions.changeWaiverPickOrder
}

export default connect(mapStateToProps, matchDispatchToProps)(FplTeamPage)
