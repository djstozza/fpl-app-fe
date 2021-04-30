import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {
  Typography,
  Theme,
  makeStyles
} from '@material-ui/core'

import { playerActions } from 'state/player'
import Tabs from 'components/common/tabs'
import PlayerDetails from './playerDetails'
import HistoryTable from './historyTable'
import HistoryPastTable from './historyPastTable'
import { TEAMS_URL, PLAYERS_URL } from 'utilities/constants'
import { teamCrestPathLoader } from 'utilities/helpers'
import TeamCrestLink from 'components/common/teamCrestLink'


import type { PlayerState } from 'state/player'

type Props = {
  player: PlayerState,
  fetchPlayer: Function,
  fetchPlayerHistory: Function,
  fetchPlayerHistoryPast: Function,
  updatePlayerHistory: Function,
  updatePlayerHistoryPast: Function,
  match: { params: { playerId: string, tab: string } }
}

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  history: { label: 'History', value: 'history', display: true },
  historyPast: { label: 'Past Seasons', value: 'historyPast', display: true }
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',

    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between'
    },
  },
  crestContainer: {
    display: 'inline-flex',
    marginLeft: theme.spacing(2)
  },
  bracket: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))

const PlayerPage = (props: Props) => {
  const {
    player: { data: player, history = [], historyPast = []},
    fetchPlayer,
    fetchPlayerHistory,
    fetchPlayerHistoryPast,
    updatePlayerHistory,
    updatePlayerHistoryPast,
    match: { params: { playerId, tab = 'details' } }
  } = props
  const classes = useStyles()


  useEffect(
    () => {
      fetchPlayer(playerId)
    }, [fetchPlayer, playerId]
  )

  if (!player) return null

  const { firstName, lastName, hasHistory, hasHistoryPast, team } = player
  TABS.history.display = hasHistory
  TABS.historyPast.display = hasHistoryPast

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {firstName} {lastName}
        <div className={classes.crestContainer}>
          <div className={classes.bracket}>(</div>
          <TeamCrestLink team={team} tab='players' size='large' />
          <div className={classes.bracket}>)</div>
        </div>
      </Typography>
      <Tabs
        key={playerId}
        currentTab={tab}
        tabs={Object.values(TABS)}
        url={PLAYERS_URL}
        id={playerId}
      />
      <Switch>
        <Route
          exact
          path={`${PLAYERS_URL}/:playerId`}
          render={() => <PlayerDetails player={player} />}
        />
        <Route
          exact
          path={`${PLAYERS_URL}/:playerId/details`}
          render={() => <PlayerDetails player={player} />}
        />
        <Route
          exact
          path={`${PLAYERS_URL}/:playerId/history`}
          render={
            () => (
              <HistoryTable
                key={playerId}
                playerId={playerId}
                history={history}
                fetchPlayerHistory={fetchPlayerHistory}
                tab={tab}
                updatePlayerHistory={updatePlayerHistory}
                hasHistory={hasHistory}
              />
            )
          }
        />
        <Route
          exact
          path={`${PLAYERS_URL}/:playerId/historyPast`}
          render={
            () => (
              <HistoryPastTable
                key={playerId}
                playerId={playerId}
                historyPast={historyPast}
                fetchPlayerHistoryPast={fetchPlayerHistoryPast}
                updatePlayerHistoryPast={updatePlayerHistoryPast}
                tab={tab}
                hasHistoryPast={hasHistoryPast}
              />
            )
          }
        />
      </Switch>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    player
  } = state

  return {
    player
  }
}

const matchDispatchToProps = {
  fetchPlayer: playerActions.fetchPlayer,
  fetchPlayerHistory: playerActions.fetchPlayerHistory,
  fetchPlayerHistoryPast: playerActions.fetchPlayerHistoryPast,
  updatePlayerHistory: playerActions.updatePlayerHistory,
  updatePlayerHistoryPast: playerActions.updatePlayerHistoryPast
}

export default connect(mapStateToProps, matchDispatchToProps)(PlayerPage)
