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
import Link from 'components/common/link'
import {
  LEAGUES_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'

import type { FplTeam } from 'types'

type Props = {
  fplTeam: FplTeam
}

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      marginBottom: theme.spacing(2)
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  })
)

const FplTeamDetails = (props: Props) => {
  const {
    fplTeam
  } = props
  const { id, isOwner } = fplTeam
  const classes = useStyles()

  return (
    <Fragment>
      <Table
        className={classes.table}
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
        <div className={classes.actions}>
          <ButtonLink
            to={`${FPL_TEAMS_URL}/${id}/details/edit`}
            color='primary'
          >
            Edit Fpl Team
          </ButtonLink>
        </div>
      }
    </Fragment>
  )
}

export default FplTeamDetails
