import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes, useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import {
  Typography,
  Theme
} from '@mui/material'

import { playerActions } from 'state/player'
import Tabs from 'components/common/tabs'
import PlayerDetails from './playerDetails'
import HistoryTable from './historyTable'
import HistoryPastTable from './historyPastTable'
import { PLAYERS_URL } from 'utilities/constants'
import TeamCrestLink from 'components/common/teamCrestLink'

import type { PlayerState } from 'state/player'

type Props = {
  player: PlayerState,
  fetchPlayer: (string) => void,
  fetchPlayerHistory: Function,
  fetchPlayerHistoryPast: Function,
  updatePlayerHistorySort: Function,
  updatePlayerHistoryPastSort: Function
}

type PlayerParams = {
  playerId: string,
  tab?: string
}

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  history: { label: 'History', value: 'history', display: true },
  historyPast: { label: 'Past Seasons', value: 'historyPast', display: true }
}

const useStyles = makeStyles()((theme: Theme) => ({
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

export const PlayerPage = (props: Props) => {
  const {
    player: { data: player, history = [], historyPast = [], fetching },
    fetchPlayer,
    fetchPlayerHistory,
    fetchPlayerHistoryPast,
    updatePlayerHistorySort,
    updatePlayerHistoryPastSort
  } = props
  const { classes } = useStyles()
  const { playerId, tab = 'details' } = useParams<PlayerParams>()

  useEffect(
    () => {
      fetchPlayer(playerId)
    }, [fetchPlayer, playerId]
  )

  if (!playerId) return null
  if (!player) return null

  const { firstName, lastName, hasHistory, hasHistoryPast, team } = player
  TABS.history.display = hasHistory
  TABS.historyPast.display = hasHistoryPast

  const detailsPaths = [
    `${PLAYERS_URL}/:playerId`,
    `${PLAYERS_URL}/:playerId/details`
  ]

  return (
    <div data-testid='PlayerPage'>
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
        titleSubstr={`${firstName} ${lastName}`}
      />
      <Routes>
        {
          detailsPaths.map(path => (
            <Route
              key={path}
              path={path}
              element={<PlayerDetails key={playerId} player={player} />}
            />
          ))
        }
        <Route
          path={`${PLAYERS_URL}/:playerId/history`}
          element={
            <HistoryTable
              key={playerId}
              playerId={playerId}
              history={history}
              fetchPlayerHistory={fetchPlayerHistory}
              tab={tab}
              updatePlayerHistorySort={updatePlayerHistorySort}
              hasHistory={hasHistory}
              fetching={fetching}
            />
          }
        />
        <Route
          path={`${PLAYERS_URL}/:playerId/historyPast`}
          element={
            <HistoryPastTable
              key={playerId}
              playerId={playerId}
              historyPast={historyPast}
              fetchPlayerHistoryPast={fetchPlayerHistoryPast}
              updatePlayerHistoryPastSort={updatePlayerHistoryPastSort}
              tab={tab}
              hasHistoryPast={hasHistoryPast}
              fetching={fetching}
            />
          }
        />
      </Routes>
    </div>
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
  updatePlayerHistorySort: playerActions.updatePlayerHistorySort,
  updatePlayerHistoryPastSort: playerActions.updatePlayerHistoryPastSort
}

export default connect(mapStateToProps, matchDispatchToProps)(PlayerPage)
