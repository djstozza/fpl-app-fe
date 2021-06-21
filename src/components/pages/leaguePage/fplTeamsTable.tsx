import { Fragment } from 'react'

import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import ActionsFooter from './actionsFooter'
import { initialFilterState } from 'state/league/reducer'

import type { League, FplTeam, Error } from 'types'

type Fpl_Team_Table_Cells = {
  [key: string]: {
    cellId: string,
    label: string,
    toolTipLabel: string,
    sortParam?: string,
    customRender?: Function
  }
}

type Props = {
  fplTeams: FplTeam[],
  league: League,
  fetchFplTeams: Function,
  generateDraftPicks: Function,
  createDraft: Function,
  submitting: boolean,
  sort: Object,
  leagueId: string,
  updateFplTeamsSort: Function,
  errors: Error[]
}

const FPL_TEAMS_TABLE_CELLS = {
  name: {
    cellId: 'name',
    label: 'N',
    toolTipLabel: 'Name',
    sticky: true,
    sortParam: 'name'
  },
  rank: {
    cellId: 'rank',
    label: 'R',
    toolTipLabel: 'Rank',
    sortParam: 'rank'
  },
  draftPickNumber: {
    cellId: 'draftPickNumber',
    label: 'DP',
    toolTipLabel: 'Draft Pick',
    sortParam: 'draft_pick_number'
  },
  miniDraftPickNumber: {
    cellId: 'miniDraftPickNumber',
    label: 'MP',
    toolTipLabel: 'Minidraft Pick',
    sortParam: 'mini_draft_pick_number'
  },
  owner: {
    cellId: 'owner',
    label: 'O',
    toolTipLabel: 'Owner',
    customRender: ({ owner: { username } }: FplTeam, classes) => username
  }
}

const FplTeamsTable = (props: Props) => {
  const {
    leagueId,
    league,
    fplTeams = [],
    fetchFplTeams,
    generateDraftPicks,
    createDraft,
    submitting,
    updateFplTeamsSort
  } = props

  const {
    showDraftPickColumn,
    showLiveColumns
  } = league

  const cells: Fpl_Team_Table_Cells = { ...FPL_TEAMS_TABLE_CELLS }

  if (!showDraftPickColumn) delete cells['draftPickNumber']
  if (!showLiveColumns) {
    delete cells['rank']
    delete cells['miniDraftPickNumber']
  }

  return (
    <Fragment>
      <SearchListener id={leagueId} fetchAction={fetchFplTeams} initialFilterState={initialFilterState}>
        <SortTable
          collection={fplTeams}
          handleSortChange={(newSort) => updateFplTeamsSort({ sort: newSort })}
          cells={Object.values(cells)}
        />
      </SearchListener>
      <ActionsFooter
        league={league}
        generateDraftPicks={generateDraftPicks}
        createDraft={createDraft}
        submitting={submitting}
      />
    </Fragment>
  )
}

export default FplTeamsTable