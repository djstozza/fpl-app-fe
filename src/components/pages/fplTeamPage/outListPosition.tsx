import {
  Paper,
  Theme,
  IconButton,
  makeStyles
} from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import ForwardIcon from '@material-ui/icons/Forward'
import CloseIcon from '@material-ui/icons/Close'

import { colors } from 'utilities/colors'
import { teamCrestPathLoader } from 'utilities/helpers'
import history from 'state/history'

import type { ListPosition } from 'types'

type Props = {
  outListPosition?: ListPosition,
  setOutListPosition: Function
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    backgroundColor: colors.grey700,
    color: colors.white
  },
  outNameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  crest: {
    maxHeight: theme.spacing(3),
    marginLeft: theme.spacing(0.75),
    marginRight: theme.spacing(0.75)
  }
}))

const OutListPosition = (props: Props) => {
  const {
    outListPosition,
    setOutListPosition
  } = props

  const classes = useStyles()
  const { pathname } = useLocation()

  const clearOutListPosition = () => {
    setOutListPosition(undefined)
    history.replace(pathname)
  }

  if (!outListPosition) return null

  const { player: { firstName, lastName }, team: { shortName }, position: { singularNameShort} } = outListPosition

  return (
    <Paper
      className={classes.container}
    >
      <div className={classes.outNameContainer}>
        <ForwardIcon style={{ transform: 'rotate(270deg)', marginRight: 12 }}/>
        <div style={{ marginTop: 1, display: 'flex', alignItems: 'center' }}>
          Out: {firstName} {lastName}
          <img
            src={teamCrestPathLoader(shortName)}
            alt={shortName}
            className={classes.crest}
          />
          ({singularNameShort})
        </div>
      </div>
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
