import { Link } from 'react-router-dom'
import classnames from 'classnames'
import {
  Button,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'

type Props = {
  to: string,
  children: any,
  color: 'inherit' | 'default' | 'primary' | 'secondary' | undefined,
  rightMargin?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightMargin: {
      marginRight: theme.spacing(1)
    }
  })
)

const ButtonLink = (props: Props) => {
  const {
    to,
    rightMargin,
    color,
    children
  } = props
  const classes= useStyles()

  return (
    <Button
      component={Link}
      to={to}
      variant='contained'
      color={color}
      className={classnames({ [classes.rightMargin]: rightMargin })}
    >
      {children}
    </Button>
  )
}

export default ButtonLink
