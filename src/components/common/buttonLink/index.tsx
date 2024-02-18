import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { Button, Theme } from '@mui/material'
import classNames from 'classnames'

type Props = {
  to: string,
  children: any,
  size?: 'small' | 'medium' | 'large'
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined,
  onClick?: () => void,
  rightMargin?: boolean
}

const useStyles = makeStyles()((theme: Theme) =>
  ({
    rightMargin: {
      marginRight: theme.spacing(1)
    }
  }));

const ButtonLink = (props: Props) => {
  const {
    to,
    rightMargin,
    size = 'medium',
    color,
    onClick,
    children
  } = props
  const { classes }= useStyles()

  return (
    <Button
      variant='contained'
      component={Link}
      to={to}
      size={size}
      color={color}
      className={classNames({ [classes.rightMargin]: rightMargin })}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ButtonLink
