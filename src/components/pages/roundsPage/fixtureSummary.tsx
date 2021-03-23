import classnames from 'classnames'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  AccordionSummary,
  Typography,
  Grid,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'

import type { Fixture } from 'types'

type Props = {
  fixture: Fixture
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      textAlign: 'center',
      backgroundColor: '#eeeeee',
      border: '0.5px solid #e0e0e0'
    },
    disabled: {
      paddingRight: theme.spacing(6),
      pointerEvents: 'none',
      '& a': {
        pointerEvents: 'all'
      }
    },
    crest: {
      maxWidth: theme.spacing(6),
      maxHeight: theme.spacing(6)
    },
    teamLink: {
      textDecoration: 'none',
      color: '#0645AD'
    }
  })
)

const FixtureSummary = (props: Props) => {
  const {
    fixture: {
      kickoffTime,
      homeTeam: { id: homeTeamId, shortName: homeTeamName },
      awayTeam: { id: awayTeamId, shortName: awayTeamName },
      homeTeamScore,
      awayTeamScore,
      started,
      finished,
      minutes,
      stats
    }
  } = props

  const classes = useStyles()

  const teamDetailsGrid = (teamId, shortName) => (
    <Grid item xs={4} md={4} lg={4}>
      <Link to={`${TEAMS_URL}/${teamId}`} className={classes.teamLink}>
        <img src={teamCrestPathLoader(shortName)} className={classes.crest} alt={shortName} />
        <Typography>
          {shortName}
        </Typography>
      </Link>
    </Grid>
  )

  return (
    <AccordionSummary
      className={classnames(classes.summary, { [classes.disabled]: !started })}
      expandIcon={stats.length > 0 ? <ExpandMoreIcon /> : ''}
    >
      <Grid container spacing={1} alignItems='center'>
        {teamDetailsGrid(homeTeamId, homeTeamName)}
        <Grid item xs={4} md={4} lg={4}>
          <Typography>
            {moment(kickoffTime).format('HH:mm')}
          </Typography>
          {
            (homeTeamScore !== null && awayTeamScore !== null) &&
            <Typography>
              {homeTeamScore} - {awayTeamScore}
            </Typography>
          }
          {
            minutes > 0 &&
            <Typography>
              ({minutes})
            </Typography>
          }
        </Grid>
        {teamDetailsGrid(awayTeamId, awayTeamName)}
      </Grid>
    </AccordionSummary>
  )
}

export default FixtureSummary
