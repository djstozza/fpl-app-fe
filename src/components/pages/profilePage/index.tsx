import { useMemo } from 'react'
import { connect } from 'react-redux'
import {
  Theme,
  Typography,
  makeStyles,
  createStyles
} from '@material-ui/core'

import { authActions } from 'state/auth'

import type { User } from 'types'

type Props = {
  user: User
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1)
    }
  })
)

const ProfilePage = (props: Props) => {
  const { user: { username } } = props
  const classes = useStyles()

  return (
    <Typography variant='h4' className={classes.title}>
      {username}
    </Typography>
  )
}

const mapStateToProps = (state) => {
  const {
    auth: { user }
  } = state

  return {
    user
  }
}

const matchDispatchToProps = {
  
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfilePage)
