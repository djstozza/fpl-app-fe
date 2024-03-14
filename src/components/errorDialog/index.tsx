import { connect } from 'react-redux'
import { makeStyles } from 'tss-react/mui'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
} from '@mui/material'

import { requestActions } from 'state/request'

import { APPLICATION_ERRORS } from 'utilities/constants'

type RateLimitError = {
  retryAfter: number
}

type Props = {
  errorCode?: string,
  message?: string,
  rateLimitError?: RateLimitError,
  clearRequestErrors: Function,
  onClose?: Function
}

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    fontFamily: theme.typography.caption.fontFamily
  }
}));

export const ErrorDialog = (props: Props) => {
  const { errorCode, message, clearRequestErrors, rateLimitError, onClose } = props
  const { classes } = useStyles()

  if (!errorCode) return null

  const error = APPLICATION_ERRORS[errorCode]

  if (!error) return null
  const { action: { label, path } } = error

  const handleClose = (event: Event, reason: string) => {
    if (reason === 'backdropClick') return event.stopPropagation()
    clearRequestErrors()
    onClose && onClose()
  }

  const actions = () => {
    const btnAction = {}

    if (path) {
      btnAction['href'] = path
    } else {
      btnAction['onClick'] = handleClose
    }

    return (
      <DialogActions>
        <Button variant='contained' color='primary' {...btnAction}>
          {label}
        </Button>
      </DialogActions>
    )
  }

  const errorMessage = (): string => {
    let msg = error.message

    if (rateLimitError) {
      const { retryAfter } = rateLimitError
      msg = msg.replace('{retryAfter}', retryAfter.toString())
    }

    return msg
  }

  const dialogProps = {
    open: true,
    disableEscapeKeyDown: true,
    fullWidth: true,
    onClose: handleClose
  }

  return (
    <Dialog {...dialogProps}>
      <DialogTitle className={classes.title}>
        {error.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message || errorMessage()}
        </DialogContentText>
      </DialogContent>
      {actions()}
    </Dialog>
  )
}

const rateLimitError = (e) => {
  const error = e.errors?.find(err => err.status === '429')

  return error && error.meta
}

const mapStateToProps = (state) => {
  const { request } = state

  if (request?.errors && request?.errors?.length) {
    const error = request.errors[0]
    const { status: errorCode, message, onClose } = error

    return {
      errorCode,
      message,
      onClose,
      rateLimitError: rateLimitError(error)
    }
  }
  return {}
}

const mapDispatchToProps = {
  clearRequestErrors: requestActions.clearRequestErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDialog)
