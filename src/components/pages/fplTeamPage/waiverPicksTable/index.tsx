import { Fragment, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  TextField,
  MenuItem
} from '@mui/material'
import { range } from 'lodash'
import { useSnackbar } from 'notistack'

import SortTable from 'components/common/sortTable'
import {
  PLAYERS_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'
import Link from 'components/common/link'
import ContainedTeamCrestLink from 'components/common/teamCrestLink/contained'
import TabPanel from 'components/common/tabPanel'

import type { FplTeamContext } from '..'
import type { WaiverPick, FplTeamList, CellHash } from 'types'

const WaiverPicksTable = () => {
  const {
    isWaiver,
    waiverPicks: { data: waiverPicks, submitting, errors, fetching: waiverPicksFetching },
    fplTeamList: { data: { round: { current = false } = {} } = {} },
    selectedFplTeamListId,
    fetchWaiverPicks,
    changeWaiverPickOrder,
    fplTeamLists: { data: fplTeamLists },
    fplTeamId,
    fetchTrades,
    fplTeam: { isOwner },
    trades: { data: trades, fetching: tradesFetching },
    setTab,
    setAction
  } = useOutletContext<FplTeamContext>()
  const { enqueueSnackbar } = useSnackbar()

  const showTrades = window.location.pathname.includes('trades')
  const fetchAction = showTrades ? fetchTrades : fetchWaiverPicks
  const fetching = showTrades ? tradesFetching : waiverPicksFetching
  const name = showTrades ? 'trades' : 'waiver picks'
  const tab = showTrades ? 'trades' : 'waiverPicks'

  useEffect(() => {
    setTab(tab)
    setAction()
  }, [])

  useEffect(
    () => {
      if (!selectedFplTeamListId) return

      fetchAction(selectedFplTeamListId)
    }, [selectedFplTeamListId, fetchAction]
  )

  useEffect(
    () => {
      errors.forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

  const labelRenderer = ({ round: { name } }: FplTeamList) => name

  const cells: CellHash = {
    pickNumber: {
      cellId: 'pickNumber',
      label: 'PN',
      toolTipLabel: 'Pick Number',
      sticky: true,
      customRender: ({ id, pickNumber }: WaiverPick) => {
        if (!isWaiver || !current || !isOwner) return pickNumber

        return (
          <TextField
            select
            value={pickNumber}
            onChange={(e) => changeWaiverPickOrder(selectedFplTeamListId, id, e.target.value)}
            disabled={submitting}
          >
            {
              range(1, waiverPicks.length + 1).map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))
            }
          </TextField>
        )
      }
    },
    outPlayer: {
      cellId: 'outPlayer',
      label: 'OP',
      toolTipLabel: 'Out Player',
      customRender: ({ outPlayer: { id, firstName, lastName } }: WaiverPick) => {
        return (
          <Link to={`${PLAYERS_URL}/${id}`}>
            {firstName} {lastName}
          </Link>
        )
      }
    },
    outTeam: {
      cellId: 'outTeam',
      label: 'OT',
      toolTipLabel: 'Out Team',
      customRender: ({ outTeam }: WaiverPick) => <ContainedTeamCrestLink team={outTeam} />
    },
    inPlayer: {
      cellId: 'inPlayer',
      label: 'IP',
      toolTipLabel: 'In Player',
      customRender: ({ inPlayer: { id, firstName, lastName } }: WaiverPick) => {
        return (
          <Link to={`${PLAYERS_URL}/${id}`}>
            {firstName} {lastName}
          </Link>
        )
      }
    },
    inTeam: {
      cellId: 'inTeam',
      label: 'IT',
      toolTipLabel: 'In Team',
      customRender: ({ inTeam }: WaiverPick) => <ContainedTeamCrestLink team={inTeam} />
    },
    status: {
      cellId: 'status',
      label: 'S',
      toolTipLabel: 'Status'
    }
  }

  if (showTrades) {
    delete cells['pickNumber']
    delete cells['status']
  }

  if (!selectedFplTeamListId) return null

  return (
    <Fragment>
      <TabPanel
        collection={fplTeamLists}
        collectionId={selectedFplTeamListId}
        labelRenderer={labelRenderer}
        tab={showTrades ? 'trades' : 'waiverPicks'}
        url={`${FPL_TEAMS_URL}/${fplTeamId}/teamLists`}
      />
      <SortTable
        collection={showTrades ? trades : waiverPicks}
        cells={Object.values(cells)}
        fetching={fetching}
        name={name}
      />
    </Fragment>
  )
}

export default WaiverPicksTable
