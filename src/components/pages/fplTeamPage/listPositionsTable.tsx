import {
  Button
} from '@material-ui/core'

import SortTable from 'components/common/sortTable'
import { PLAYERS_URL } from 'utilities/constants'
import Link from 'components/common/link'
import TeamCrestLink from 'components/common/teamCrestLink'

import type { ListPosition } from 'types'

type Props = {
  isOwner: boolean,
  isWaiver: boolean,
  deadline?: Date,
  listPositions: ListPosition[],
  setOutListPosition: Function
}

const LIST_POSITION_TABLE_CELLS = [
  {
    cellId: 'lastName',
    label: 'LN',
    toolTipLabel: 'Last Name',
    sticky: true,
    customRender: ({ player }: ListPosition, classes) => {
      const { id, lastName } = player

      return (
        <Link to={`${PLAYERS_URL}/${id}`}>
          {lastName}
        </Link>
      )
    }
  },
  {
    cellId: 'firstName',
    label: 'FN',
    toolTipLabel: 'First Name',
    customRender: ({ player }: ListPosition, classes) => {
      const { id, firstName } = player

      return (
        <Link to={`${PLAYERS_URL}/${id}`}>
          {firstName}
        </Link>
      )
    }
  },
  {
    cellId: 'positions',
    label: 'P',
    toolTipLabel: 'Position',
    customRender: ({ position: { singularNameShort } }: ListPosition) => singularNameShort
  },
  {
    cellId: 'team',
    label: 'T',
    toolTipLabel: 'Team',
    customRender: ({ team }: ListPosition, classes) => <TeamCrestLink team={team} />
  },
  {
    cellId: 'role',
    label: 'R',
    toolTipLabel: 'Role',
    customRender: ({ roleStr }: ListPosition, classes) => roleStr
  }
]

const ListPositionsTable = (props: Props) => {
  const {
    isOwner,
    isWaiver,
    deadline,
    listPositions,
    setOutListPosition
  } = props

  let cells = LIST_POSITION_TABLE_CELLS
  if (deadline && isOwner) {
    cells = [
      ...cells,
      {
        cellId: 'action',
        label: '',
        toolTipLabel: '',
        customRender: (listPosition: ListPosition, classes) => (
          <Button
            className={classes.noWrap}
            size='small'
            color='secondary'
            variant='contained'
            onClick={() => setOutListPosition(listPosition)}
          >
            {isWaiver ? 'Waiver' : 'Trade'} out
          </Button>
        )
      }
    ]
  }

  return (
    <SortTable
      collection={listPositions}
      cells={cells}
    />
  )
}

export default ListPositionsTable
