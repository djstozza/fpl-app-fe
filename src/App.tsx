import { Fragment } from 'react'
import { Redirect, Route, Switch, Link } from 'react-router-dom'
import {
  makeStyles,
  Theme
} from '@material-ui/core'

import {
  ROUNDS_URL,
  TEAMS_URL,
  PLAYERS_URL,
  SIGN_UP_URL,
  LOGIN_URL,
  PROFILE_URL
} from 'utilities/constants'
import LoadingBar from 'react-redux-loading-bar'
import RoundsPage from 'components/pages/roundsPage'
import TeamsPage from 'components/pages/teamsPage'
import TeamPage from 'components/pages/teamPage'
import PlayersPage from 'components/pages/playersPage'
import PlayerPage from 'components/pages/playerPage'
import SignUpPage from 'components/pages/signUpPage'
import LoginPage from 'components/pages/loginPage'
import ProfilePage from 'components/pages/profilePage'
import PrivateRoute from 'components/common/privateRoute'
import NavBar from 'components/navBar'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8)
    },
    marginTop: theme.spacing(7)
  }
}))

const App = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <NavBar />
      <div className={classes.container}>
        <LoadingBar showFastActions />

        <Switch>
          <Route exact path='/' render={(props) => <RoundsPage {...props} />} />
          <Route exact path={`${ROUNDS_URL}/:roundId?`} render={(props) => <RoundsPage {...props} />} />
          <Route exact path={`${TEAMS_URL}/:teamId`} render={(props) => <TeamPage {...props} />} />
          <Route exact path={`${TEAMS_URL}/:teamId/:tab`} render={(props) => <TeamPage {...props} />} />
          <Route exact path={TEAMS_URL} render={(props) => <TeamsPage {...props} />} />
          <Route exact path={PLAYERS_URL} render={(props) => <PlayersPage {...props} />} />
          <Route exact path={`${PLAYERS_URL}/:playerId`} render={(props) => <PlayerPage {...props} />} />
          <Route exact path={`${PLAYERS_URL}/:playerId/:tab`} render={(props) => <PlayerPage {...props} />} />
          <Route exact path={SIGN_UP_URL} render={(props) => <SignUpPage {...props} />} />
          <Route exact path={LOGIN_URL} render={(props) => <LoginPage {...props} />} />
          <PrivateRoute>
            <Switch>
              <Route exact path={PROFILE_URL} render={(props) => <ProfilePage {...props} />} />
              <Route exact path={`${PROFILE_URL}/:tab`} render={(props) => <ProfilePage {...props} />} />
              <Route exact path={`${PROFILE_URL}/:tab/:action`} render={(props) => <ProfilePage {...props} />} />
            </Switch>
          </PrivateRoute>
        </Switch>
      </div>
    </Fragment>
  );
}

export default App
