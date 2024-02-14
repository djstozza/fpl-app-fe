import { makeStyles } from 'tss-react/mui'
import { Tooltip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import FlightIcon from '@mui/icons-material/Flight'
import HelpIcon from '@mui/icons-material/Help'
import GavelIcon from '@mui/icons-material/Gavel'
import moment from 'moment'

import { colors } from 'utilities/colors'

const useStyles = makeStyles()(() => ({
  available: {
    color: colors.green500
  },
  doubtful: {
    color: colors.orange500
  },
  unavailable: {
    color: colors.red
  }
}));

type Props = {
  status: string,
  news?: string,
  newsAdded?: string,
  chance?: number
}

const StatusIconMapper = ({ status, news, newsAdded, chance = 0 }: Props) => {
  const { classes } = useStyles()
  const icons = {
    'a': <CheckCircleIcon className={classes.available} />,
    'd': <HelpIcon className={classes.doubtful} />,
    's': <GavelIcon className={classes.unavailable} />,
    'n': <FlightIcon className={classes.unavailable} />,
    'u': <CancelIcon className={classes.unavailable} />,
    'i': <LocalHospitalIcon className={classes.unavailable} />
  }

  const title = news ? (news + (newsAdded ? `. News added: ${moment(newsAdded).format('DD/MM/YY HH:mm')}` : '')) : ''

  return (
    <Tooltip title={title}>
      {Boolean(chance) && chance < 100 ? <div className={classes.doubtful}>{chance}%</div> : icons[status]}
    </Tooltip>
  )
}

export default StatusIconMapper
