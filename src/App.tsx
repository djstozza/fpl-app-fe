import { Fragment } from 'react';
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
  const roundsPaths = ['/', `${ROUNDS_URL}/:roundId?`]

  const profilePaths = [
    `${PROFILE_URL}/*`,
    `${PROFILE_URL}/:tab`,
    `${PROFILE_URL}/:tab/:action`
  ]

  const fplTeamPaths = [
    `${FPL_TEAMS_URL}/:fplTeamId/:tab?/:fplTeamListId(\\d+)?/*`,
    `${FPL_TEAMS_URL}/:fplTeamId/:tab?/:action?/*`,
    `${FPL_TEAMS_URL}/:fplTeamId/:tab/:teamTradeId(\\d+)/addPlayer`,
    `${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId(\\d+)?/:tab?/:action?/*`
  ]
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <SnackbarProvider maxSnack={3}>
          <NavBar />
          <div className={classes.container}>
            <LoadingBar showFastActions />
            <ErrorDialog />
            <Routes>
              {roundsPaths.map(path => <Route key={path} path={path} element={<RoundsPage />} />)}
              <Route path={`${TEAMS_URL}/:teamId/*`} element={<TeamPage />} />
              <Route path={TEAMS_URL} element={<TeamsPage />} />
              <Route path={PLAYERS_URL} element={<PlayersPage />} />
              <Route path={`${PLAYERS_URL}/:playerId/:tab?/*`} element={<PlayerPage />} />
              <Route path={SIGN_UP_URL} element={<SignUpPage />} />
              <Route path={LOGIN_URL} element={<LoginPage />} />
              {
                profilePaths.map(path => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <PrivateRoute>
                        <ProfilePage />
                      </PrivateRoute>
                    }
                  />
                ))
              }
              <Route
                path={`${LEAGUES_URL}/:leagueId/draft/:tab?/*`}
                element={
                  <PrivateRoute>
                    <DraftPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={`${LEAGUES_URL}/:leagueId/miniDraft/:tab?/*`}
                element={
                  <PrivateRoute>
                    <MiniDraftPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={`${LEAGUES_URL}/:leagueId/:tab?/:action?/*`}
                element={
                  <PrivateRoute>
                    <LeaguePage />
                  </PrivateRoute>
                }
              />
              {
                fplTeamPaths.map(path => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <PrivateRoute>
                        <FplTeamPage />
                      </PrivateRoute>
                    }
                  />
                ))
              }
            </Routes>
          </div>
        </SnackbarProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App
