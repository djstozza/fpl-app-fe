import { Fragment, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import { PLAYERS_URL } from 'utilities/constants'
import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/draftPicks/reducer'
import SearchListener from 'components/common/searchListener'
import Link from 'components/common/link'
import ContainedTeamCrestLink from 'components/common/teamCrestLink/contained'

import type { MiniDraftContext } from '..'
import type { MiniDraftPick } from 'types'

const MINI_DRAFT_PICKS_TABLE_CELLS = [
  { cellId: 'pickNumber', label: 'PN', toolTipLabel: 'Pick Number', sortParam: 'pickNumber', sticky: true },
  {
    cellId: 'outPlayer',
    label: 'OP',
    toolTipLabel: 'Out Player',
    customRender: ({ outPlayer, passed }: MiniDraftPick) => {
      if (passed) return '-'

      const { id, firstName, lastName } = outPlayer

      return (
        <Link to={`${PLAYERS_URL}/${id}`}>
          {firstName} {lastName}
        </Link>
      )
    }
  },
  {
    cellId: 'outTeam',
    label: 'OT',
    toolTipLabel: 'Out Team',
    customRender: ({ outTeam, passed }: MiniDraftPick) => passed ? '-' : <ContainedTeamCrestLink team={outTeam} />
  },
  {
    cellId: 'inPlayer',
    label: 'IP',
    toolTipLabel: 'In Player',
    customRender: ({ inPlayer, passed }: MiniDraftPick) => {
      if (passed) return '-'

      const { id, firstName, lastName } = inPlayer

      return (
        <Link to={`${PLAYERS_URL}/${id}`}>
          {firstName} {lastName}
        </Link>
      )
    }
  },
  {
    cellId: 'inTeam',
    label: 'IT',
    toolTipLabel: 'In Team',
    customRender: ({ inTeam, passed }: MiniDraftPick) => passed ? '-' : <ContainedTeamCrestLink team={inTeam} />
  },
  {
    cellId: 'positions',
    label: 'Pos',
    toolTipLabel: 'Position',
    sortParam: 'positions.singularNameShort',
    filterParam: 'positionId',
    customRender: ({ position, passed }: MiniDraftPick) => passed ? '-' :  position
  },
  {
    cellId: 'passed',
    label: 'Pass',
    toolTipLabel: 'Passed',
    filterParam: 'passed',
    customRender: ({ passed }: MiniDraftPick) => {
      if (passed) return 'Yes'

      return 'No'
    }
  },
  {
    cellId: 'fplTeams',
    label: 'FT',
    toolTipLabel: 'Fpl Team Name',
    sortParam: 'fplTeams.name',
    filterParam: 'fplTeamId',
    customRender: ({ fplTeam: { name } }: MiniDraftPick) => name
  },
  {
    cellId: 'username',
    label: 'UN',
    toolTipLabel: 'User Name',
    sortParam: 'users.username',
    customRender: ({ user: { username } }: MiniDraftPick) => username
  }
]

const MiniDraftPicksTable = () => {
  const {
    miniDraftPicks,
    fetchMiniDraftPicks,
    updateMiniDraftPicksSort,
    updateMiniDraftPicksFilter,
    fetchMiniDraftPickFacets,
    setTab
  } = useOutletContext<MiniDraftContext>()

  const { data, facets = {}, meta: { total }, season, fetching } = miniDraftPicks
  const tab = 'miniDraftPicks'

  useEffect(
    () => {
      setTab(tab)
    }, []
  )

  useEffect(
    () => {
      if (!season) return
      fetchMiniDraftPickFacets()
    }, [fetchMiniDraftPickFacets, season]
  )

  if (!season) return null

  return (
    <Fragment>
      <SearchListener fetchAction={fetchMiniDraftPicks} initialFilterState={initialFilterState}>
        <SortTable
          collection={data}
          facets={facets}
          handleSortChange={(newSort) => updateMiniDraftPicksSort(newSort)}
          handleFilterChange={(newFilter) => updateMiniDraftPicksFilter(newFilter)}
          cells={MINI_DRAFT_PICKS_TABLE_CELLS}
          total={total}
          fetching={fetching}
          name='mini draft picks'
          noOffset
        />
      </SearchListener>
    </Fragment>
  )
}


export default MiniDraftPicksTable
