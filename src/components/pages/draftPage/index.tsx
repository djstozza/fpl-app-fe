import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {
  Typography,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'

import { leagueActions } from 'state/league'
import { playersActions } from 'state/players'
import { draftPicksActions } from 'state/draftPicks'
import Tabs from 'components/common/tabs'
import DraftPicksTable from './draftPicksTable'
import AvailablePlayersTable from './availablePlayersTable'
import { LEAGUES_URL } from 'utilities/constants'

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
  updateDraftPicksPage: Function,
  fetchAvailablePlayers: Function,
  updateAvailablePlayersFilter: Function,
  updateAvailablePlayersSort: Function,
  updateAvailablePlayersPage: Function,
  fetchDraftPickFacets: Function,
  fetchPlayerFacets: Function
  match: { params: { leagueId: string, tab: string } }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

const TABS = [
  { label: 'Available Players', value: 'draft/availablePlayers', display: true },
  { label: 'Draft Picks', value: 'draft/draftPicks', display: true }
]

const DraftPage = (props: Props) => {
  const {
    league,
    draftPicks,
    players,
    fetchLeague,
    fetchDraftPicks,
    fetchDraftPickFacets,
    updateDraftPicksSort,
    updateDraftPicksFilter,
    updateDraftPicksPage,
    fetchAvailablePlayers,
    updateAvailablePlayersSort,
    updateAvailablePlayersFilter,
    updateAvailablePlayersPage,
    fetchPlayerFacets,
    updateDraftPick,
    match: { params: { leagueId, tab = 'draftPicks' } }
  } = props

  const classes = useStyles()

  useEffect(
    () => {
      fetchLeague(leagueId)
      fetchDraftPicks({ id: leagueId })
    }, [fetchLeague, fetchDraftPicks, leagueId]
  )

  if (!league) return null

  const { name } = league
  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {name} Draft
      </Typography>
      <Tabs
        key={leagueId}
        currentTab={`draft/${tab}`}
        tabs={TABS}
        url={LEAGUES_URL}
        id={leagueId}
      />
      <Switch>
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/draft`}
          render={() => (
            <DraftPicksTable
              key={leagueId}
              leagueId={leagueId}
              draftPicks={draftPicks}
              fetchDraftPicks={fetchDraftPicks}
              updateDraftPicksSort={updateDraftPicksSort}
              updateDraftPicksFilter={updateDraftPicksFilter}
              updateDraftPicksPage={updateDraftPicksPage}
              fetchDraftPickFacets={fetchDraftPickFacets}
            />
          )}
        />
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/draft/draftPicks`}
          render={() => (
            <DraftPicksTable
              key={leagueId}
              leagueId={leagueId}
              draftPicks={draftPicks}
              fetchDraftPicks={fetchDraftPicks}
              updateDraftPicksSort={updateDraftPicksSort}
              updateDraftPicksFilter={updateDraftPicksFilter}
              updateDraftPicksPage={updateDraftPicksPage}
              fetchDraftPickFacets={fetchDraftPickFacets}
            />
          )}
        />
        <Route
          exact
          path={`${LEAGUES_URL}/:leagueId/draft/availablePlayers`}
          render={() => (
            <AvailablePlayersTable
              key={leagueId}
              players={players}
              fetchAvailablePlayers={fetchAvailablePlayers}
              updateAvailablePlayersSort={updateAvailablePlayersSort}
              updateAvailablePlayersFilter={updateAvailablePlayersFilter}
              updateAvailablePlayersPage={updateAvailablePlayersPage}
              fetchPlayerFacets={fetchPlayerFacets}
              userCanPick={draftPicks.userCanPick}
              nextDraftPickId={draftPicks.nextDraftPickId}
              submitting={draftPicks.submitting}
              updateDraftPick={updateDraftPick}
            />
          )}
        />
      </Switch>
    </Fragment>
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
  updateDraftPicksPage: draftPicksActions.updatePage,
  fetchAvailablePlayers: leagueActions.fetchAvailablePlayers,
  updateAvailablePlayersSort: leagueActions.updateAvailablePlayersSort,
  updateAvailablePlayersPage: leagueActions.updateAvailablePlayersPage,
  updateAvailablePlayersFilter: leagueActions.updateAvailablePlayersFilter,
  fetchPlayerFacets: playersActions.fetchFacets,
}


export default connect(mapStateToProps, matchDispatchToProps)(DraftPage)
