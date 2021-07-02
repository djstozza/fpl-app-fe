import { useState, useEffect, Fragment } from 'react'
import { Alert } from '@material-ui/lab'
import Countdown from 'react-countdown'
import pluralize from 'pluralize'

import type { FplTeamList } from 'types'

type Props = {
  currentFplTeamList?: FplTeamList
}

const FplTeamAlert = (props: Props) => {
  const {
    currentFplTeamList: { round } = {}
  } = props
  const [deadlineTimeAsTime, setDeadlineTimeAsTime] = useState<Date|undefined>()
  const [waiverDeadlineAsTime, setWaiverDeadlineAsTime] = useState<Date|undefined>()
  const [deadline, setDeadline] = useState<Date|undefined>()
  const [isWaiver, setIsWaiver] = useState(false)


  useEffect(
    () => {
      if (!round) return

      const { deadlineTime, waiverDeadline } = round

      setDeadlineTimeAsTime(new Date(deadlineTime))
      setWaiverDeadlineAsTime(new Date(waiverDeadline))
    }, [round, setDeadlineTimeAsTime, setWaiverDeadlineAsTime]
  )

  useEffect(
    () => {
      if (!deadlineTimeAsTime || !waiverDeadlineAsTime) return
      if (new Date() > deadlineTimeAsTime) return

      const waiverPassed = new Date() > waiverDeadlineAsTime
      setDeadline(new Date() > waiverDeadlineAsTime ? deadlineTimeAsTime : waiverDeadlineAsTime)
      setIsWaiver(!waiverPassed)

    }, [deadlineTimeAsTime, waiverDeadlineAsTime, setDeadline, setIsWaiver]
  )

  if (!deadline || !round) return null

  const { name } = round

  const renderer = ({ days, hours, minutes, seconds, completed }) => (
    <span>
      {name} {isWaiver ? 'waiver' : 'trade'} deadline ends in {Boolean(days) && `${days} ${pluralize('day', days)}`}
      {!Boolean(days) || (!Boolean(hours) && !Boolean(minutes)) ? '' : ', '}
      {Boolean(hours) && `${hours} ${pluralize('hour', hours)}`}
      {!Boolean(hours) || !Boolean(minutes) ? '' : ', '}
      {Boolean(minutes) && `${minutes} ${pluralize('minute', minutes)}`}
      {Boolean(days || hours || minutes) && Boolean(seconds) ? ' and ' : ''}
      {Boolean(seconds) && `${seconds} ${pluralize('second', seconds)}`}
    </span>
  )

  const handleComplete = () => {
    if (!isWaiver) return setDeadline(undefined)
    if (deadlineTimeAsTime) console.log(new Date() > deadlineTimeAsTime)


    setDeadline(deadlineTimeAsTime)
    setIsWaiver(false)
  }

  return (
    <Fragment>
    {
      Boolean(deadline) &&
      <Alert variant='filled' severity='info'>
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
