import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import {
  AccordionSummary,
  Typography,
  Grid,
  Box
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'
import { colors } from 'utilities/colors'

import type { Fixture } from 'types'

type Props = {
  fixture: Fixture
}

// The content block must stay centered on the page regardless of whether the
// expand icon is present (it only renders for fixtures with stats) - a flex
// layout centers content+icon as one group, shifting content off-center
// whenever the icon shows up. Grid tracks keep the two independent: the
// content always centers within the fixed middle track, and the icon sits
// immediately after it in the right track without affecting that position.
const summarySx = {
  textAlign: 'center',
  backgroundColor: colors.grey200,
  border: `0.5px solid ${colors.grey300}`,
  display: 'grid',
  gridTemplateColumns: '1fr minmax(0, 500px) 1fr',
  '& .MuiAccordionSummary-content': {
    flexGrow: 0,
    gridColumn: 2,
    width: '100%',
    textAlign: 'center'
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    gridColumn: 3,
    justifySelf: 'start'
  }
}

const disabledSx = {
  pointerEvents: 'none',
  '& a': {
    pointerEvents: 'all'
  }
}

const crestSx = (theme) => ({
  maxWidth: theme.spacing(6),
  maxHeight: theme.spacing(6)
})

const TeamLink = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  color: colors.linkBlue
})

const Crest = styled('img')(({ theme }) => crestSx(theme))

const SummaryInfo = ({ inProgress, children }:{ inProgress?: boolean, children: any }) => (
  <Typography component='div'>
    <Box sx={{ fontWeight: inProgress ? 'fontWeightBold' : 'fontWeightRegular' }}>
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

  const inProgress = started && !finished

  const teamDetailsGrid = (teamId, shortName) => (
    <Grid size={{ xs: 4, md: 4, lg: 4 }}>
      <TeamLink to={`${TEAMS_URL}/${teamId}`}>
        <Crest src={teamCrestPathLoader(shortName)} alt={shortName} />
        <SummaryInfo inProgress={inProgress}>
          {shortName}
        </SummaryInfo>
      </TeamLink>
    </Grid>
  )

  return (
    <AccordionSummary
      sx={[summarySx, !started && disabledSx]}
      expandIcon={stats.length > 0 ? <ExpandMoreIcon /> : ''}
    >
      <Grid container spacing={1} sx={{ alignItems: 'center', width: '100%' }}>
        {teamDetailsGrid(homeTeamId, homeTeamName)}
        <Grid size={{ xs: 4, md: 4, lg: 4 }}>
          <SummaryInfo inProgress={inProgress}>
            {dayjs(kickoffTime).format('HH:mm')}
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
  );
}

export default FixtureSummary
