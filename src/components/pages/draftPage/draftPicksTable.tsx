import { Fragment, useEffect } from 'react'

import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL, PLAYERS_URL } from 'utilities/constants'
import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/draftPicks/reducer'
import SearchListener from 'components/common/searchListener'
import Link from 'components/common/link'

import type { DraftPicksState } from 'state/draftPicks'
import type { DraftPick } from 'types'

type Props = {
  draftPicks: DraftPicksState,
  fetchDraftPicks: Function,
  updateDraftPicksFilter: Function,
  updateDraftPicksSort: Function,
  updateDraftPicksPage: Function,
  fetchDraftPickFacets: Function
}

const DRAFT_PICKS_TABLE_CELLS = [
  { cellId: 'pickNumber', label: 'PN', toolTipLabel: 'Pick Number', sortParam: 'pickNumber', sticky: true },
  {
    cellId: 'lastName',
    label: 'LN',
    toolTipLabel: 'Last Name',
    sortParam: 'lastName',
    customRender: ({ player }: DraftPick, classes) => {
      if (!player) return null

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
    sortParam: 'firstName',
    customRender: ({ player }: DraftPick, classes) => {
      if (!player) return null

      const { id, firstName } = player

      return (
        <Link to={`${PLAYERS_URL}/${id}`}>
          {firstName}
        </Link>
      )
    }
  },
  {
    cellId: 'teams',
    label: 'T',
    toolTipLabel: 'Team',
    sortParam: 'teams.shortName',
    filterParam: 'teamId',
    customRender: ({ team }: DraftPick, classes) => {
      if (!team) return null

      const { id, shortName } = team

      return (
        <Link to={`${TEAMS_URL}/${id}`} image>
          <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
          <div>
            {shortName}
          </div>
        </Link>
      )
    }
  },
  {
    cellId: 'positions',
    label: 'P',
    toolTipLabel: 'Position',
    sortParam: 'positions.singularNameShort',
    filterParam: 'positionId',
    customRender: ({ position }: DraftPick) => position
  },
  {
    cellId: 'miniDraft',
    label: 'MD',
    toolTipLabel: 'Mini Draft',
    filterParam: 'miniDraft',
    customRender: ({ miniDraft }: DraftPick) => {
      if (miniDraft === false) return 'No'
      if (miniDraft) return 'Yes'

      return null
    }
  },
  {
    cellId: 'fplTeams',
    label: 'FT',
    toolTipLabel: 'Fpl Team Name',
    sortParam: 'fplTeams.name',
    filterParam: 'fplTeamId',
    customRender: ({ fplTeam: { name } }: DraftPick) => name
  },
  {
    cellId: 'username',
    label: 'UN',
    toolTipLabel: 'User Name',
    sortParam: 'users.username',
    customRender: ({ user: { username } }: DraftPick) => username
  }
]

const DraftPicksTable = (props: Props) => {
  const {
    draftPicks,
    fetchDraftPicks,
    updateDraftPicksPage,
    updateDraftPicksSort,
    updateDraftPicksFilter,
    fetchDraftPickFacets
  } = props

  useEffect(
    () => {
      fetchDraftPickFacets()
    }, [fetchDraftPickFacets]
  )

  const { data, facets = {}, meta: { total } } = draftPicks

  return (
    <Fragment>
      <SearchListener fetchAction={fetchDraftPicks} initialFilterState={initialFilterState}>
        <SortTable
          collection={data}
          facets={facets}
          handleSortChange={(newSort) => updateDraftPicksSort(newSort)}
          handleFilterChange={(newFilter) => updateDraftPicksFilter(newFilter)}
          handleChangePage={(newOffset) => updateDraftPicksPage(newOffset)}
          cells={DRAFT_PICKS_TABLE_CELLS}
          total={total}
        />
      </SearchListener>
    </Fragment>
  )
}


export default DraftPicksTable
