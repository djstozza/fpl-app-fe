import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material'

import ActionsFooter from '../actionsFooter'
import type { LeagueContext } from '..'
import type { League } from 'types'

const LEAGUE_DETAILS_ROWS = [
  { rowId: 'status', label: 'Status' },
  {
    rowId: 'owner',
    label: 'Owner',
    customRender: ({ owner: { username } }: League) => username
  }
]

const LeagueDetails = () => {
  const {
    league,
    generateDraftPicks,
    createDraft,
    submitting,
    setTab,
    setAction
  } = useOutletContext<LeagueContext>()

  const tab = 'details'
  
  useEffect(() => {
    setTab(tab)
    setAction()
  }, [])

  return (
    <div data-testid='LeagueDetails'>
      <Table
        sx={(theme) => ({ marginBottom: theme.spacing(2) })}
        size='small'
      >
        <TableBody>
          {
            LEAGUE_DETAILS_ROWS.map(({ rowId, label, customRender }) => (
              <TableRow key={rowId}>
                <TableCell align='center'>
                  {label}
                </TableCell>
                <TableCell align='center'>
                  {customRender ? customRender(league) : league[rowId]}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <ActionsFooter
        league={league}
        generateDraftPicks={generateDraftPicks}
        createDraft={createDraft}
        submitting={submitting}
        detailsPage
      />
    </div>
  )
}

export default LeagueDetails
