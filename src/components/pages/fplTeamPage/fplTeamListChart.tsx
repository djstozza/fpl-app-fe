import { Fragment, useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { groupBy } from 'lodash'
import {
  Grid,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'
import TabPanel from 'components/common/tabPanel'

import ListPositionBox from './listPositionBox'
import {
  FPL_TEAMS_URL
} from 'utilities/constants'

import type { FplTeamListsState } from 'state/fplTeamLists'
import type { FplTeamListState } from 'state/fplTeamList'
import type { ListPositionState } from 'state/listPosition'
import type { ListPosition, FplTeamList, ListPositionChartDisplay } from 'types'

type Props = {
  fplTeamId: string,
  fplTeamListId: string,
  fplTeamLists: FplTeamListsState,
  fplTeamList: FplTeamListState,
  listPosition: ListPositionState,
  fetchValidSubstitutions: Function,
  processSubstitution: Function,
  clearValidSubstitutions: Function,
  fetchFplTeamList: Function,
  fetchListPositions: Function,
  isOwner: boolean
  currentFplTeamList?: FplTeamList
}

interface GroupedListPositions {
  [key: string]: ListPositionChartDisplay[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    crest: {
      maxHeight: theme.spacing(3.5)
    },
    large: {
      maxHeight: theme.spacing(4)
    },
    startingContainer: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'center'
    },
    substitutesContainer: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-evenly',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'column'
      }
    },
    playerContainer: {
      paddingTop: theme.spacing(0.5),
      textAlign: 'center',
      border: '1px solid #ffffff',
      width: theme.spacing(15),
      color: '#ffffff'
    }
  })
)

const FplTeamListChart = (props: Props) => {
  const {
    fplTeamId,
    fplTeamListId,
    fplTeamLists: { data: fplTeamLists },
    fplTeamList: { data: fplTeamList, listPositions, submitting, errors },
    listPosition,
    fetchValidSubstitutions,
    processSubstitution,
    clearValidSubstitutions,
    fetchFplTeamList,
    fetchListPositions,
    currentFplTeamList,
    isOwner
  } = props
  const [selectedListPositionId, setSelectedListPositionId] = useState()
  const { enqueueSnackbar } = useSnackbar()

  const currentFplTeamListId = (currentFplTeamList || {}).id
  const lastFplTeamListId = fplTeamLists[fplTeamLists.length - 1]?.id
  const getSelectedFplteamListId = () => currentFplTeamListId || fplTeamListId || lastFplTeamListId
  const selectedFplTeamListId = getSelectedFplteamListId()

  const { validSubstitutions, fetching } = listPosition

  const classes = useStyles()

  useEffect(
    () => {
      if (!selectedFplTeamListId) return

      fetchFplTeamList(selectedFplTeamListId)
      fetchListPositions(selectedFplTeamListId)
    }, [fetchFplTeamList, fetchListPositions, selectedFplTeamListId]
  )

  useEffect(
    () => {
      errors.forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

  if (!fplTeamList) return null

  const { round: { deadlineTime, current } } = fplTeamList
  const canSubstitute = current && new Date() < new Date(deadlineTime) && isOwner

  const starting = listPositions.filter(({ roleStr }) => roleStr === 'Starting')
  const substitutes = listPositions.filter(({ roleStr }) => roleStr !== 'Starting')
  // Players may have two fixtures in a round
  const consolidatedListPositions = (arg: ListPosition[]) => Object.values(arg).reduce((result, listPosition, key) => {
    const { player: { id: playerId }, totalPoints, minutes, opponent, leg } = listPosition
    const existing = result.find(({ player: { id } }) => id === playerId)

    if (!existing) {
      result.push({
        ...listPosition,
        opponents: [opponent],
        legs: [leg]
      })
    } else {
      existing.opponents = [...existing.opponents, opponent]
      existing.legs = [...existing.legs, leg]
      if (existing.minutes && minutes) existing.minutes = existing.minutes + minutes
      if (existing.totalPoints && totalPoints) existing.totalPoints = existing.totalPoints + totalPoints
    }

    return result
  }, [] as ListPositionChartDisplay[])

  const groupedListPositions: GroupedListPositions = groupBy(consolidatedListPositions(starting), 'position')
  const consolidatedSubstitutes = consolidatedListPositions(substitutes)

  const labelRenderer = ({ round: { name } }: FplTeamList) => name

  return (
    <Fragment>
      <TabPanel
        collection={fplTeamLists}
        collectionId={selectedFplTeamListId}
        labelRenderer={labelRenderer}
        url={`${FPL_TEAMS_URL}/${fplTeamId}/teamLists`}
      />
      <Grid container>
        <Grid item sm={10} xs={12} style={{ backgroundColor: 'green'}}>
          {
            Object.values(groupedListPositions).map((listPositions, i) => (
              <div key={i} className={classes.startingContainer}>
                {
                  listPositions.map((listPosition, j) => (
                    <ListPositionBox
                      key={j}
                      fplTeamListId={selectedFplTeamListId}
                      listPosition={listPosition}
                      fetchValidSubstitutions={fetchValidSubstitutions}
                      selectedListPositionId={selectedListPositionId}
                      setSelectedListPositionId={setSelectedListPositionId}
                      validSubstitutions={validSubstitutions}
                      processSubstitution={processSubstitution}
                      clearValidSubstitutions={clearValidSubstitutions}
                      fetching={fetching}
                      submitting={submitting}
                      canSubstitute={canSubstitute}
                    />
                  ))
                }
              </div>
            ))
          }
        </Grid>
        <Grid item sm={2} xs={12}>
          <div className={classes.substitutesContainer}>
            {
              consolidatedSubstitutes.map((listPosition, j) => (
                <ListPositionBox
                  key={j}
                  fplTeamListId={selectedFplTeamListId}
                  listPosition={listPosition}
                  fetchValidSubstitutions={fetchValidSubstitutions}
                  selectedListPositionId={selectedListPositionId}
                  setSelectedListPositionId={setSelectedListPositionId}
                  validSubstitutions={validSubstitutions}
                  processSubstitution={processSubstitution}
                  clearValidSubstitutions={clearValidSubstitutions}
                  fetching={fetching}
                  submitting={submitting}
                  canSubstitute={canSubstitute}
                  substitute
                />
              ))
            }
          </div>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default FplTeamListChart
