import { useEffect } from 'react'
import { Alert } from '@mui/material'

type Props = {
  substr: string,
  showAlert: boolean
}

const DraftCompletedAlert = (props: Props) => {
  const {
    substr,
    showAlert
  } = props

  useEffect(
    () => {
      window.dispatchEvent(new Event('resize'))
    }, [showAlert]
  )

  if (!showAlert) return null

  return (
    <Alert variant='filled' severity='success'>
      The {substr} has successfully been completed
    </Alert>
  )
}

export default DraftCompletedAlert
