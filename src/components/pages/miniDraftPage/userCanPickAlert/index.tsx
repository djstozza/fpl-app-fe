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

import type { MiniDraftPicksState } from 'state/miniDraftPicks'
import { LEAGUES_URL } from 'utilities/constants'
import { colors } from 'utilities/colors'

type Props = {
  leagueId: string,
  miniDraftPicks: MiniDraftPicksState,
  passMiniDraftPick: Function,
  deadline?: Date
}

const DraftPlayerLink = styled(Link)(({ theme }) => ({
  color: colors.white,
  marginLeft: theme.spacing(0.5)
}))

const UserCanPickAlert = (props: Props) => {
  const {
    leagueId,
    miniDraftPicks: { canMakeMiniDraftPick, submitting },
    passMiniDraftPick,
    deadline
  } = props

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
      <Alert sx={{ display: 'flex', alignItems: 'center' }} variant='filled' severity='info'>
        It&apos;s your turn to
        <DraftPlayerLink to={`${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions`}>
          draft a player
        </DraftPlayerLink> or
        <Box sx={(theme) => ({ display: 'inline', marginLeft: theme.spacing(0.5) })}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setDialogOpen(true)}
          >
            Pass
          </Button>
        </Box>
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
