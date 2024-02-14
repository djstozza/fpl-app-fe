import { Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { makeStyles } from 'tss-react/mui';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, Theme } from '@mui/material/styles';

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
import MiniDraftPage from 'components/pages/miniDraftPage'
import PrivateRoute from 'components/common/privateRoute'
import NavBar from 'components/navBar'
import ErrorDialog from 'components/errorDialog'
import theme from './theme'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8)
    },
    marginTop: theme.spacing(7)
  }
}));

const App = () => {
  const { classes } = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <SnackbarProvider maxSnack={3}>
          <NavBar />
          <div className={classes.container}>
            <LoadingBar showFastActions />
            <ErrorDialog />

            <Routes>
              <Route exact path={['/', `${ROUNDS_URL}/:roundId?`]} render={(props) => <RoundsPage {...props} />} />
              <Route exact path={`${TEAMS_URL}/:teamId/:tab?`} render={(props) => <TeamPage {...props} />} />
              <Route exact path={TEAMS_URL} render={(props) => <TeamsPage {...props} />} />
              <Route exact path={PLAYERS_URL} render={(props) => <PlayersPage {...props} />} />
              <Route exact path={`${PLAYERS_URL}/:playerId/:tab?`} render={(props) => <PlayerPage {...props} />} />
              <Route exact path={SIGN_UP_URL} render={(props) => <SignUpPage {...props} />} />
              <Route exact path={LOGIN_URL} render={(props) => <LoginPage {...props} />} />
              <PrivateRoute>
                <Routes>
                  <Route
                    exact
                    path={
                      [
                        PROFILE_URL,
                        `${PROFILE_URL}/:tab`,
                        `${PROFILE_URL}/:tab/:action`
                      ]
                    }
                    render={(props) => <ProfilePage {...props} />}
                  />
                  <Route
                    exact
                    path={`${LEAGUES_URL}/:leagueId/draft/:tab?`}
                    render={(props) => <DraftPage {...props} />}
                  />
                  <Route
                    exact
                    path={`${LEAGUES_URL}/:leagueId/miniDraft/:tab?`}
                    render={(props) => <MiniDraftPage {...props} />}
                  />
                  <Route
                    path={`${LEAGUES_URL}/:leagueId/:tab?/:action?`}
                    render={(props) => <LeaguePage {...props} />}
                  />
                  <Route
                    exact
                    path={[
                      `${FPL_TEAMS_URL}/:fplTeamId/:tab?/:fplTeamListId(\\d+)?`,
                      `${FPL_TEAMS_URL}/:fplTeamId/:tab?/:action?`,
                      `${FPL_TEAMS_URL}/:fplTeamId/:tab/:teamTradeId(\\d+)/addPlayer`,
                      `${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId(\\d+)?/:tab?/:action?`
                    ]}
                    render={(props) => <FplTeamPage {...props} />}
                  />
                </Routes>
              </PrivateRoute>
            </Routes>
          </div>
        </SnackbarProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App
