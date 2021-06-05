import { Fragment } from 'react'
import {
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
  league: League
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
  const { league } = props
  const { isOwner } = league
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
      <div className={classes.actions}>
        {
          isOwner &&
          <ButtonLink
            to={`${LEAGUES_URL}/${league.id}/details/edit`}
            color='primary'
          >
            Edit Details
          </ButtonLink>
        }
      </div>
    </Fragment>
  )
}

export default LeagueDetails
