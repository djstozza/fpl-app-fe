import { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  makeStyles,
  Theme
} from '@material-ui/core'

import SearchListener from 'components/common/searchListener'
import SortTable from 'components/common/sortTable'
import ButtonLink from 'components/common/buttonLink'
import Link from 'components/common/link'

import { leaguesActions } from 'state/leagues'
import {
  PROFILE_URL,
  LEAGUES_URL,
  NEW_LEAGUE_URL,
  JOIN_LEAGUE_URL
} from 'utilities/constants'
import { initialFilterState } from 'state/leagues/reducer'

import type { League } from 'types'

type Props = {
  leagues: League[],
  fetchLeagues: Function,
  updateSort: Function
}

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const LEAGUES_TABLE_CELLS = [
  {
    cellId: 'name',
    label: 'N',
    toolTipLabel: 'Name',
    sortParam: 'name',
    sticky: true,
    customRender: ({ name, id }: League) => (
      <Link to={`${LEAGUES_URL}/${id}`}>
        {name}
      </Link>
    )
  },
  { cellId: 'status', label: 'S', toolTipLabel: 'Status', sortParam: 'status' },
  {
    cellId: 'owner',
    label: 'O',
    toolTipLabel: 'Owner',
    customRender: ({ owner: { username } }: League, classes) => username
  }
]

const LeaguesPage = (props: Props) => {
  const { leagues, fetchLeagues, updateSort } = props
  const classes = useStyles()

  return (
    <Fragment>
      <SearchListener fetchAction={fetchLeagues} initialFilterState={initialFilterState}>
        <SortTable
          collection={leagues}
          handleSortChange={(newSort) => updateSort(newSort)}
          cells={LEAGUES_TABLE_CELLS}
        />
      </SearchListener>
      <div className={classes.actions}>
        <ButtonLink
          to={`${PROFILE_URL}${NEW_LEAGUE_URL}`}
          color='primary'
          rightMargin
        >
          New League
        </ButtonLink>
        <ButtonLink
          to={`${PROFILE_URL}${JOIN_LEAGUE_URL}`}
          color='default'
        >
          Join a League
        </ButtonLink>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const {
    leagues: {
      data: leagues = []
    }
  } = state

  return {
    leagues
  }
}

const matchDispatchToProps = {
  fetchLeagues: leaguesActions.fetchLeagues,
  updateSort: leaguesActions.updateSort
}

export default connect(mapStateToProps, matchDispatchToProps)(LeaguesPage)
