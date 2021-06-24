import { useState, useEffect, Fragment } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Theme,
  makeStyles
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Link } from 'react-router-dom'

import type { DraftPicksState } from 'state/draftPicks'
import { LEAGUES_URL } from 'utilities/constants'

type Props = {
  leagueId: string,
  draftPicks: DraftPicksState,
  updateDraftPick: Function
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
    display: 'inline',
    marginLeft: theme.spacing(0.5)
  }
}))

const UserCanPickAlert = (props: Props) => {
  const {
    leagueId,
    draftPicks: { nextDraftPickId, canMakePlayerPick, canMakeMiniDraftPick, userCanPick, submitting },
    updateDraftPick
  } = props

  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleConfirmDraftPick = () => {
    setDialogOpen(false)
    updateDraftPick({ nextDraftPickId, miniDraft: true })
  }

  useEffect(
    () => {
      window.dispatchEvent(new Event('resize'))
    }, [userCanPick]
  )

  if (!userCanPick) return null

  return (
    <Fragment>
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
          ' or'
        }
        {
          canMakeMiniDraftPick &&
          <div className={classes.makeDraftPickContainer}>
            make a <Button
              variant='contained'
              color='secondary'
              onClick={() => setDialogOpen(true)}
            >
              Mini draft Pick
            </Button>
          </div>
        }
      </Alert>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogContent>
          Are you wish to make a mini draft pick?
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='default'
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={submitting}
            variant='contained'
            color='secondary'
            onClick={handleConfirmDraftPick}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default UserCanPickAlert
