import classnames from 'classnames'
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
      paddingRight: theme.spacing(6)
    },
    crest: {
      maxWidth: theme.spacing(6),
      maxHeight: theme.spacing(6)
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
  const homeTeamImg = require(`../../../images/crests/${homeTeamName.toLowerCase()}.png`).default
  const awayTeamImg = require(`../../../images/crests/${awayTeamName.toLowerCase()}.png`).default

  return (
    <AccordionSummary
      className={classnames(classes.summary, { [classes.disabled]: !started })}
      expandIcon={stats.length > 0 ? <ExpandMoreIcon /> : ''}
      disabled={!started}
    >
      <Grid container spacing={1} alignItems='center'>
        <Grid item xs={4} md={4} lg={4}>
          <img src={homeTeamImg} className={classes.crest} />
          <Typography>
            {homeTeamName}
          </Typography>
        </Grid>
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
        <Grid item xs={4} md={4} lg={4}>
          <img src={awayTeamImg} className={classes.crest} />
          <Typography>
            {awayTeamName}
          </Typography>
        </Grid>
      </Grid>
    </AccordionSummary>
  )
}

export default FixtureSummary
