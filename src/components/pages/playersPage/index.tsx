import { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import { playersActions } from 'state/players'
import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'
import SortTable from 'components/common/sortTable'

import {
  Theme,
  Typography,
  makeStyles,
  createStyles
} from '@material-ui/core'

import type { PlayerSummary, Facets } from 'types'

type Props = {
  players: PlayerSummary[],
  fetchPlayers: Function,
  fetchFacets: Function,
  updateQuery: Function,
  facets: Facets
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

const PLAYERS_TABLE_CELLS = [
  { cellId: 'lastName', label: 'LN', toolTipLabel: 'Last Name', sticky: true, sortParam: 'lastName' },
  { cellId: 'firstName', label: 'FN', toolTipLabel: 'First Name', sortParam: 'firstName' },
  {
    cellId: 'teams',
    label: 'T',
    toolTipLabel: 'Team',
    sortParam: 'teams.shortName',
    filterParam: 'teamId',
    customRender: ({ team: { shortName, id } }: PlayerSummary, classes) => (
      <Link to={`${TEAMS_URL}/${id}`} className={classnames(classes.imageContainer, classes.link)}>
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
    players,
    fetchPlayers,
    facets = {},
    fetchFacets,
    updateQuery
  } = props

  const classes = useStyles()
  const search = window.location.search.substring(1)
  const { sort = {}, filter = {} } = qs.parse(search)

  useEffect(
    () => {
      fetchFacets()
    }, [fetchFacets]
  )

  useEffect(
    () => {
      fetchPlayers({ sort, filter })
    }, [fetchPlayers, search]
  )

  if (players.length === 0) return null

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        Players
      </Typography>
      <SortTable
        collection={players}
        facets={facets}
        handleSortChange={(newSort) => updateQuery({ sort: newSort, filter, method: 'push' })}
        handleFilterChange={(newFilter) => updateQuery({ sort, filter: newFilter, method: 'push' })}
        sort={sort}
        filter={filter}
        cells={PLAYERS_TABLE_CELLS}
      />
    </Fragment>
  )
}

const mapStateToProps = ({ players: { data: players, facets }}) => ({
  players,
  facets
})

const matchDispatchToProps = {
  fetchPlayers: playersActions.fetchPlayers,
  fetchFacets: playersActions.fetchFacets,
  updateQuery: playersActions.updateQuery
}


export default connect(mapStateToProps, matchDispatchToProps)(PlayersPage)
