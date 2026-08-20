import {
  Paper,
  IconButton,
  Box
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import ForwardIcon from '@mui/icons-material/Forward'
import CloseIcon from '@mui/icons-material/Close'

import { colors } from 'utilities/colors'
import { teamCrestPathLoader } from 'utilities/helpers'
import history from 'state/history'

import type { ListPosition } from 'types'

type Props = {
  outListPosition?: ListPosition,
  setOutListPosition: Function
}

const containerSx = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  backgroundColor: colors.grey700,
  color: colors.white
})

const crestSx = (theme) => ({
  maxHeight: theme.spacing(3),
  marginLeft: theme.spacing(0.75),
  marginRight: theme.spacing(0.75)
})

const OutListPosition = (props: Props) => {
  const {
    outListPosition,
    setOutListPosition
  } = props

  const { pathname } = useLocation()

  const clearOutListPosition = () => {
    setOutListPosition(undefined)
    history.replace(pathname)
  }

  if (!outListPosition) return null

  const { player: { firstName, lastName }, team: { shortName }, position: { singularNameShort } } = outListPosition

  return (
    <Paper
      data-testid='OutListPosition'
      sx={containerSx}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ForwardIcon style={{ transform: 'rotate(270deg)', marginRight: 12 }}/>
        <div style={{ marginTop: 1, display: 'flex', alignItems: 'center' }}>
          Out: {firstName} {lastName}
          <Box
            component='img'
            src={teamCrestPathLoader(shortName)}
            alt={shortName}
            sx={crestSx}
          />
          ({singularNameShort})
        </div>
      </Box>
      <IconButton
        size='small'
        color='inherit'
        aria-label='Cancel'
        onClick={clearOutListPosition}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  )
}

export default OutListPosition
