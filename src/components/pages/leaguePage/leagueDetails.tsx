import { Fragment } from 'react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'

import ButtonLink from 'components/common/buttonLink'

import { LEAGUES_URL } from 'utilities/constants'

import type { League } from 'types'

type Props = {
  league: League,
  submitting: boolean,
  generateDraftPicks: Function
}

const LEAGUE_DETAILS_ROWS = [
  { rowId: 'status', label: 'Status' },
  {
    rowId: 'owner',
    label: 'Owner',
    customRender: ({ owner: { username } }: League) => username
  }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      marginBottom: theme.spacing(2)
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  })
)

const LeagueDetails = (props: Props) => {
  const { league, generateDraftPicks, submitting } = props
  const { id, isOwner, canGenerateDraftPicks } = league
  const classes = useStyles()

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
      {
        isOwner &&
        <div className={classes.actions}>
          <ButtonLink
            to={`${LEAGUES_URL}/${league.id}/details/edit`}
            color='primary'
            rightMargin={canGenerateDraftPicks}
          >
            Edit Details
          </ButtonLink>
          {
            canGenerateDraftPicks &&
            <Button
              variant='contained'
              color='default'
              onClick={() => generateDraftPicks(id)}
              disabled={submitting}
            >
              Generate draft picks
            </Button>
          }
        </div>
      }
    </Fragment>
  )
}

export default LeagueDetails
