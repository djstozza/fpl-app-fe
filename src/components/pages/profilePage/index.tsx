import { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Theme,
  Typography,
  makeStyles,
  createStyles
} from '@material-ui/core'

import { authActions } from 'state/auth'
import Tabs from 'components/common/tabs'
import UserDetails from './userDetails'
import UserEditForm from './userEditForm'
import ChangePasswordForm from './changePasswordForm'
import LeaguesPage from 'components/pages/leaguesPage'
import CreateLeagueForm from 'components/pages/leaguesPage/createLeagueForm'
import {
  PROFILE_URL,
  USER_DETAILS_URL,
  EDIT_USER_DETIALS_URL,
  CHANGE_PASSWORD_URL,
  LEAGUES_URL,
  NEW_LEAGUE_URL
} from 'utilities/constants'

import type { User, Error } from 'types'

type Props = {
  user: User,
  errors: Error[],
  updateUser: Function,
  initializeAuth: Function,
  changePassword: Function,
  fetchLeagues: Function,
  submitting: boolean,
  match: { params: { tab: string } }
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
  leagues: { label: 'Leagues', value: 'leagues', display: true }
}

const ProfilePage = (props: Props) => {
  const {
    user,
    updateUser,
    changePassword,
    errors = [],
    submitting,
    initializeAuth,
    match: { params: { tab = 'details' } }
  } = props
  const { username } = user
  const classes = useStyles()

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
          path={EDIT_USER_DETIALS_URL}
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
          render={() => <CreateLeagueForm />}
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
    }
  } = state

  return {
    user,
    errors,
    submitting
  }
}

const matchDispatchToProps = {
  initializeAuth: authActions.initializeAuth,
  updateUser: authActions.updateUser,
  changePassword: authActions.changePassword
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfilePage)
