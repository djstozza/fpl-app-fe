import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'

import { authActions } from 'state/auth'
import { LOGIN_URL } from 'utilities/constants'

import type { User } from 'types'

type Props = {
  user: User,
  updateSession: Function,
  children: any
}

export const PrivateRoute = (props: Props) => {
  const { user, updateSession, children } = props

  const { pathname } = useLocation()

  useEffect(
    () => {
      updateSession()
    }, [updateSession, pathname]
  )

  if (!user) return <Redirect to={LOGIN_URL} />
  return children
}

const mapStateToProps = (state) => {
  const {
    auth: { user }
  } = state

  return {
    user
  }
}

const matchDispatchToProps = {
  updateSession: authActions.updateSession
}

export default connect(mapStateToProps, matchDispatchToProps)(PrivateRoute)
