import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box
} from '@mui/material'

import ButtonLink from 'components/common/buttonLink'
import Link from 'components/common/link'
import {
  LEAGUES_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'

import type { FplTeamContext } from '..'
import type { FplTeam } from 'types'

const FPL_TEAM_DETAILS_ROWS = [
  {
    rowId: 'league',
    label: 'League',
    customRender: ({ league: { id, name } }: FplTeam) => (
      <Link to={`${LEAGUES_URL}/${id}`}>
        {name}
      </Link>
    )
  },
  { rowId: 'rank', label: 'Rank' },
  { rowId: 'totalScore', label: 'Total Score' },
  { rowId: 'draftPickNumber', label: 'Draft Pick Number' },
  { rowId: 'miniDraftPickNumber', label: 'Mini Draft Pick Number' },
  {
    rowId: 'owner',
    label: 'Owner',
    customRender: ({ owner: { username } }: FplTeam) => username
  }
]

const FplTeamDetails = () => {
  const {
    fplTeam,
    setTab,
    setAction
  } = useOutletContext<FplTeamContext>()
  const { id, isOwner } = fplTeam
  const tab = 'details'

  useEffect(() => {
    setTab(tab)
    setAction()
  }, [])

  return (
    <div data-testid='FplTeamDetails'>
      <Table
        sx={(theme) => ({ marginBottom: theme.spacing(2) })}
        size='small'
      >
        <TableBody>
          {
            FPL_TEAM_DETAILS_ROWS.map(({ rowId, label, customRender }) => (
              <TableRow key={rowId}>
                <TableCell align='center'>
                  {label}
                </TableCell>
                <TableCell align='center'>
                  {customRender ? customRender(fplTeam) : fplTeam[rowId]}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      {
        isOwner &&
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonLink
            to={`${FPL_TEAMS_URL}/${id}/details/edit`}
            color='primary'
          >
            Edit Fpl Team
          </ButtonLink>
        </Box>
      }
    </div>
  )
}

export default FplTeamDetails
