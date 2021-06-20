import { useEffect } from 'react'
import {
  Button,
  Theme,
  makeStyles
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Link } from 'react-router-dom'

import type { DraftPicksState } from 'state/draftPicks'
import { LEAGUES_URL } from 'utilities/constants'

type Props = {
  leagueId: string,
  draftPicks: DraftPicksState
}

const useStyles = makeStyles((theme: Theme) => ({
  alertContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  draftPlayerLink: {
    color: '#ffffff',
    marginLeft: theme.spacing(0.5)
  },
  makeDraftPickContainer: {
    display: 'inline'
  }
}))

const UserCanPickAlert = (props: Props) => {
  const {
    leagueId,
    draftPicks: { canMakePlayerPick, canMakeMiniDraftPick, userCanPick }
  } = props

  const classes = useStyles()

  useEffect(
    () => {
      window.dispatchEvent(new Event('resize'))
    }, [userCanPick]
  )


  if (!userCanPick) return null

  return (
    <Alert className={classes.alertContainer} variant='filled' severity='info'>
      It's your turn to
      {
        canMakePlayerPick &&
        <Link className={classes.draftPlayerLink} to={`${LEAGUES_URL}/${leagueId}/draft/availablePlayers`}>
          draft a player
        </Link>
      }
      {
        canMakePlayerPick && canMakeMiniDraftPick &&
        ' or '
      }
      {
        canMakeMiniDraftPick &&
        <div className={classes.makeDraftPickContainer}>
          make a <Button variant='contained' color='secondary'>Mini draft Pick</Button>
        </div>
      }
    </Alert>
  )
}

export default UserCanPickAlert
