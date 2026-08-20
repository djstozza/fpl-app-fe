import { useCallback, useEffect, useState  } from 'react'
import { Box } from '@mui/material'

import { playerPlaceHolderLoader, playerImage } from 'utilities/helpers'

type Props = {
  lastName: string
  code: number,
  maxHeight: number
}

const PlayerImage = (props: Props) => {
  const { code, lastName, maxHeight } = props
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

  return (
    <Box
      component='img'
      alt={lastName}
      src={imgSrc}
      sx={(theme) => ({
        width: theme.spacing(27.5),
        height: theme.spacing(35),
        [theme.breakpoints.up('sm')]: {
          maxHeight,
          maxWidth: 0.79 * maxHeight
        }
      })}
    />
  )
}

export default PlayerImage
