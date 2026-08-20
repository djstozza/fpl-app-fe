import { Tooltip, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import FlightIcon from '@mui/icons-material/Flight'
import HelpIcon from '@mui/icons-material/Help'
import GavelIcon from '@mui/icons-material/Gavel'
import moment from 'moment'

import { colors } from 'utilities/colors'

const availableSx = { color: colors.green500 }
const doubtfulSx = { color: colors.orange500 }
const unavailableSx = { color: colors.red }

type Props = {
  status: string,
  news?: string,
  newsAdded?: string,
  chance?: number
}

const StatusIconMapper = ({ status, news, newsAdded, chance = 0 }: Props) => {
  const icons = {
    'a': <CheckCircleIcon sx={availableSx} />,
    'd': <HelpIcon sx={doubtfulSx} />,
    's': <GavelIcon sx={unavailableSx} />,
    'n': <FlightIcon sx={unavailableSx} />,
    'u': <CancelIcon sx={unavailableSx} />,
    'i': <LocalHospitalIcon sx={unavailableSx} />
  }

  const title = news ? (news + (newsAdded ? `. News added: ${moment(newsAdded).format('DD/MM/YY HH:mm')}` : '')) : ''

  return (
    <Tooltip title={title}>
      {Boolean(chance) && chance < 100 ? <Box sx={doubtfulSx}>{chance}%</Box> : icons[status]}
    </Tooltip>
  )
}

export default StatusIconMapper
