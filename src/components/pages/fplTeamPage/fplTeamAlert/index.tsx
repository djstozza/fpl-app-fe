import { Alert, Box } from '@mui/material'
import Countdown from 'react-countdown'
import pluralize from 'pluralize'

import ButtonLink from 'components/common/buttonLink'
import { LEAGUES_URL, FPL_TEAMS_URL } from 'utilities/constants'

import type { FplTeamList } from 'types'

type Props = {
  fplTeamId: string,
  currentFplTeamList?: FplTeamList,
  isWaiver: boolean,
  setDeadline: Function,
  deadlineTimeAsTime?: Date,
  deadline?: Date,
  setIsWaiver: (boolean) => void,
  isOwner: boolean,
  setOutListPosition: Function,
  miniDraft: boolean,
  leagueId: string
}

const alertSx = (theme) => ({
  paddingTop: theme.spacing(0.25),
  paddingBottom: theme.spacing(0.25),
  display: 'flex',
  alignItems: 'center',
  '& .MuiAlert-message': {
    width: '100%'
  }
})

const textContainerSx = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'start'
  }
})

const noWrapSx = { whiteSpace: 'nowrap' }

const FplTeamAlert = (props: Props) => {
  const {
    fplTeamId,
    currentFplTeamList: { round } = {},
    isWaiver,
    setDeadline,
    deadlineTimeAsTime,
    deadline,
    setIsWaiver,
    isOwner,
    setOutListPosition,
    miniDraft,
    leagueId
  } = props

  if (!deadline || !round) return null

  const { name } = round

  const substr = miniDraft ? 'mini draft' : 'waiver'

  const renderer = ({ days, hours, minutes, seconds }) => (
    <Box sx={textContainerSx}>
      <span>
        {name} {isWaiver ? substr : 'trade'} deadline ends in {
          Boolean(days) &&
          <Box component='span' sx={noWrapSx}>
           {days} {pluralize('day', days)}{!days || (!hours && !minutes) ? '' : ', '}
          </Box>
        }
        {
          Boolean(hours) &&
          <Box component='span' sx={noWrapSx}>
            {hours} {pluralize('hour', hours)}{!hours || !minutes ? '' : ', '}
          </Box>
        }
        {
          Boolean(minutes) &&
          <Box component='span' sx={noWrapSx}>
            {minutes} {pluralize('minute', minutes)}
            {Boolean(days || hours || minutes) && Boolean(seconds) ? ' and ' : ''}
          </Box>
        }
        {
          Boolean(seconds) &&
          <Box component='span' sx={noWrapSx}>
            {seconds} {pluralize('second', seconds)}
          </Box>
        }
      </span>
      {
        isOwner &&
        <div>
          {
            !miniDraft &&
            isWaiver &&
            <ButtonLink
              size='small'
              color='secondary'
              to={`${FPL_TEAMS_URL}/${fplTeamId}/waiverPicks/new`}
              onClick={() => setOutListPosition(undefined)}
            >
              New Waiver
            </ButtonLink>
          }
          {
            !isWaiver &&
            <ButtonLink
              size='small'
              color='secondary'
              to={`${FPL_TEAMS_URL}/${fplTeamId}/trades/new`}
              onClick={() => setOutListPosition(undefined)}
            >
              New Trade
            </ButtonLink>
          }
          {
            miniDraft &&
            isWaiver &&
            <ButtonLink
              size='small'
              color='secondary'
              to={`${LEAGUES_URL}/${leagueId}/miniDraft`}
            >
              Go to mini draft
            </ButtonLink>
          }
          <ButtonLink
            size='small'
            color='secondary'
            to={`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/new`}
            onClick={() => setOutListPosition(undefined)}
          >
            New team trade
          </ButtonLink>
        </div>
      }
    </Box>
  )

  const handleComplete = () => {
    if (!isWaiver) return setDeadline(undefined)

    setDeadline(deadlineTimeAsTime)
    setIsWaiver(false)
  }

  return (
    <div data-testid='FplTeamAlert'>
    {
      Boolean(deadline) &&
      <Alert
        sx={alertSx}
        variant='filled'
        severity='info'
      >
        <Countdown
          key={deadline.toString()}
          date={deadline}
          renderer={renderer}
          onComplete={handleComplete}
        />
      </Alert>
    }
    </div>
  )

}

export default FplTeamAlert
