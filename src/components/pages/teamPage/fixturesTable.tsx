import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'

import SortTable from 'components/common/sortTable'
import { teamCrestPathLoader } from 'utilities/helpers'
import { ROUNDS_URL, TEAMS_URL } from 'utilities/constants'

import type { TeamFixture } from 'types'

type Props = {
  teamId: string,
  tab: string,
  fixtures: TeamFixture[],
  fetchTeamFixtures: Function,
  sort: {
    players: Object,
    fixtures: Object
  }
}

const FIXTURES_TABLE_CELLS = [
  {
    cellId: 'rounds',
    label: 'R',
    toolTipLabel: 'Round',
    sticky: true,
    customRender: ({ round: { id, name } }: TeamFixture, classes, tab) => (
      <Link to={`${ROUNDS_URL}/${id}`} className={classnames(classes.link, classes.noWrap)}>
        {name}
      </Link>
    ),
    sortParam: 'rounds.deadlineTime'
  },
  {
    cellId: 'oppositionTeam',
    label: 'O',
    toolTipLabel: 'Opponent',
    customRender: ({ opponent: { shortName, id } }: TeamFixture, classes, tab) => (
      <Link to={`${TEAMS_URL}/${id}/${tab}`} className={classnames(classes.imageContainer, classes.link)}>
        <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
        <div>
          {shortName}
        </div>
      </Link>
    ),
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
  const { fixtures, teamId, tab, sort, fetchTeamFixtures } = props

  useEffect(
    () => {
      fetchTeamFixtures(teamId, tab, sort.fixtures)
    }, [fetchTeamFixtures, teamId]
  )

  return (
    <SortTable
      collection={fixtures}
      handleSortChange={(newSort) => fetchTeamFixtures(teamId, tab, newSort, 'push')}
      sort={sort.fixtures}
      cells={FIXTURES_TABLE_CELLS}
      tab={tab}
    />
  )
}

export default FixturesTable
