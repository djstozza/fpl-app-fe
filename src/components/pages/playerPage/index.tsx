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
import { PLAYERS_URL } from 'utilities/constants'

import type { Player, History } from 'types'

type Props = {
  player: Player,
  playerHistory: History[],
  fetchPlayer: Function,
  match: { params: { playerId: string, tab: string } }
}

const TABS = [
  { label: 'Details', value: 'details' },
  { label: 'History', value: 'history' },
  { label: 'Past Seasons', value: 'historyPast' }
]

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  }
}))

const PlayerPage = (props: Props) => {
  const {
    player,
    fetchPlayer,
    match: { params: { playerId, tab = 'details' } }
  } = props
  const classes = useStyles()

  useEffect(
    () => {
      fetchPlayer(playerId)
    }, [fetchPlayer, playerId]
  )

  if (!player) return null

  const { firstName, lastName } = player

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {firstName} {lastName}
      </Typography>
      <Tabs
        currentTab={tab}
        tabs={TABS}
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
        {
          // <Route
          //   exact
          //   path={`${PLAYERS_URL}/:playerId/fixtures`}
          //   render={
          //     () => (
          //       <FixturesTable
          //         key={playerId}
          //         playerId={playerId}
          //         fixtures={fixtures}
          //         fetchTeamFixtures={fetchTeamFixtures}
          //         sort={sortQuery}
          //         tab={tab}
          //         updateTeamFixturesSort={updateTeamFixturesSort}
          //       />
          //     )
          //   }
          // />
          // <Route
          //   exact
          //   path={`${PLAYERS_URL}/:playerId/players`}
          //   render={() => (
          //     <PlayersTable
          //       key={playerId}
          //       players={players}
          //       fetchTeamPlayers={fetchTeamPlayers}
          //       sort={sortQuery}
          //       playerId={playerId}
          //       tab={tab}
          //       updateTeamPlayersSort={updateTeamPlayersSort}
          //     />
          //   )}
          // />
        }

      </Switch>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    player: { data: player },
    playerHistory
  } = state

  return {
    player,
    playerHistory
  }
}

const matchDispatchToProps = {
  fetchPlayer: playerActions.fetchPlayer,
  fetchPlayerHistory: playerActions.fetchPlayerHistory
}

export default connect(mapStateToProps, matchDispatchToProps)(PlayerPage)
