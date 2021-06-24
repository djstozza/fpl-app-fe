import { useEffect, Fragment } from 'react'
import { Alert } from '@material-ui/lab'
import { Link } from 'react-router-dom'

import type { DraftPicksState } from 'state/draftPicks'

type Props = {
  draftPicks: DraftPicksState
}

const DraftCompletedAlert = (props: Props) => {
  const {
    draftPicks: { draftFinished }
  } = props

  useEffect(
    () => {
      window.dispatchEvent(new Event('resize'))
    }, [draftFinished]
  )

  if (!draftFinished) return null

  return (
    <Alert variant='filled' severity='success'>
      The draft has successfully been completed
    </Alert>
  )
}

export default DraftCompletedAlert
