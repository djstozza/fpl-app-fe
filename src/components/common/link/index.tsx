import { Link as ReactRouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'

import { colors } from 'utilities/colors'

type Props = {
  to: string,
  children: any,
  noWrap?: boolean,
  image?: boolean
}

const StyledLink = styled(ReactRouterLink, {
  shouldForwardProp: (prop) => prop !== 'noWrap' && prop !== 'image'
})<{ noWrap?: boolean, image?: boolean }>(({ noWrap, image }) => ({
  textDecoration: 'none',
  color: colors.linkBlue,
  ...(noWrap && { whiteSpace: 'nowrap' }),
  ...(image && { display: 'flex', alignItems: 'center' })
}))

const Link = (props: Props) => {
  const {
    to,
    noWrap,
    image,
    children
  } = props

  return (
    <StyledLink
      to={to}
      noWrap={noWrap}
      image={image}
    >
     {children}
    </StyledLink>
  );
}

export default Link
