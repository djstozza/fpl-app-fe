import { Link as ReactRouterLink } from 'react-router-dom'
import classnames from 'classnames'
import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'

type Props = {
  to: string,
  children: any,
  noWrap?: boolean,
  image?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: '#0645AD'
    },
    noWrap: {
      whiteSpace: 'nowrap'
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

const Link = (props: Props) => {
  const {
    to,
    noWrap,
    image,
    children
  } = props
  const classes= useStyles()

  return (
    <ReactRouterLink
      to={to}
      className={
        classnames(
          classes.link,
          {
            [classes.noWrap]: noWrap,
            [classes.imageContainer]: image
          }
        )
      }
    >
     {children}
    </ReactRouterLink>
  )
}

export default Link