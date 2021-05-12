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
import { PROFILE_URL } from 'utilities/constants'

import type { User, Error } from 'types'

type Props = {
  user: User,
  errors: Error[],
  updateUser: Function,
  initializeAuth: Function,
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
}

const ProfilePage = (props: Props) => {
  const {
    user,
    updateUser,
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
          path={`${PROFILE_URL}/details`}
          render={() => <UserDetails user={user} />}
        />
        <Route
          exact
          path={`${PROFILE_URL}/details/edit`}
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
  updateUser: authActions.updateUser
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfilePage)
