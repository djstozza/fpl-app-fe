import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/fplTeams/reducer'
import Link from 'components/common/link'
import {
  FPL_TEAMS_URL,
  LEAGUES_URL
} from 'utilities/constants'

import type { FplTeam } from 'types'
import type { FplTeamsState } from 'state/fplTeams'

type Props = {
  fplTeams: FplTeamsState,
  fetchFplTeams: Function,
  updateFplTeamsSort: Function
}

const FPL_TEAMS_TABLE_CELLS = [
  {
    cellId: 'name',
    label: 'N',
    toolTipLabel: 'Name',
    sticky: true,
    sortParam: 'name',
    customRender: ({ id, name }: FplTeam) => (
      <Link to={`${FPL_TEAMS_URL}/${id}`}>
        {name}
      </Link>
    )
  },
  {
    cellId: 'league',
    label: 'L',
    toolTipLabel: 'League',
    customRender: ({ league: { id, name } }: FplTeam) => (
      <Link to={`${LEAGUES_URL}/${id}`}>
        {name}
      </Link>
    )
  },
  { cellId: 'rank', label: 'R', toolTipLabel: 'Rank', sortParam: 'rank' },
  { cellId: 'totalScore', label: 'TS', toolTipLabel: 'Total Score' },
  {
    cellId: 'draftPickNumber',
    label: 'DP',
    toolTipLabel: 'Draft Pick',
    sortParam: 'draft_pick_number'
  },
  {
    cellId: 'miniDraftPickNumber',
    label: 'MP',
    toolTipLabel: 'Minidraft Pick Number',
    sortParam: 'mini_draft_pick_number'
  }
]

const HistoryPastTable = (props: Props) => {
  const {
    fplTeams: { data: fplTeams },
    fetchFplTeams,
    updateFplTeamsSort
  } = props

  return (
    <SearchListener fetchAction={fetchFplTeams} initialFilterState={initialFilterState}>
      <SortTable
        collection={fplTeams}
        cells={FPL_TEAMS_TABLE_CELLS}
        handleSortChange={(newSort) => updateFplTeamsSort({ sort: newSort })}
      />
    </SearchListener>
  )
}

export default HistoryPastTable
