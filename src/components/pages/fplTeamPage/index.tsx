import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {
  Typography,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'

import { fplTeamActions } from 'state/fplTeam'
import Tabs from 'components/common/tabs'
import {
  FPL_TEAMS_URL
} from 'utilities/constants'
import FplTeamDetails from './fplTeamDetails'
import EditFplTeamForm from './editFplTeamForm'

import type { FplTeam, Error } from 'types'

type Props = {
  fplTeam: FplTeam,
  errors: Error[],
  submitting: boolean,
  fetchFplTeam: Function,
  updateFplTeam: Function,
  match: { params: { fplTeamId: string, tab: string } }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

const TABS = [
  { label: 'Details', value: 'details', display: true },
  { label: 'Team Lists', value: 'teamLists', display: true }
]

const FplTeamPage = (props: Props) => {
  const {
    fplTeam,
    errors,
    submitting,
    fetchFplTeam,
    updateFplTeam,
    match: { params: { fplTeamId, tab = 'details' } }
  } = props
  const classes = useStyles()

  useEffect(
    () => {
      fetchFplTeam(fplTeamId)
    }, [fetchFplTeam, fplTeamId]
  )

  if (!fplTeam) return null

  const { name } = fplTeam

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        {name}
      </Typography>
      <Tabs
        currentTab={tab}
        tabs={TABS}
        url={FPL_TEAMS_URL}
        id={fplTeamId}
      />
      <Switch>
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId`}
          render={() => (
            <FplTeamDetails
              fplTeam={fplTeam}
            />
          )}
        />
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId/details`}
          render={() => (
            <FplTeamDetails
              fplTeam={fplTeam}
            />
          )}
        />
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId/details/edit`}
          render={() => (
            <EditFplTeamForm
              fplTeam={fplTeam}
              errors={errors}
              submitting={submitting}
              updateFplTeam={updateFplTeam}
            />
          )}
        />
      </Switch>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    fplTeam: {
      data: fplTeam,
      errors,
      submitting
    }
  } = state

  return {
    fplTeam,
    errors,
    submitting
  }
}

const matchDispatchToProps = {
  fetchFplTeam: fplTeamActions.fetchFplTeam,
  updateFplTeam: fplTeamActions.updateFplTeam
}

export default connect(mapStateToProps, matchDispatchToProps)(FplTeamPage)
