import { useState, useEffect, Fragment } from 'react'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

import type { DraftPicksState } from 'state/draftPicks'
import { LEAGUES_URL } from 'utilities/constants'
import { colors } from 'utilities/colors'

type Props = {
  leagueId: string,
  draftPicks: DraftPicksState,
  updateDraftPick: Function
}

const DraftPlayerLink = styled(Link)(({ theme }) => ({
  color: colors.white,
  marginLeft: theme.spacing(0.5)
}))

const UserCanPickAlert = (props: Props) => {
  const {
    leagueId,
    draftPicks: { nextDraftPickId, canMakePlayerPick, canMakeMiniDraftPick, userCanPick, submitting },
    updateDraftPick
  } = props

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
      <Alert sx={{ display: 'flex', alignItems: 'center' }} variant='filled' severity='info'>
        It&apos;s your turn to
        {
          canMakePlayerPick &&
          <DraftPlayerLink to={`${LEAGUES_URL}/${leagueId}/draft/availablePlayers`}>
            draft a player
          </DraftPlayerLink>
        }
        {
          canMakePlayerPick && canMakeMiniDraftPick &&
          ' or'
        }
        {
          canMakeMiniDraftPick &&
          <Box sx={(theme) => ({ display: 'inline', marginLeft: theme.spacing(0.5) })}>
            make a <Button
              variant='contained'
              color='secondary'
              onClick={() => setDialogOpen(true)}
            >
              Mini draft Pick
            </Button>
          </Box>
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
