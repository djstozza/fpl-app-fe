import {
  Tooltip,
  makeStyles,
  Theme
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import FlightIcon from '@material-ui/icons/Flight'
import HelpIcon from '@material-ui/icons/Help'
import GavelIcon from '@material-ui/icons/Gavel'
import moment from 'moment'

import { colors } from 'utilities/colors'

const useStyles = makeStyles((theme: Theme) => ({
  available: {
    color: colors.green500
  },
  doubtful: {
    color: colors.orange500
  },
  unavailable: {
    color: colors.red
  }
}))

type Props = {
  status: string,
  news?: string,
  newsAdded?: string,
  chance?: number
}

const StatusIconMapper = ({ status, news = '', newsAdded = '', chance }: Props) => {
  const classes = useStyles()
  const icons = {
    'a': <CheckCircleIcon className={classes.available} />,
    'd': <HelpIcon className={classes.doubtful} />,
    's': <GavelIcon className={classes.unavailable} />,
    'n': <FlightIcon className={classes.unavailable} />,
    'u': <CancelIcon className={classes.unavailable} />,
    'i': <LocalHospitalIcon className={classes.unavailable} />
  }

  const title = news && (news + (newsAdded ? `. News added: ${moment(newsAdded).format('DD/MM/YY HH:mm')}` : ''))

  return (
    <Tooltip title={title}>
      {Boolean(chance) && (chance || 0) < 100 ? <div className={classes.doubtful}>{chance}%</div> : icons[status]}
    </Tooltip>
  )
}

export default StatusIconMapper
