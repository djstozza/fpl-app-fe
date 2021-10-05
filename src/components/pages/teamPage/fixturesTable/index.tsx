import moment from 'moment'

import SortTable from 'components/common/sortTable'
import SearchListener from 'components/common/searchListener'
import { initialFilterState } from 'state/team/reducer'
import { ROUNDS_URL } from 'utilities/constants'
import Link from 'components/common/link'
import TeamCrestLink from 'components/common/teamCrestLink'

import type { TeamFixture } from 'types'

type Props = {
  teamId: string,
  tab: string,
  fixtures: TeamFixture[],
  fetchTeamFixtures: Function,
  sort: {
    players: Object,
    fixtures: Object
  },
  updateTeamFixturesSort: Function
}

const FIXTURES_TABLE_CELLS = [
  {
    cellId: 'rounds',
    label: 'R',
    toolTipLabel: 'Round',
    sticky: true,
    customRender: ({ round: { id, name } }: TeamFixture, classes, tab) => (
      <Link to={`${ROUNDS_URL}/${id}`} noWrap>
        {name}
      </Link>
    ),
    sortParam: 'rounds.deadlineTime'
  },
  {
    cellId: 'oppositionTeam',
    label: 'O',
    toolTipLabel: 'Opponent',
    customRender: ({ opponent }: TeamFixture, classes, tab) => <TeamCrestLink team={opponent} tab={tab} />,
    sortParam: 'oppositionTeam.shortName',
  },
  { cellId: 'leg', label: 'L', toolTipLabel: 'Leg', sticky: false, sortParam: 'leg' },
  {
    cellId: 'kickoffTime',
    label: 'K',
    toolTipLabel: 'Kickoff Time',
    customRender: ({ kickoffTime }: TeamFixture, classes) => (
      <div className={classes.noWrap}>
        {moment(kickoffTime).format('DD/MM/YY HH:mm')}
      </div>
    ),
    sortParam: 'kickoffTime'
  },
  {
    cellId: 'minutes',
    label: 'M',
    toolTipLabel: 'Minutes',
    customRender: ({ started, minutes }: TeamFixture, classses) => {
      if (!started) return null

      return minutes
    }
  },
  {
    cellId: 'score',
    label: 'S',
    toolTipLabel: 'Score',
    customRender: ({ started, homeTeamScore, awayTeamScore }: TeamFixture, classes, tab) => {
      if (!started) return null

      return (
        <div className={classes.noWrap}>
          {homeTeamScore} - {awayTeamScore}
        </div>
      )
    }
  },
  { cellId: 'result', label: 'R', toolTipLabel: 'Result', sortParam: 'result' },
  { cellId: 'strength', label: 'Str', toolTipLabel: 'Strength', sortParam: 'strength' }
]

const FixturesTable = (props: Props) => {
  const { fixtures, teamId, tab, fetchTeamFixtures, updateTeamFixturesSort } = props

  return (
    <SearchListener id={teamId} fetchAction={fetchTeamFixtures} initialFilterState={initialFilterState}>
      <SortTable
        collection={fixtures}
        handleSortChange={(newSort) => updateTeamFixturesSort({ tab, sort: newSort })}
        cells={FIXTURES_TABLE_CELLS}
        tab={tab}
      />
    </SearchListener>
  )
}

export default FixturesTable
