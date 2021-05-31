import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button
} from '@material-ui/core'

import { leaguesActions } from 'state/leagues'
import { PROFILE_URL, NEW_LEAGUE_URL } from 'utilities/constants'

import type { League } from 'types'

type Props = {
  leagues: League[],
  fetchLeagues: Function
}

const LeaguesPage = (props: Props) => {
  const { leagues, fetchLeagues } = props

  useEffect(
    () => {
      fetchLeagues()
    }, [fetchLeagues]
  )
  return (
    <Button
      component={Link}
      to={`${PROFILE_URL}${NEW_LEAGUE_URL}`}
      variant='contained'
      color='primary'
    >
      New League
    </Button>
  )
}

const mapStateToProps = (state) => {
  const {
    leagues: {
      data: leagues = []
    }
  } = state

  return {
    leagues
  }
}

const matchDispatchToProps = {
  fetchLeagues: leaguesActions.fetchLeagues
}

export default connect(mapStateToProps, matchDispatchToProps)(LeaguesPage)
