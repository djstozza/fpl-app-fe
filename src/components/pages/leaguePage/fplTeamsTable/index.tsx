import { Fragment, useContext, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import ActionsFooter from '../actionsFooter'
import { initialFilterState } from 'state/league/reducer'
import { FPL_TEAMS_URL } from 'utilities/constants'
import Link from 'components/common/link'

import type { League, FplTeam, Error, CellHash } from 'types'
import type { LeagueContext } from '..'

type Props = {
  fplTeams: FplTeam[],
  league: League,
  fetchFplTeams: Function,
  generateDraftPicks: (string) => void,
  createDraft: Function,
  submitting: boolean,
  sort: Object,
  leagueId: string,
  updateFplTeamsSort: Function,
  errors: Error[],
  fetching: boolean
}

const FPL_TEAMS_TABLE_CELLS = {
  name: {
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
  rank: {
    cellId: 'rank',
    label: 'R',
    toolTipLabel: 'Rank',
    sortParam: 'rank'
  },
  totalScore: {
    cellId: 'totalScore',
    label: 'TS',
    toolTipLabel: 'Total Score'
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
    customRender: ({ owner: { username } }: FplTeam) => username
  }
}

const FplTeamsTable = () => {
  const {
    leagueId,
    league,
    fplTeams = [],
    fetchFplTeams,
    generateDraftPicks,
    createDraft,
    submitting,
    updateFplTeamsSort,
    fetching,
    setTab,
    setAction
  } =useOutletContext<LeagueContext>()

  const {
    showDraftPickColumn,
    showLiveColumns
  } = league

  const tab = 'fplTeams'

  const cells: CellHash = { ...FPL_TEAMS_TABLE_CELLS }

  if (!showDraftPickColumn) delete cells['draftPickNumber']
  if (!showLiveColumns) {
    delete cells['rank']
    delete cells['totalScore']
    delete cells['miniDraftPickNumber']
  }

  useEffect(() => {
    setTab(tab)
    setAction()
  }, [])

  return (
    <Fragment>
      <SearchListener id={leagueId} fetchAction={fetchFplTeams} initialFilterState={initialFilterState}>
        <SortTable
          collection={fplTeams}
          handleSortChange={(newSort) => updateFplTeamsSort({ sort: newSort })}
          cells={Object.values(cells)}
          fetching={fetching}
          name='Fpl teams'
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
