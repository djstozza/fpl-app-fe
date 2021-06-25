import { Route, Switch } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
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
  PROFILE_URL,
  LEAGUES_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'
import LoadingBar from 'react-redux-loading-bar'
import LeaguePage from 'components/pages/leaguePage'
import FplTeamPage from 'components/pages/fplTeamPage'
import RoundsPage from 'components/pages/roundsPage'
import TeamsPage from 'components/pages/teamsPage'
import TeamPage from 'components/pages/teamPage'
import PlayersPage from 'components/pages/playersPage'
import PlayerPage from 'components/pages/playerPage'
import SignUpPage from 'components/pages/signUpPage'
import LoginPage from 'components/pages/loginPage'
import ProfilePage from 'components/pages/profilePage'
import DraftPage from 'components/pages/draftPage'
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
    <SnackbarProvider maxSnack={3}>
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
              <Route exact path={`${LEAGUES_URL}/:leagueId`} render={(props) => <LeaguePage {...props} />} />
              <Route exact path={`${LEAGUES_URL}/:leagueId/draft/:tab?`} render={(props) => <DraftPage {...props} />} />
              <Route path={`${LEAGUES_URL}/:leagueId/:tab`} render={(props) => <LeaguePage {...props} />} />
              <Route path={`${FPL_TEAMS_URL}/:fplTeamId/:tab?/`} render={(props) => <FplTeamPage {...props} />} />
            </Switch>
          </PrivateRoute>
        </Switch>
      </div>
    </SnackbarProvider>
  );
}

export default App
