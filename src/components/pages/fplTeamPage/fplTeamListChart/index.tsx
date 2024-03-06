import { useState, useEffect, useCallback } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { groupBy } from 'lodash'
import { makeStyles } from 'tss-react/mui'
import { Box, Theme } from '@mui/material'
import { colors } from 'utilities/colors'
import TabPanel from 'components/common/tabPanel'

import ListPositionBox from './listPositionBox'
import {
  FPL_TEAMS_URL,
  cable
} from 'utilities/constants'

import type { FplTeamContext } from '..'
import type { ListPosition, FplTeamList, ListPositionChartDisplay } from 'types'

interface GroupedListPositions {
  [key: string]: ListPositionChartDisplay[]
}

const useStyles = makeStyles()((theme: Theme) => ({
  crest: {
    maxHeight: theme.spacing(3.5)
  },

  large: {
    maxHeight: theme.spacing(4)
  },

  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },

  startingContainer: {
    position: 'relative',
    backgroundColor: colors.green800
  },

  startingRow: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center'
  },

  substitutesContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column'
    }
  },

  penaltyBoxBottom: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    top: 0,
    width: theme.spacing(30),
    height: theme.spacing(10),
    left: '50%',
    marginLeft: 'auto',
    marginRight: 'audo',
    border: `1px solid ${colors.white}`,
    zIndex: 1
  },

  penaltyBoxTop: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    bottom: 0,
    width: theme.spacing(30),
    height: theme.spacing(10),
    left: '50%',
    marginLeft: 'auto',
    marginRight: 'audo',
    border: `1px solid ${colors.white}`,
    zIndex: 1
  },

  goalkeeperBoxBottom: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    bottom: 0,
    width: theme.spacing(15),
    height: theme.spacing(5),
    left: '50%',
    marginLeft: 'auto',
    marginRight: 'audo',
    border: `1px solid ${colors.white}`,
    zIndex: 1,
    background: `repeating-conic-gradient(${colors.green800} 0% 25%, ${colors.green500} 0% 50%) 50% / ${theme.spacing(2.5)} ${theme.spacing(2.5)}`
  },

  goalkeeperBoxTop: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    top: 0,
    width: theme.spacing(15),
    height: theme.spacing(5),
    left: '50%',
    marginLeft: 'auto',
    marginRight: 'audo',
    border: `1px solid ${colors.white}`,
    zIndex: 1,
    background: `repeating-conic-gradient(${colors.green800} 0% 25%, ${colors.green500} 0% 50%) 50% / ${theme.spacing(2.5)} ${theme.spacing(2.5)}`
  },

  halfWayLine: {
    position: 'absolute',
    bottom: '49.7%',
    width: `100%`,
    border: `1px solid ${colors.white}`,
    zIndex: 1
  },

  penaltyBoxSemiCircleBottom: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    bottom: theme.spacing(10),
    height: theme.spacing(5),
    left: '50%',
    width: theme.spacing(10),
    borderTopLeftRadius: theme.spacing(11),
    borderTopRightRadius: theme.spacing(11),
    border: `1px solid ${colors.white}`,
    zIndex: 1,
    background: `repeating-conic-gradient(${colors.green800} 0% 25%, ${colors.green500} 0% 50%) 50% / ${theme.spacing(2.5)} ${theme.spacing(2.5)}`
  },

  penaltyBoxSemiCircleTop: {
    position: 'absolute',
    top: theme.spacing(10),
    height: theme.spacing(5),
    left: '50%',
    width: theme.spacing(10),
    borderBottomLeftRadius: theme.spacing(11),
    borderBottomRightRadius: theme.spacing(11),
    border: `1px solid ${colors.white}`,
    zIndex: 1,
    transform: `translate(-50%, 0)`,
    background: `repeating-conic-gradient(${colors.green800} 0% 25%, ${colors.green500} 0% 50%) 50% / ${theme.spacing(2.5)} ${theme.spacing(2.5)}`
  },

  centerCircle: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    bottom: '40%',
    left: '50%',
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: '50%',
    border: `1px solid ${colors.white}`,
    zIndex: 0,
    background: `repeating-conic-gradient(${colors.green800} 0% 25%, ${colors.green500} 0% 50%) 50% / ${theme.spacing(2.5)} ${theme.spacing(2.5)}`
  },

  penaltySpotTop: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    top: theme.spacing(7.5),
    left: '50%',
    backgroundColor: colors.white,
    width: theme.spacing(0.8),
    height: theme.spacing(0.8),
    borderRadius: '50%',
    border: `1px solid ${colors.white}`,
    zIndex: 1
  },

  penaltySpotBottom: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    bottom: theme.spacing(7.5),
    left: '50%',
    backgroundColor: colors.white,
    width: theme.spacing(0.75),
    height: theme.spacing(0.75),
    borderRadius: '50%',
    border: `1px solid ${colors.white}`,
    zIndex: 1
  },

  centerSpot: {
    position: 'absolute',
    transform: `translate(-50%, 0)`,
    bottom: '49.2%',
    left: '50%',
    backgroundColor: colors.white,
    width: theme.spacing(0.75),
    height: theme.spacing(0.75),
    borderRadius: '50%',
    border: `1px solid ${colors.white}`,
    zIndex: 2
  }
}))

const FplTeamListChart = () => {
  const {
    fplTeamId,
    fplTeam: { isOwner },
    fplTeamLists: { data: fplTeamLists },
    fplTeamList: { data: fplTeamList, listPositions, submitting, errors },
    listPosition,
    fetchValidSubstitutions,
    processSubstitution,
    clearValidSubstitutions,
    selectedFplTeamListId,
    fetchFplTeamList,
    setTab,
    setAction
  } = useOutletContext<FplTeamContext>()
  const [selectedListPositionId, setSelectedListPositionId] = useState()
  const [fplTeamListUpdatedAt, setFplTeamListUpdatedAt] = useState(0)
  const { enqueueSnackbar } = useSnackbar()
  const tab = 'teamLists'

  const { validSubstitutions, fetching } = listPosition

  const { classes } = useStyles()

  useEffect(() => {
    setTab(tab)
    setAction()
  }, [])

  const handleReceived = useCallback(
    ({ updatedAt }) => {
      if (updatedAt <= fplTeamListUpdatedAt) return

      fetchFplTeamList(selectedFplTeamListId)
      setFplTeamListUpdatedAt(updatedAt)
    }, [selectedFplTeamListId, fetchFplTeamList, setFplTeamListUpdatedAt, fplTeamListUpdatedAt]
  )

  useEffect(
    () => {
      errors.forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

  useEffect(
    () => {
      if (!selectedFplTeamListId) return
      let isActive = true

      cable.subscriptions.create(
        { channel: 'FplTeamListScoreChannel', fpl_team_list_id: selectedFplTeamListId },
        { received: received  => { if (isActive) handleReceived(received) } }
      )

      return () => { isActive = false }
    }, [handleReceived, selectedFplTeamListId]
  )

  if (!fplTeamList || !listPositions.length) return null

  const { round: { deadlineTime, current } } = fplTeamList
  const canSubstitute = current && new Date() < new Date(deadlineTime) && isOwner
  const starting = listPositions.filter(({ roleStr }) => roleStr === 'Starting')
  const substitutes = listPositions.filter(({ roleStr }) => roleStr !== 'Starting')
  // Players may have two fixtures in a round
  const consolidatedListPositions = (arg: ListPosition[]) => Object.values(arg).reduce((result, listPosition) => {
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

  const groupedListPositions: GroupedListPositions = groupBy(
    consolidatedListPositions(starting),
    ({ position: { singularNameShort } }) => singularNameShort
  )
  const consolidatedSubstitutes = consolidatedListPositions(substitutes)

  const labelRenderer = ({ round: { name } }: FplTeamList) => name

  if (!selectedFplTeamListId) return null

  return (
    <div data-testid='FplTeamListChart'>
      <TabPanel
        collection={fplTeamLists}
        collectionId={selectedFplTeamListId}
        labelRenderer={labelRenderer}
        url={`${FPL_TEAMS_URL}/${fplTeamId}/teamLists`}
      />
      <div className={classes.chartContainer}>
        <div className={classes.startingContainer}>
          {
            Object.values(groupedListPositions).map((listPositions, i) => (
              <Box key={i} className={classes.startingRow}>
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
              </Box>
            ))
          }

          <div className={classes.goalkeeperBoxTop}>
          </div>
          <div className={classes.penaltySpotTop}>
          </div>
          <div className={classes.penaltyBoxTop}>
          </div>
          <div className={classes.penaltyBoxSemiCircleTop}>
          </div>

          <div className={classes.centerSpot}>
          </div>
          <div className={classes.centerCircle}>
          </div>
          <div className={classes.halfWayLine}>
          </div>

          <div className={classes.penaltyBoxSemiCircleBottom}>
          </div>
          <div className={classes.penaltyBoxBottom}>
          </div>
          <div className={classes.penaltySpotBottom}>
          </div>
          <div className={classes.goalkeeperBoxBottom}>
          </div>
        </div>
        <Box className={classes.substitutesContainer}>
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
        </Box>
      </div>
    </div>
  )
}

export default FplTeamListChart
