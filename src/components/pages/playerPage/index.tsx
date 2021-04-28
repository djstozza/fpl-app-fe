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
import { PLAYERS_URL } from 'utilities/constants'


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

interface TabsInterface {
  details: Object,
  history?: Object,
  historyPast?: Object
}

const TABS: TabsInterface = {
  details: { label: 'Details', value: 'details' },
  history: { label: 'History', value: 'history' },
  historyPast: { label: 'Past Seasons', value: 'historyPast' }
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
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

  const { firstName, lastName, hasHistory, hasHistoryPast } = player
  if (!hasHistory) delete TABS['history']
  if (!hasHistoryPast) delete TABS['historyPast']

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {firstName} {lastName}
      </Typography>
      <Tabs
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
