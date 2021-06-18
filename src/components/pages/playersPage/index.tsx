import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'

import { playersActions } from 'state/players'
import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL, PLAYERS_URL } from 'utilities/constants'
import SortTable from 'components/common/sortTable'
import { initialFilterState } from 'state/players/reducer'
import SearchListener from 'components/common/searchListener'
import Link from 'components/common/link'

import {
  Theme,
  Typography,
  makeStyles,
  createStyles
} from '@material-ui/core'

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

export const PLAYERS_TABLE_CELLS = [
  {
    cellId: 'lastName',
    label: 'LN',
    toolTipLabel: 'Last Name',
    sticky: true,
    sortParam: 'lastName',
    customRender: ({ lastName, id }: PlayerSummary, classes) => (
      <Link to={`${PLAYERS_URL}/${id}`}>
        {lastName}
      </Link>
    )
  },
  {
    cellId: 'firstName',
    label: 'FN',
    toolTipLabel: 'First Name',
    sortParam: 'firstName',
    customRender: ({ firstName, id }: PlayerSummary, classes) => (
      <Link to={`${PLAYERS_URL}/${id}`}>
        {firstName}
      </Link>
    )
  },
  {
    cellId: 'teams',
    label: 'T',
    toolTipLabel: 'Team',
    sortParam: 'teams.shortName',
    filterParam: 'teamId',
    customRender: ({ team: { shortName, id } }: PlayerSummary, classes) => (
      <Link to={`${TEAMS_URL}/${id}`} image>
        <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
        <div>
          {shortName}
        </div>
      </Link>
    )
  },
  {
    cellId: 'positions',
    label: 'P',
    toolTipLabel: 'Position',
    sortParam: 'positions.singularNameShort',
    filterParam: 'positionId',
    customRender: ({ position: { singularNameShort }}: PlayerSummary) => singularNameShort
  },
  { cellId: 'totalPoints', label: 'TP', toolTipLabel: 'Total Points', sortParam: 'totalPoints' },
  { cellId: 'goalsScored', label: 'GS', toolTipLabel: 'Goals Scored', sortParam: 'goalsScored' },
  { cellId: 'assists', label: 'A', toolTipLabel: 'Assists', sortParam: 'assists' },
  { cellId: 'yellowCards', label: 'YC', toolTipLabel: 'Yellow Cards', sortParam: 'yellowCards' },
  { cellId: 'redCards', label: 'RC', toolTipLabel: 'Red Cards', sortParam: 'redCards' },
  { cellId: 'bonus', label: 'BP', toolTipLabel: 'Bonus Points', sortParam: 'bonus' },
  { cellId: 'cleanSheets', label: 'CS', toolTipLabel: 'Clean Sheets', sortParam: 'cleanSheets' },
  { cellId: 'saves', label: 'S', toolTipLabel: 'Saves', sortParam: 'saves' },
  { cellId: 'penaltiesSaved', label: 'PS', toolTipLabel: 'Penalties Saved', sortParam: 'penaltiesSaved' },
  { cellId: 'penaltiesMissed', label: 'PM', toolTipLabel: 'Penalties Missed', sortParam: 'penaltiesMissed' },
  { cellId: 'ownGoals', label: 'OG', toolTipLabel: 'Own Goals', sortParam: 'ownGoals' }
]

const PlayersPage = (props: Props) => {
  const {
    players: { data: players, facets = {}, meta: { total } },
    fetchPlayers,
    fetchFacets,
    updateFilter,
    updateSort,
    updatePage
  } = props

  const classes = useStyles()

  useEffect(
    () => {
      fetchFacets()
    }, [fetchFacets]
  )

  return (
    <Fragment>
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
          cells={PLAYERS_TABLE_CELLS}
          total={total}
        />
      </SearchListener>
    </Fragment>
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
