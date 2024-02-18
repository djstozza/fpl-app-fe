import { Route, Routes, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from 'tss-react/mui'
import { Theme, Typography } from '@mui/material'
import { capitalize } from 'lodash'

import { authActions } from 'state/auth'
import { fplTeamsActions } from 'state/fplTeams'
import Tabs from 'components/common/tabs'
import UserDetails from './userDetails'
import UserEditForm from './userEditForm'
import ChangePasswordForm from './changePasswordForm'
import LeaguesPage from 'components/pages/leaguesPage'
import CreateLeague from 'components/pages/leaguesPage/createLeague'
import JoinLeague from 'components/pages/leaguesPage/joinLeague'
import FplTeamsTable from './fplTeamsTable'
import {
  PROFILE_URL,
  USER_DETAILS_URL,
  EDIT_USER_DETAILS_URL,
  CHANGE_PASSWORD_URL,
  LEAGUES_URL,
  NEW_LEAGUE_URL,
  JOIN_LEAGUE_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'

import type { User, Error } from 'types'
import type { FplTeamsState } from 'state/fplTeams'

type Props = {
  user: User,
  errors: Error[],
  updateUser: Function,
  initializeAuth: () => void,
  changePassword: Function,
  fetchFplTeams: Function,
  updateFplTeamsSort: Function,
  fplTeams: FplTeamsState,
  submitting: boolean
}

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  }
}))

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  leagues: { label: 'Leagues', value: 'leagues', display: true },
  fplTeams: { label: 'Fpl Teams', value: 'fplTeams', display: true }
}

export const ProfilePage = (props: Props) => {
  const {
    user,
    updateUser,
    changePassword,
    errors = [],
    submitting,
    initializeAuth,
    fetchFplTeams,
    updateFplTeamsSort,
    fplTeams
  } = props
  const { username } = user
  const { classes } = useStyles()
  const { tab = 'details', action } = useParams()

  TABS.details['extraTitleInfo'] = capitalize(action)

  const detailsPaths = [
    USER_DETAILS_URL,
    PROFILE_URL
  ]

  return (
    <div data-testid='ProfilePage'>
      <Typography variant='h4' className={classes.title}>
        {username}
      </Typography>
      <Tabs
        key={user.id}
        currentTab={tab}
        tabs={Object.values(TABS)}
        url={PROFILE_URL}
        titleSubstr={username}
      />
      <Routes>
        {
          detailsPaths.map(path => (
            <Route
              key={path}
              path={path}
              element={<UserDetails user={user} />}
            />
          ))
        }
        
        <Route
          path={EDIT_USER_DETAILS_URL}
          element={
            <UserEditForm
              user={user}
              errors={errors}
              updateUser={updateUser}
              submitting={submitting}
              initializeAuth={initializeAuth}
            />
          }
        />
        <Route
          path={CHANGE_PASSWORD_URL}
          element={
            <ChangePasswordForm
              errors={errors}
              changePassword={changePassword}
              submitting={submitting}
              initializeAuth={initializeAuth}
            />
          }
        />
        <Route
          path={`${PROFILE_URL}${LEAGUES_URL}`}
          element={<LeaguesPage />}
        />
        <Route
          path={`${PROFILE_URL}${NEW_LEAGUE_URL}`}
          element={<CreateLeague />}
        />
        <Route
          path={`${PROFILE_URL}${JOIN_LEAGUE_URL}`}
          element={<JoinLeague />}
        />
        <Route
          path={`${PROFILE_URL}${FPL_TEAMS_URL}`}
          element={
            <FplTeamsTable
              fplTeams={fplTeams}
              fetchFplTeams={fetchFplTeams}
              updateFplTeamsSort={updateFplTeamsSort}
            />
          }
        />
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    auth: {
      user,
      errors,
      submitting
    },
    fplTeams
  } = state

  return {
    user,
    errors,
    submitting,
    fplTeams
  }
}

const matchDispatchToProps = {
  initializeAuth: authActions.initializeAuth,
  updateUser: authActions.updateUser,
  changePassword: authActions.changePassword,
  fetchFplTeams: fplTeamsActions.fetchFplTeams,
  updateFplTeamsSort: fplTeamsActions.updateFplTeamsSort
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfilePage)
