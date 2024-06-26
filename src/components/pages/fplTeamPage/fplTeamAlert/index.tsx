import { makeStyles } from 'tss-react/mui'
import { Theme, Alert } from '@mui/material'
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

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  wrapper: {
    flexDirection: 'row',
    display: 'flex'
  },
  message: {
    width: '100%'
  },
  alert: {
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    display: 'flex',
    alignItems: 'center'
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'start'
    }
  },
  noWrap: {
    whiteSpace: 'nowrap'
  }
}))

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

  const { classes } = useStyles()

  if (!deadline || !round) return null

  const { name } = round

  const substr = miniDraft ? 'mini draft' : 'waiver'

  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className={classes.textContainer}>
      <span>
        {name} {isWaiver ? substr : 'trade'} deadline ends in {
          Boolean(days) &&
          <span className={classes.noWrap}>
           {days} {pluralize('day', days)}{!days || (!hours && !minutes) ? '' : ', '}
          </span>
        }
        {
          Boolean(hours) &&
          <span className={classes.noWrap}>
            {hours} {pluralize('hour', hours)}{!hours || !minutes ? '' : ', '}
          </span>
        }
        {
          Boolean(minutes) &&
          <span className={classes.noWrap}>
            {minutes} {pluralize('minute', minutes)}
            {Boolean(days || hours || minutes) && Boolean(seconds) ? ' and ' : ''}
          </span>
        }
        {
          Boolean(seconds) &&
          <span className={classes.noWrap}>
            {seconds} {pluralize('second', seconds)}
          </span>
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
    </div>
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
        classes={{ message: classes.message }}
        className={classes.alert}
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
