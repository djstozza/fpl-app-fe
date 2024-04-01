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

import RoundsPage from 'components/pages/roundsPage'

import TeamsPage from 'components/pages/teamsPage'
import TeamPage from 'components/pages/teamPage'
import TeamDetails from 'components/pages/teamPage/teamDetails'
import FixturesTable from 'components/pages/teamPage/fixturesTable'
import PlayersTable from 'components/pages/teamPage/playersTable'

import PlayersPage from 'components/pages/playersPage'
import PlayerPage from 'components/pages/playerPage'
import PlayerDetails from 'components/pages/playerPage/playerDetails'
import HistoryTable from 'components/pages/playerPage/historyTable'
import HistoryPastTable from 'components/pages/playerPage/historyPastTable'

import SignUpPage from 'components/pages/signUpPage'
import LoginPage from 'components/pages/loginPage'

import ProfilePage from 'components/pages/profilePage'
import UserDetails from 'components/pages/profilePage/userDetails'
import UserEditForm from 'components/pages/profilePage/userEditForm'

import LeaguesPage from 'components/pages/leaguesPage'
import CreateLeague from 'components/pages/leaguesPage/createLeague'
import JoinLeague from 'components/pages/leaguesPage/joinLeague'

import FplTeamsTable from 'components/pages/profilePage/fplTeamsTable'

import LeaguePage from 'components/pages/leaguePage'
import LeagueDetails from 'components/pages/leaguePage/leagueDetails'
import EditLeagueForm from 'components/pages/leaguePage/editLeagueForm'
import LeagueFplTeamsTable from 'components/pages/leaguePage/fplTeamsTable'

import FplTeamPage from 'components/pages/fplTeamPage'
import FplTeamDetails from 'components/pages/fplTeamPage/fplTeamDetails'
import EditFplTeamForm from 'components/pages/fplTeamPage/editFplTeamForm'
import FplTeamListChart from 'components/pages/fplTeamPage/fplTeamListChart'
import WaiverPicksTable from 'components/pages/fplTeamPage/waiverPicksTable'
import NewWaiverPick from 'components/pages/fplTeamPage/newWaiverPick'
import TeamTradeTabs from 'components/pages/fplTeamPage/teamTrades/tabs'
import NewTeamTrade from 'components/pages/fplTeamPage/teamTrades/new'
import AddPlayer from 'components/pages/fplTeamPage/teamTrades/addPlayer'

import DraftPage from 'components/pages/draftPage'
import DraftPicksTable from 'components/pages/draftPage/draftPicksTable'
import AvailablePlayersTable from 'components/pages/draftPage/availablePlayersTable'

import MiniDraftPage from 'components/pages/miniDraftPage'
import MiniDraftPicksTable from 'components/pages/miniDraftPage/miniDraftPicksTable'
import NewMiniDraftPick from 'components/pages/miniDraftPage/newMiniDraftPick'

import PrivateRoute from 'components/common/privateRoute'
import NavBar from 'components/navBar'
import ErrorDialog from 'components/errorDialog'
import theme from './theme'
import ChangePasswordForm from 'components/pages/profilePage/changePasswordForm'

import NotMatchPage from 'components/pages/NoMatchPage'

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
            <ErrorDialog />
            <Routes>
              <Route path="/" element={<RoundsPage />} >
                <Route path={ROUNDS_URL} element={<RoundsPage />}>
                  <Route path=':roundId' element={<RoundsPage />} />
                </Route>   
              </Route>
              <Route path={TEAMS_URL} element={<TeamsPage />} />
              <Route
                path={`${TEAMS_URL}/:teamId`}
                element={<TeamPage />}
              >
                <Route index element={<TeamDetails />}/>
                <Route path='details' element={<TeamDetails />} />
                <Route path='fixtures' element={<FixturesTable />} />
                <Route path='players' element={<PlayersTable />} />
              </Route>
              <Route path={PLAYERS_URL} >
                <Route index element={<PlayersPage />} />
                <Route path=':playerId' element={<PlayerPage />}>
                  <Route index element={<PlayerDetails />} />
                  <Route path='details' element={<PlayerDetails />} />
                  <Route path='history' element={<HistoryTable />} />
                  <Route path='historyPast' element={<HistoryPastTable />} />
                </Route>
              </Route>
              <Route path={SIGN_UP_URL} element={<SignUpPage />} />
              <Route path={LOGIN_URL} element={<LoginPage />} />
              <Route
                path={PROFILE_URL}
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              >
                <Route index element={<UserDetails />} />
                <Route path='details/edit' element={<UserEditForm />} />
                <Route path='details' element={<UserDetails />} />
                <Route path='leagues'>
                  <Route index element={<LeaguesPage />} />
                  <Route path='new' element={<CreateLeague />} /> 
                  <Route path='join' element={<JoinLeague />} />
                </Route>
                <Route path='change-password' element={<ChangePasswordForm />} />
                <Route path='fplTeams' element={<FplTeamsTable />} />
              </Route>
              <Route
                path={`${LEAGUES_URL}/:leagueId`}
                element={
                  <PrivateRoute>
                    <LeaguePage />
                  </PrivateRoute>
                }
              >
                <Route index element={<LeagueDetails />} />
                <Route path='details'>
                  <Route index element={<LeagueDetails />} />
                  <Route path='edit' element={<EditLeagueForm />} />
                </Route>
                <Route path='fplTeams' element={<LeagueFplTeamsTable />} />
              </Route>
              <Route
                path={`${FPL_TEAMS_URL}/:fplTeamId`}
                element={
                  <PrivateRoute>
                    <FplTeamPage />
                  </PrivateRoute>
                }
              >
                <Route index element={<FplTeamDetails />} />
                <Route path='details'>
                  <Route index element={<FplTeamDetails />} />
                  <Route path='edit' element={<EditFplTeamForm />} />
                </Route>
                <Route path='teamLists'>
                  <Route index element={<FplTeamListChart />} />
                  <Route path=':fplTeamListId'>
                    <Route index element={<FplTeamListChart />} />
                    <Route path='waiverPicks' element={<WaiverPicksTable />} />
                    <Route path='trades' element={<WaiverPicksTable />} />
                    <Route path='teamTrades/:action?'>
                      <Route index element={<TeamTradeTabs />} />
                    </Route>
                  </Route>
                </Route>
                <Route path='waiverPicks'>
                  <Route index element={<WaiverPicksTable />} />
                  <Route path='new' element={<NewWaiverPick />} />
                </Route>
                <Route path='trades'>
                  <Route index element={<WaiverPicksTable />} />
                  <Route path='new' element={<NewWaiverPick />} />
                </Route>
                <Route path='teamTrades'>
                  <Route path='new' element={<NewTeamTrade />} />
                  <Route path=':teamTradeId/addPlayer' element={<AddPlayer />} />
                  <Route path=':action?'>
                    <Route index element={<TeamTradeTabs />} />
                  </Route>
                </Route>
              </Route>
              <Route
                path={`${LEAGUES_URL}/:leagueId/draft`}
                element={
                  <PrivateRoute>
                    <DraftPage />
                  </PrivateRoute>
                }
              >
                <Route index element={<DraftPicksTable />} />
                <Route path='draftPicks' element={<DraftPicksTable />} />
                <Route path='availablePlayers' element={<AvailablePlayersTable />} />
              </Route>
              <Route
                path={`${LEAGUES_URL}/:leagueId/miniDraft`}
                element={
                  <PrivateRoute>
                    <MiniDraftPage />
                  </PrivateRoute>
                }
              >
                <Route index element={<MiniDraftPicksTable />} />
                <Route path='miniDraftPicks' element={<MiniDraftPicksTable />} />
                <Route path='tradeableListPositions' element={<NewMiniDraftPick />} />
              </Route>
              <Route path='*' element={<NotMatchPage />} />
            </Routes>
          </div>
        </SnackbarProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App