import { useEffect, useRef } from 'react'
import { Typography, Theme, Paper } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

import ButtonLink from 'components/common/buttonLink'

import { SetElHeight } from 'utilities/helpers'

type HeightProps = {
  containerHeight: number,

}
const useStyles = makeStyles<HeightProps>()((theme: Theme, { containerHeight }: HeightProps) => ({
  background: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: containerHeight,
    backgroundImage: 'url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnlybm5jdHpidm1ldHRrdjJjM2ZmM3diM3V1MjZla3c4ZWF2YXF4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KGTTNpVuGVhN6/giphy.gif")',
    backgroundRepeat: 'repeat'
  },
  paper: {
    padding: theme.spacing(3)
  },
  textField: {
    paddingBottom: theme.spacing(2)
  }
}));

const NotMatchPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { height: containerHeight } = SetElHeight(containerRef)
  
  useEffect(() => {
    if (!containerHeight) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [containerHeight])
  const { classes } = useStyles({ containerHeight })
  
  return (
    <div data-testid='NoMatchPage' ref={containerRef}>
      <div className={classes.background}>
        <Paper className={classes.paper}>
          <Typography variant='h4' className={classes.textField}>
            Page Not Found
          </Typography>
          <Typography variant='body1' className={classes.textField}>
            Oops! Looks like you've wandered into uncharted territory.
          </Typography>
          <ButtonLink
            to='/'
            color='primary'
          >
            Back to home page
          </ButtonLink>
        </Paper>
      </div>  
    </div>
  )
}

export default NotMatchPage