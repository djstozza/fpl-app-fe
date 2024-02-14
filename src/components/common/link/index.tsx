import { Link as ReactRouterLink } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import classNames from 'classnames';

import { colors } from 'utilities/colors'

type Props = {
  to: string,
  children: any,
  noWrap?: boolean,
  image?: boolean
}

const useStyles = makeStyles()(() =>
  ({
    link: {
      textDecoration: 'none',
      color: colors.linkBlue
    },

    noWrap: {
      whiteSpace: 'nowrap'
    },

    imageContainer: {
      display: 'flex',
      alignItems: 'center'
    }
  }));

const Link = (props: Props) => {
  const {
    to,
    noWrap,
    image,
    children
  } = props
  const { classes }= useStyles()

  return (
    <ReactRouterLink
      to={to}
      className={
        classNames(
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
  );
}

export default Link
