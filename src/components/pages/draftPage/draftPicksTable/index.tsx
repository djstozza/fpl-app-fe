import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL, PLAYERS_URL } from 'utilities/constants'
import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/draftPicks/reducer'
import SearchListener from 'components/common/searchListener'
import Link from 'components/common/link'

import type { DraftContext } from '..'
import type { DraftPick } from 'types'

const DRAFT_PICKS_TABLE_CELLS = [
  { cellId: 'pickNumber', label: 'PN', toolTipLabel: 'Pick Number', sortParam: 'pickNumber', sticky: true },
  {
    cellId: 'lastName',
    label: 'LN',
    toolTipLabel: 'Last Name',
    sortParam: 'lastName',
    customRender: ({ player, miniDraft }: DraftPick) => {
      if (miniDraft) return '-'
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
    customRender: ({ player, miniDraft }: DraftPick) => {
      if (miniDraft) return '-'
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
    customRender: ({ team, miniDraft }: DraftPick, classes) => {
      if (miniDraft) return '-'
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
    customRender: ({ position, miniDraft }: DraftPick) => miniDraft ? '-' :  position
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

const DraftPicksTable = () => {
  const {
    draftPicks,
    fetchDraftPicks,
    updateDraftPicksSort,
    updateDraftPicksFilter,
    fetchDraftPickFacets,
    setTab
  } = useOutletContext<DraftContext>()

  const tab = 'draftPicks'

  useEffect(() => {
    setTab(tab)
  }, [])

  useEffect(
    () => {
      fetchDraftPickFacets()
    }, [fetchDraftPickFacets]
  )

  const { data, facets, meta: { total }, fetching } = draftPicks

  return (
    <div data-testid='DraftPicksTable'>
      <SearchListener fetchAction={fetchDraftPicks} initialFilterState={initialFilterState}>
        <SortTable
          collection={data}
          facets={facets}
          handleSortChange={(newSort) => updateDraftPicksSort(newSort)}
          handleFilterChange={(newFilter) => updateDraftPicksFilter(newFilter)}
          cells={DRAFT_PICKS_TABLE_CELLS}
          total={total}
          fetching={fetching}
          name='draft picks'
          noOffset
        />
      </SearchListener>
    </div>
  )
}


export default DraftPicksTable
