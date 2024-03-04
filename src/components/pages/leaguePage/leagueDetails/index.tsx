import { Fragment, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme
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

const useStyles = makeStyles()((theme: Theme) => ({
  table: {
    marginBottom: theme.spacing(2)
  }
}))

const LeagueDetails = () => {
  const {
    league,
    generateDraftPicks,
    createDraft,
    submitting,
    setTab,
    setAction
  } = useOutletContext<LeagueContext>()
  const { classes } = useStyles()

  const tab = 'details'
  
  useEffect(() => {
    setTab(tab)
    setAction()
  }, [])

  return (
    <Fragment>
      <Table
        className={classes.table}
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
    </Fragment>
  )
}

export default LeagueDetails
