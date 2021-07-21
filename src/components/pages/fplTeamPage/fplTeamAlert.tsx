import { Fragment } from 'react'
import {
  Button,
  Theme,
  makeStyles
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Countdown from 'react-countdown'
import pluralize from 'pluralize'

import ButtonLink from 'components/common/buttonLink'
import { FPL_TEAMS_URL } from 'utilities/constants'

import type { FplTeamList } from 'types'

type Props = {
  fplTeamId: string,
  currentFplTeamList?: FplTeamList,
  isWaiver: boolean,
  setDeadline: Function,
  deadlineTimeAsTime?: Date,
  deadline?: Date,
  setIsWaiver: Function,
  isOwner: boolean,
  setOutListPosition: Function
}

const useStyles = makeStyles((theme: Theme) => ({
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
    setOutListPosition
  } = props

  const classes = useStyles()

  if (!deadline || !round) return null

  const { name } = round

  const renderer = ({ days, hours, minutes, seconds, completed }) => (
    <div className={classes.textContainer}>
      <span>
        {name} {isWaiver ? 'waiver' : 'trade'} deadline ends in {
          Boolean(days) &&
          <span className={classes.noWrap}>
           {days} {pluralize('day', days)}{!Boolean(days) || (!Boolean(hours) && !Boolean(minutes)) ? '' : ', '}
          </span>
        }
        {
          Boolean(hours) &&
          <span className={classes.noWrap}>
            {hours} {pluralize('hour', hours)}{!Boolean(hours) || !Boolean(minutes) ? '' : ', '}
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
          <ButtonLink
            size='small'
            color='secondary'
            to={`${FPL_TEAMS_URL}/${fplTeamId}/${isWaiver ? 'waiverPicks' : 'trades'}/new`}
            onClick={() => setOutListPosition(undefined)}
          >
            New {isWaiver ? 'Waiver' : 'Trade'}
          </ButtonLink>
          <Button size='small' color='secondary' variant='contained'>
            New team trade
          </Button>
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
    <Fragment>
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
    </Fragment>
  )

}

export default FplTeamAlert
