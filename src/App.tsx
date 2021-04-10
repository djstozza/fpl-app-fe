import { Fragment } from 'react'
import { Redirect, Route, Switch, Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Typography
} from '@material-ui/core'

import { ROUNDS_URL, TEAMS_URL, PLAYERS_URL } from 'utilities/constants'
import LoadingBar from 'react-redux-loading-bar'
import RoundsPage from 'components/pages/roundsPage'
import TeamsPage from 'components/pages/teamsPage'
import TeamPage from 'components/pages/teamPage'
import PlayersPage from 'components/pages/playersPage'
import NavBar from 'components/navBar'

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <LoadingBar showFastActions />

      <Switch>
        <Route exact path={`${ROUNDS_URL}/:roundId?`} render={(props) => <RoundsPage {...props} />} />
        <Route exact path={`${TEAMS_URL}/:teamId`} render={(props) => <TeamPage {...props} />} />
        <Route exact path={`${TEAMS_URL}/:teamId/:tab`} render={(props) => <TeamPage {...props} />} />
        <Route exact path={TEAMS_URL} render={(props) => <TeamsPage {...props} />} />
        <Route exact path={PLAYERS_URL} render={(props) => <PlayersPage {...props} />} />
      </Switch>
    </Fragment>
  );
}

export default App
