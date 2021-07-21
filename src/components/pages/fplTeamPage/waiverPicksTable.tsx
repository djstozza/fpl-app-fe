import { Fragment, useEffect } from 'react'
import {
  TextField,
  MenuItem
} from '@material-ui/core'
import { range } from 'lodash'
import { useSnackbar } from 'notistack'

import SortTable from 'components/common/sortTable'
import {
  PLAYERS_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'
import Link from 'components/common/link'
import TeamCrestLink from 'components/common/teamCrestLink'
import TabPanel from 'components/common/tabPanel'

import type { FplTeamListsState } from 'state/fplTeamLists'
import type { FplTeamListState } from 'state/fplTeamList'
import type { WaiverPicksState } from 'state/waiverPicks'
import type { WaiverPick, FplTeamList } from 'types'

type Props = {
  isOwner: boolean,
  isWaiver: boolean,
  waiverPicks: WaiverPicksState,
  fplTeamList: FplTeamListState,
  selectedFplTeamListId?: string,
  fetchWaiverPicks: Function,
  changeWaiverPickOrder: Function,
  fplTeamLists: FplTeamListsState,
  fplTeamId: string
}

const WaiverPicksTable = (props: Props) => {
  const {
    isOwner,
    isWaiver,
    waiverPicks: { data: waiverPicks, submitting, errors },
    fplTeamList: { data: { round: { current = false } = {} } = {} },
    selectedFplTeamListId,
    fetchWaiverPicks,
    changeWaiverPickOrder,
    fplTeamLists: { data: fplTeamLists },
    fplTeamId
  } = props
  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      if (!selectedFplTeamListId) return

      fetchWaiverPicks(selectedFplTeamListId)
    }, [selectedFplTeamListId, fetchWaiverPicks]
  )

  useEffect(
    () => {
      errors.forEach(({ detail }) => enqueueSnackbar(detail, { variant: 'error' }))
    }, [enqueueSnackbar, errors]
  )

  const labelRenderer = ({ round: { name } }: FplTeamList) => name

  const cells = [
    {
      cellId: 'pickNumber',
      label: 'PN',
      toolTipLabel: 'Pick Number',
      customRender: ({ id, pickNumber }: WaiverPick, classes) => {
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
    {
      cellId: 'outPlayer',
      label: 'OP',
      toolTipLabel: 'Out Player',
      customRender: ({ outPlayer: { id, firstName, lastName } }: WaiverPick, classes) => {
        return (
          <Link to={`${PLAYERS_URL}/${id}`}>
            {firstName} {lastName}
          </Link>
        )
      }
    },
    {
      cellId: 'outTeam',
      label: 'OT',
      toolTipLabel: 'Out Team',
      customRender: ({ outTeam }: WaiverPick, classes) => <TeamCrestLink team={outTeam} />
    },
    {
      cellId: 'inPlayer',
      label: 'IP',
      toolTipLabel: 'In Player',
      customRender: ({ inPlayer: { id, firstName, lastName } }: WaiverPick, classes) => {
        return (
          <Link to={`${PLAYERS_URL}/${id}`}>
            {firstName} {lastName}
          </Link>
        )
      }
    },
    {
      cellId: 'inTeam',
      label: 'IT',
      toolTipLabel: 'In Team',
      customRender: ({ inTeam }: WaiverPick, classes) => <TeamCrestLink team={inTeam} />
    },
    {
      cellId: 'status',
      label: 'S',
      toolTipLabel: 'Status'
    }
  ]

  if (!selectedFplTeamListId) return null

  return (
    <Fragment>
      <TabPanel
        collection={fplTeamLists}
        collectionId={selectedFplTeamListId}
        labelRenderer={labelRenderer}
        tab='waiverPicks'
        url={`${FPL_TEAMS_URL}/${fplTeamId}/teamLists`}
      />
      <SortTable
        collection={waiverPicks}
        cells={cells}
      />
    </Fragment>
  )
}

export default WaiverPicksTable
