import { useState, useEffect, Fragment } from 'react'
import { makeStyles } from 'tss-react/mui'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Theme
} from '@mui/material'
import { Link } from 'react-router-dom'

import type { MiniDraftPicksState } from 'state/miniDraftPicks'
import { LEAGUES_URL } from 'utilities/constants'
import { colors } from 'utilities/colors'

type Props = {
  leagueId: string,
  miniDraftPicks: MiniDraftPicksState,
  passMiniDraftPick: Function,
  deadline?: Date
}

const useStyles = makeStyles()((theme: Theme) => ({
  alertContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  draftPlayerLink: {
    color: colors.white,
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
    miniDraftPicks: { canMakeMiniDraftPick, submitting },
    passMiniDraftPick,
    deadline
  } = props

  const { classes } = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleConfirmDraftPick = () => {
    setDialogOpen(false)
    passMiniDraftPick()
  }

  useEffect(
    () => {
      window.dispatchEvent(new Event('resize'))
    }, [canMakeMiniDraftPick]
  )

  if (!canMakeMiniDraftPick || !deadline) return null

  return (
    <Fragment>
      <Alert className={classes.alertContainer} variant='filled' severity='info'>
        It's your turn to
        <Link className={classes.draftPlayerLink} to={`${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions`}>
          draft a player
        </Link> or
        <div className={classes.makeDraftPickContainer}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setDialogOpen(true)}
          >
            Pass
          </Button>
        </div>
      </Alert>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogContent>
          Are you wish to pass? You will not be allowed to draft more players after two passes.
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='inherit'
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
