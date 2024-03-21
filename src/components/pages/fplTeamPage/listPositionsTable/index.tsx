import {
  Button
} from '@mui/material'

import SortTable from 'components/common/sortTable'
import { PLAYERS_URL } from 'utilities/constants'
import Link from 'components/common/link'
import ContainedTeamCrestLink from 'components/common/teamCrestLink/contained'
import StatusIconMapper from 'components/common/statusIconMapper'

import type { ListPosition, CellHash } from 'types'

type Props = {
  isOwner: boolean,
  isWaiver?: boolean,
  deadline?: Date,
  listPositions: ListPosition[],
  setOutListPosition: Function,
  fetching: boolean
}

export const listPositionTableCells = () => ({
  lastName: {
    cellId: 'lastName',
    label: 'LN',
    toolTipLabel: 'Last Name',
    sticky: true,
    customRender: ({ player }: ListPosition) => {
      const { id, lastName } = player

      return (
        <Link to={`${PLAYERS_URL}/${id}`}>
          {lastName}
        </Link>
      )
    }
  },
  firstName: {
    cellId: 'firstName',
    label: 'FN',
    toolTipLabel: 'First Name',
    customRender: ({ player }: ListPosition) => {
      const { id, firstName } = player

      return (
        <Link to={`${PLAYERS_URL}/${id}`}>
          {firstName}
        </Link>
      )
    }
  },
  team: {
    cellId: 'teams',
    label: 'T',
    toolTipLabel: 'Team',
    customRender: ({ team }: ListPosition) => <ContainedTeamCrestLink team={team} />
  },
  position: {
    cellId: 'position',
    label: 'P',
    toolTipLabel: 'Position',
    customRender: ({ position: { singularNameShort } }: ListPosition) => singularNameShort
  },
  totalPoints: {
    cellId: 'totalPoints',
    label: 'TP',
    toolTipLabel: 'Total Points',
    customRender: ({ player: { totalPoints } }: ListPosition) => totalPoints
  },
  status: {
    cellId: 'statuses',
    label: 'S',
    toolTipLabel: 'Status',
    filterParam: 'status',
    customRender: ({ player: { chanceOfPlayingThisRound, news, newsAdded, status } }: ListPosition) => (
      <StatusIconMapper status={status} news={news} newsAdded={newsAdded} chance={chanceOfPlayingThisRound} />
    )
  },
  role: {
    cellId: 'role',
    label: 'R',
    toolTipLabel: 'Role',
    customRender: ({ roleStr }: ListPosition) => roleStr
  }
})

const ListPositionsTable = (props: Props) => {
  const {
    isOwner,
    isWaiver,
    deadline,
    listPositions,
    setOutListPosition,
    fetching
  } = props

  let cells: CellHash = listPositionTableCells()
  if (deadline && isOwner) {
    cells = {
      ...cells,
      action: {
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
    }
  }

  return (
    <div data-testid='ListPositionsTable'>
      <SortTable
        collection={listPositions}
        cells={Object.values(cells)}
        fetching={fetching}
        name='list positions'
      />
    </div>
  )
}

export default ListPositionsTable
