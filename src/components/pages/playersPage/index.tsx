import { useEffect } from 'react'
import { connect } from 'react-redux'

import { playersActions } from 'state/players'
import { PLAYERS_URL, TITLE } from 'utilities/constants'
import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/players/reducer'
import SearchListener from 'components/common/searchListener'
import Link from 'components/common/link'
import ContainedTeamCrestLink from 'components/common/teamCrestLink/contained'
import StatusIconMapper from 'components/common/statusIconMapper'

import { makeStyles } from 'tss-react/mui'
import { Theme, Typography } from '@mui/material'

import type { PlayersState } from 'state/players'
import type { PlayerSummary } from 'types'

type Props = {
  players: PlayersState,
  fetchPlayers: Function,
  fetchFacets: Function,
  updateFilter: Function,
  updateSort: Function,
  updatePage: Function
}

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  }
}))

export const playersTableCells = () => ({
  lastName: {
    cellId: 'lastName',
    label: 'LN',
    toolTipLabel: 'Last Name',
    sticky: true,
    sortParam: 'lastName',
    customRender: ({ lastName, id }: PlayerSummary) => (
      <Link to={`${PLAYERS_URL}/${id}`}>
        {lastName}
      </Link>
    )
  },
  firstName: {
    cellId: 'firstName',
    label: 'FN',
    toolTipLabel: 'First Name',
    sortParam: 'firstName',
    customRender: ({ firstName, id }: PlayerSummary) => (
      <Link to={`${PLAYERS_URL}/${id}`}>
        {firstName}
      </Link>
    )
  },
  teams: {
    cellId: 'teams',
    label: 'T',
    toolTipLabel: 'Team',
    sortParam: 'teams.shortName',
    filterParam: 'teamId',
    customRender: ({ team }: PlayerSummary) => <ContainedTeamCrestLink team={team} />
  },
  positions: {
    cellId: 'positions',
    label: 'P',
    toolTipLabel: 'Position',
    sortParam: 'positions.singularNameShort',
    filterParam: 'positionId',
    customRender: ({ position: { singularNameShort }}: PlayerSummary) => singularNameShort
  },
  status: {
    cellId: 'statuses',
    label: 'S',
    toolTipLabel: 'Status',
    filterParam: 'status',
    customRender: ({ chanceOfPlayingThisRound, news, newsAdded, status }: PlayerSummary) => (
      <StatusIconMapper status={status} news={news} newsAdded={newsAdded} chance={chanceOfPlayingThisRound} />
    )
  },
  totalPoints: { cellId: 'totalPoints', label: 'TP', toolTipLabel: 'Total Points', sortParam: 'totalPoints' },
  goalsScored: { cellId: 'goalsScored', label: 'GS', toolTipLabel: 'Goals Scored', sortParam: 'goalsScored' },
  assists: { cellId: 'assists', label: 'A', toolTipLabel: 'Assists', sortParam: 'assists' },
  yellowCards: { cellId: 'yellowCards', label: 'YC', toolTipLabel: 'Yellow Cards', sortParam: 'yellowCards' },
  redCards: { cellId: 'redCards', label: 'RC', toolTipLabel: 'Red Cards', sortParam: 'redCards' },
  bonus: { cellId: 'bonus', label: 'BP', toolTipLabel: 'Bonus Points', sortParam: 'bonus' },
  cleanSheets: { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets', sortParam: 'cleanSheets' },
  saves: { cellId: 'saves', label: 'S', toolTipLabel: 'Saves', sortParam: 'saves' },
  penaltiesSaved: {
    cellId: 'penaltiesSaved',
    label: 'PS',
    toolTipLabel: 'Penalties Saved',
    sortParam: 'penaltiesSaved'
  },
  penaltiesMissed: {
    cellId: 'penaltiesMissed',
    label: 'PM',
    toolTipLabel: 'Penalties Missed',
    sortParam: 'penaltiesMissed'
  },
  ownGoals: { cellId: 'ownGoals', label: 'OG', toolTipLabel: 'Own Goals', sortParam: 'ownGoals' }
})

export const PlayersPage = (props: Props) => {
  const {
    players: { data: players, fetching, facets = {}, meta: { total } },
    fetchPlayers,
    fetchFacets,
    updateFilter,
    updateSort,
    updatePage
  } = props

  const { classes } = useStyles()

  useEffect(
    () => {
      fetchFacets()
    }, [fetchFacets]
  )

  document.title = `${TITLE} - Players`

  return (
    <div data-testid='PlayersPage'>
      <Typography variant='h4' className={classes.title}>
        Players
      </Typography>
      <SearchListener fetchAction={fetchPlayers} initialFilterState={initialFilterState}>
        <SortTable
          collection={players}
          facets={facets}
          handleSortChange={(newSort) => updateSort(newSort)}
          handleFilterChange={(newFilter) => updateFilter(newFilter)}
          handleChangePage={(newOffset) => updatePage(newOffset)}
          cells={Object.values(playersTableCells())}
          total={total}
          fetching={fetching}
          name='players'
        />
      </SearchListener>
    </div>
  )
}

const mapStateToProps = ({ players }) => ({
  players
})

const matchDispatchToProps = {
  fetchPlayers: playersActions.fetchPlayers,
  fetchFacets: playersActions.fetchFacets,
  updateFilter: playersActions.updateFilter,
  updateSort: playersActions.updateSort,
  updatePage: playersActions.updatePage
}


export default connect(mapStateToProps, matchDispatchToProps)(PlayersPage)
