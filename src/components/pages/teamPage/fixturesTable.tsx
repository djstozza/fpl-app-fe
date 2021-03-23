import { Link } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Theme,
  Tooltip,
  makeStyles,
  createStyles
} from '@material-ui/core'

import type { TeamFixture } from 'types'

import { teamCrestPathLoader } from 'utilities/helpers'
import { ROUNDS_URL, TEAMS_URL } from 'utilities/constants'

type Props = {
  fixtures: TeamFixture[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      maxWidth: theme.spacing(100),
      margin: '0 auto'
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    link: {
      textDecoration: 'none',
      color: '#0645AD'
    },
    noWrap: {
      whiteSpace: 'nowrap'
    },
    crest: {
      maxHeight: theme.spacing(3)
    },
    mainHeaderCell: {
      zIndex: 3
    },
    mainCell: {
      position: 'sticky',
      left: 0,
      backgroundColor: '#ffffff',
      zIndex: 2
    }
  })
)

const FIXTURES_TABLE_CELLS = [
  {
    cellId: 'round',
    label: 'R',
    toolTipLabel: 'Round',
    sticky: true,
    customRender: ({ round: { id, name } }: TeamFixture, classes) => (
      <Link to={`${ROUNDS_URL}/${id}`} className={classnames(classes.link, classes.noWrap)}>
        {name}
      </Link>
    )
  },
  {
    cellId: 'opponent',
    label: 'O',
    toolTipLabel: 'Opponent',
    customRender: ({ opponent: { shortName, id } }: TeamFixture, classes) => (
      <Link to={`${TEAMS_URL}/${id}`} className={classnames(classes.imageContainer, classes.link)}>
        <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
        <div>
          {shortName}
        </div>
      </Link>
    )
  },
  { cellId: 'leg', label: 'L', toolTipLabel: 'Leg', sticky: false },
  {
    cellId: 'kickoffTime',
    label: 'K',
    toolTipLabel: 'Kickoff Time',
    customRender: ({ kickoffTime }: TeamFixture, classes) => (
      <div className={classes.noWrap}>
        {moment(kickoffTime).format('DD/MM/YY HH:mm')}
      </div>
    )
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
    customRender: ({ started, homeTeamScore, awayTeamScore }: TeamFixture, classes) => {
      if (!started) return null

      return (
        <div className={classes.noWrap}>
          {homeTeamScore} - {awayTeamScore}
        </div>
      )
    }
  },
  { cellId: 'result', label: 'R', toolTipLabel: 'Result' },
  { cellId: 'strength', label: 'Str', toolTipLabel: 'Strength' }
]

const FixturesTable = (props: Props) => {
  const { fixtures } = props

  const classes = useStyles()

  return (
    <Table
      size='small'
      className={classes.table}
      stickyHeader
    >
      <TableHead>
        <TableRow>
          {
            FIXTURES_TABLE_CELLS.map(({ cellId, label, toolTipLabel, sticky }, key) => (
              <TableCell
                align='center'
                key={key}
                className={classnames({ [classes.mainHeaderCell]: sticky })}
              >
                <Tooltip title={toolTipLabel}>
                  <div>
                    {label}
                  </div>
                </Tooltip>
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          fixtures.map((fixture, rowKey) => (
            <TableRow key={rowKey}>
              {
                FIXTURES_TABLE_CELLS.map(({ cellId, customRender, sticky }, cellKey) => (
                  <TableCell
                    key={cellKey}
                    align='center'
                    className={classnames({ [classes.mainCell]: sticky })}
                  >
                    { customRender ? customRender(fixture, classes) : fixture[cellId] }
                  </TableCell>
                ))
              }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

export default FixturesTable
