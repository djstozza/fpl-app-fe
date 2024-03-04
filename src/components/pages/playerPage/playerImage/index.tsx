import { useCallback, useEffect, useState  } from 'react'
import { makeStyles } from 'tss-react/mui';
import {
  Theme,
} from '@mui/material'

import { playerPlaceHolderLoader, playerImage } from 'utilities/helpers'

type Props = {
  lastName: string
  code: number,
  maxHeight: number
}

type HeightProps = {
  maxHeight: number,
}

const useStyles = makeStyles<HeightProps>()((theme: Theme, { maxHeight }) => ({
  playerImage: {
    width: theme.spacing(27.5),
    height: theme.spacing(35),
    [theme.breakpoints.up('sm')]: {
      maxHeight: maxHeight,
      maxWidth: 0.79 * maxHeight
    }
  }
}));

const PlayerImage = (props: Props) => {
  const { code, lastName, maxHeight } = props
  const { classes } = useStyles({ maxHeight })
  const src = playerImage(code)
  const [imgSrc, setSrc] = useState(playerPlaceHolderLoader())

  const onLoad = useCallback(() => {
    setSrc(src)
  }, [src])

  useEffect(() => {
    const img = new Image()
    img.src = src as string
    img.addEventListener('load', onLoad)
    return () => {
      img.removeEventListener('load', onLoad)
    }
  }, [src, onLoad])

  return <img className={classes.playerImage} alt={lastName} src={imgSrc} />
}

export default PlayerImage
