import { useState } from 'react'
import { useParams, Outlet, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from 'tss-react/mui'
import { Theme, Typography } from '@mui/material'
import { capitalize } from 'lodash'

import { authActions } from 'state/auth'
import { fplTeamsActions } from 'state/fplTeams'
import Tabs from 'components/common/tabs'

import {
  PROFILE_URL
} from 'utilities/constants'

import type { User, Error } from 'types'
import type { FplTeamsState } from 'state/fplTeams'

export type ProfileProps = {
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

export const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  leagues: { label: 'Leagues', value: 'leagues', display: true },
  fplTeams: { label: 'Fpl Teams', value: 'fplTeams', display: true }
}

export const ProfilePage = (props: ProfileProps) => {
  const {
    user
  } = props
  const { username } = user
  const { classes } = useStyles()
  const { pathname } = useLocation()
  const matchedPath = pathname.match(/\/profile\/(\w+)(\/.*)?/) || []
  const tab = Object.keys(TABS).find(key => matchedPath[1] === key) || 'details'
  const { action } = useParams()

  TABS.details['extraTitleInfo'] = capitalize(action)

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
      <Outlet context={props} />
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
