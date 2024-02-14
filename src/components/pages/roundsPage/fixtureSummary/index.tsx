import classnames from 'classnames'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  AccordionSummary,
  Typography,
  Grid,
  Theme,
  Box,
  makeStyles,
  createStyles
} from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'
import { colors } from 'utilities/colors'

import type { Fixture } from 'types'

type Props = {
  fixture: Fixture
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      textAlign: 'center',
      backgroundColor: colors.grey200,
      border: `0.5px solid ${colors.grey300}`
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
      color: colors.linkBlue
    },
    inProgressTeamLink: {
      color: colors.white
    }
  })
)

const SummaryInfo = ({ inProgress, children }:{ inProgress?: boolean, children: any }) => (
  <Typography component='div'>
    <Box fontWeight={inProgress ? 'fontWeightBold' : 'fontWeightRegular'}>
      {children}
    </Box>
  </Typography>
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
  const inProgress = started && !finished

  const teamDetailsGrid = (teamId, shortName) => (
    <Grid item xs={4} md={4} lg={4}>
      <Link
        to={`${TEAMS_URL}/${teamId}`}
        className={classnames(classes.teamLink)}
      >
        <img src={teamCrestPathLoader(shortName)} className={classes.crest} alt={shortName} />
        <SummaryInfo inProgress={inProgress}>
          {shortName}
        </SummaryInfo>
      </Link>
    </Grid>
  )

  return (
    <AccordionSummary
      className={
        classnames(
          classes.summary,
          {
            [classes.disabled]: !started
          }
        )
      }
      expandIcon={stats.length > 0 ? <ExpandMoreIcon /> : ''}
    >
      <Grid container spacing={1} alignItems='center'>
        {teamDetailsGrid(homeTeamId, homeTeamName)}
        <Grid item xs={4} md={4} lg={4}>
          <SummaryInfo inProgress={inProgress}>
            {moment(kickoffTime).format('HH:mm')}
          </SummaryInfo>
          {
            (homeTeamScore !== null && awayTeamScore !== null) &&
            <SummaryInfo inProgress={inProgress}>
              {homeTeamScore} - {awayTeamScore}
            </SummaryInfo>
          }
          {
            minutes > 0 &&
            <SummaryInfo inProgress={inProgress}>
              ({minutes})
            </SummaryInfo>
          }
        </Grid>
        {teamDetailsGrid(awayTeamId, awayTeamName)}
      </Grid>
    </AccordionSummary>
  )
}

export default FixtureSummary
