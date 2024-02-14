import { Fragment } from 'react'
import { makeStyles } from 'tss-react/mui'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme
} from '@mui/material'

import ActionsFooter from '../actionsFooter'
import type { League } from 'types'

type Props = {
  league: League,
  submitting: boolean,
  generateDraftPicks: (string) => void,
  createDraft: Function
}

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

const LeagueDetails = (props: Props) => {
  const {
    league,
    generateDraftPicks,
    createDraft,
    submitting
  } = props
  const { classes } = useStyles()

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
