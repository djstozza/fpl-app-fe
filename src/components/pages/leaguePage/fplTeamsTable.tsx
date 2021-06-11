import { Fragment } from 'react'
import {
  Button,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'

import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  })
)

const FplTeamsTable = (props: Props) => {
  const {
    leagueId,
    league,
    fplTeams = [],
    fetchFplTeams,
    generateDraftPicks,
    submitting,
    updateFplTeamsSort
  } = props

  const {
    isOwner,
    canGenerateDraftPicks,
    showDraftPickColumn,
    showLiveColumns
  } = league

  const classes= useStyles()

  const cells: Fpl_Team_Table_Cells = FPL_TEAMS_TABLE_CELLS

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
      {
        isOwner &&
        <div className={classes.actions}>
          {
            canGenerateDraftPicks &&
            <Button
              variant='contained'
              color='primary'
              onClick={() => generateDraftPicks(leagueId)}
              disabled={submitting}
            >
              Generate draft picks
            </Button>
          }
        </div>
      }
    </Fragment>
  )
}

export default FplTeamsTable
