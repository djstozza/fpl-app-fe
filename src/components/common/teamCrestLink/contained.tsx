import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

import TeamCrestLink from '.'
import type { Props } from '.'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },

  box: {
    width: theme.spacing(8.5)
  }
}));

const ContainedTeamCrestLink = (props: Props) => {
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <TeamCrestLink {...props} />
      </div>
    </div>
  )
}

export default ContainedTeamCrestLink
