import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, Outlet } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import {
  Typography,
  Theme
} from '@mui/material'

import { playerActions } from 'state/player'
import Tabs from 'components/common/tabs'
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

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  history: { label: 'History', value: 'history', display: true },
  historyPast: { label: 'Past Seasons', value: 'historyPast', display: true }
}

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
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

type Tab = 'details' | 'history' | 'historyPast'

export type PlayerContext = {
  playerId: string,
  setTab: (string: Tab) => void
} & Props

export const PlayerPage = (props: Props) => {
  const {
    player: { data: player },
    fetchPlayer
  } = props
  const { classes } = useStyles()
  const { playerId } = useParams()
  const [tab, setTab] = useState<Tab>('details')
  
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
  
  const value: PlayerContext = {
    ...props,
    playerId,
    setTab
  }

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
      <Outlet context={value} />
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
