import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

type Props = {
  to: string,
  children: any,
  size?: 'small' | 'medium' | 'large'
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined,
  onClick?: () => void,
  rightMargin?: boolean
}

const ButtonLink = (props: Props) => {
  const {
    to,
    rightMargin,
    size = 'medium',
    color,
    onClick,
    children
  } = props

  return (
    <Button
      variant='contained'
      component={Link}
      to={to}
      size={size}
      color={color}
      sx={rightMargin ? (theme) => ({ marginRight: theme.spacing(1) }) : undefined}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ButtonLink
