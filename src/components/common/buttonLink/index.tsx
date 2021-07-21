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
  size?: 'small' | 'medium' | 'large'
  color: 'inherit' | 'default' | 'primary' | 'secondary' | undefined,
  onClick?: Function,
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
    size = 'medium',
    color,
    onClick,
    children
  } = props
  const classes= useStyles()

  return (
    <Button
      variant='contained'
      component={Link}
      to={to}
      size={size}
      color={color}
      className={classnames({ [classes.rightMargin]: rightMargin })}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default ButtonLink
