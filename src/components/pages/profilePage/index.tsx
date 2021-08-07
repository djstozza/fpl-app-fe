import { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Theme,
  Typography,
  makeStyles,
  createStyles
} from '@material-ui/core'
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
  initializeAuth: Function,
  changePassword: Function,
  fetchFplTeams: Function,
  updateFplTeamsSort: Function,
  fplTeams: FplTeamsState,
  submitting: boolean,
  match: { params: { tab: string, action: string } }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  leagues: { label: 'Leagues', value: 'leagues', display: true },
  fplTeams: { label: 'Fpl Teams', value: 'fplTeams', display: true }
}

const ProfilePage = (props: Props) => {
  const {
    user,
    updateUser,
    changePassword,
    errors = [],
    submitting,
    initializeAuth,
    fetchFplTeams,
    updateFplTeamsSort,
    fplTeams,
    match: { params: { tab = 'details', action } }
  } = props
  const { username } = user
  const classes = useStyles()

  TABS.details['extraTitleInfo'] = capitalize(action)

  return (
    <Fragment>
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
      <Switch>
        <Route
          exact
          path={PROFILE_URL}
          render={() => <UserDetails user={user} />}
        />
        <Route
          exact
          path={USER_DETAILS_URL}
          render={() => <UserDetails user={user} />}
        />
        <Route
          exact
          path={EDIT_USER_DETAILS_URL}
          render={
            () => (
              <UserEditForm
                user={user}
                errors={errors}
                updateUser={updateUser}
                submitting={submitting}
                initializeAuth={initializeAuth}
              />
            )
          }
        />
        <Route
          exact
          path={CHANGE_PASSWORD_URL}
          render={
            () => (
              <ChangePasswordForm
                errors={errors}
                changePassword={changePassword}
                submitting={submitting}
                initializeAuth={initializeAuth}
              />
            )
          }
        />
        <Route
          exact
          path={`${PROFILE_URL}${LEAGUES_URL}`}
          render={() => <LeaguesPage />}
        />
        <Route
          exact
          path={`${PROFILE_URL}${NEW_LEAGUE_URL}`}
          render={() => <CreateLeague />}
        />
        <Route
          exact
          path={`${PROFILE_URL}${JOIN_LEAGUE_URL}`}
          render={() => <JoinLeague />}
        />
        <Route
          exact
          path={`${PROFILE_URL}${FPL_TEAMS_URL}`}
          render={
            () => (
              <FplTeamsTable
                fplTeams={fplTeams}
                fetchFplTeams={fetchFplTeams}
                updateFplTeamsSort={updateFplTeamsSort}
              />
            )
          }
        />
      </Switch>
    </Fragment>
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
