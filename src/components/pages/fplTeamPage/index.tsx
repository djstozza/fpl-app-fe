import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {
  Typography,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'

import Tabs from 'components/common/tabs'
import { fplTeamActions } from 'state/fplTeam'
import { fplTeamListsActions } from 'state/fplTeamLists'
import { fplTeamListActions } from 'state/fplTeamList'
import { listPositionActions } from 'state/listPosition'
import {
  FPL_TEAMS_URL
} from 'utilities/constants'
import FplTeamDetails from './fplTeamDetails'
import EditFplTeamForm from './editFplTeamForm'
import FplTeamListChart from './fplTeamListChart'
import FplTeamAlert from './fplTeamAlert'

import type { FplTeam, Error } from 'types'
import type { FplTeamListState } from 'state/fplTeamList'
import type { FplTeamListsState } from 'state/fplTeamLists'
import type { ListPositionState } from 'state/listPosition'

type Props = {
  fplTeam: FplTeam,
  errors: Error[],
  submitting: boolean,
  fetchFplTeam: Function,
  updateFplTeam: Function,
  fplTeamLists: FplTeamListsState,
  fplTeamList: FplTeamListState,
  listPosition: ListPositionState,
  fetchFplTeamLists: Function,
  fetchFplTeamList: Function,
  fetchValidSubstitutions: Function,
  processSubstitution: Function,
  clearValidSubstitutions: Function,
  fetchListPositions: Function,
  match: { params: { fplTeamId: string, tab: string, fplTeamListId: string } }
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
    fplTeamLists,
    fplTeamList,
    listPosition,
    fetchFplTeamLists,
    fetchFplTeamList,
    fetchValidSubstitutions,
    processSubstitution,
    clearValidSubstitutions,
    fetchListPositions,
    match: { params: { fplTeamId, tab = 'details', fplTeamListId } }
  } = props
  const classes = useStyles()

  useEffect(
    () => {
      fetchFplTeam(fplTeamId)
    }, [fetchFplTeam, fplTeamId]
  )

  useEffect(
    () => {
      fetchFplTeamLists(fplTeamId)
    }, [fetchFplTeamLists, fplTeamId]
  )

  if (!fplTeam) return null

  const { name, isOwner } = fplTeam
  const currentFplTeamList = fplTeamLists.data.find(({ round: { current } }) => current)

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
      <FplTeamAlert currentFplTeamList={currentFplTeamList} />
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
              submitting={submitting}
              errors={errors}
              updateFplTeam={updateFplTeam}
            />
          )}
        />
        <Route
          exact
          path={`${FPL_TEAMS_URL}/:fplTeamId/teamLists/:fplTeamListId?`}
          render={() => (
            <FplTeamListChart
              isOwner={isOwner}
              fplTeamId={fplTeamId}
              fplTeamListId={fplTeamListId}
              fplTeamLists={fplTeamLists}
              fplTeamList={fplTeamList}
              listPosition={listPosition}
              fetchValidSubstitutions={fetchValidSubstitutions}
              processSubstitution={processSubstitution}
              clearValidSubstitutions={clearValidSubstitutions}
              fetchFplTeamList={fetchFplTeamList}
              fetchListPositions={fetchListPositions}
              currentFplTeamList={currentFplTeamList}
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
    },
    fplTeamLists,
    fplTeamList,
    listPosition,
  } = state

  return {
    fplTeam,
    fplTeamLists,
    fplTeamList,
    errors,
    submitting,
    listPosition
  }
}

const matchDispatchToProps = {
  fetchFplTeam: fplTeamActions.fetchFplTeam,
  updateFplTeam: fplTeamActions.updateFplTeam,
  fetchFplTeamLists: fplTeamListsActions.fetchFplTeamLists,
  fetchFplTeamList: fplTeamListActions.fetchFplTeamList,
  fetchListPositions: fplTeamListActions.fetchListPositions,
  processSubstitution: fplTeamListActions.processSubstitution,
  fetchValidSubstitutions: listPositionActions.fetchValidSubstitutions,
  clearValidSubstitutions: listPositionActions.clearValidSubstitutions
}

export default connect(mapStateToProps, matchDispatchToProps)(FplTeamPage)
