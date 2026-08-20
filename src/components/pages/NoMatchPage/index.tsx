import { useEffect, useRef } from 'react'
import { Typography, Paper, Box } from '@mui/material'

import ButtonLink from 'components/common/buttonLink'

import { SetElHeight } from 'utilities/helpers'

const textFieldSx = (theme) => ({ paddingBottom: theme.spacing(2) })

const NotMatchPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { height: containerHeight } = SetElHeight(containerRef)

  useEffect(() => {
    if (!containerHeight) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [containerHeight])

  return (
    <div data-testid='NoMatchPage' ref={containerRef}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: containerHeight,
          backgroundImage: 'url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnlybm5jdHpidm1ldHRrdjJjM2ZmM3diM3V1MjZla3c4ZWF2YXF4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KGTTNpVuGVhN6/giphy.gif")',
          backgroundRepeat: 'repeat'
        }}
      >
        <Paper sx={(theme) => ({ padding: theme.spacing(3) })}>
          <Typography variant='h4' sx={textFieldSx}>
            Page Not Found
          </Typography>
          <Typography variant='body1' sx={textFieldSx}>
            Oops! Looks like you&apos;ve wandered into uncharted territory.
          </Typography>
          <ButtonLink
            to='/'
            color='primary'
          >
            Back to home page
          </ButtonLink>
        </Paper>
      </Box>
    </div>
  )
}

export default NotMatchPage