import { useEffect } from 'react'
import {
  Paper,
  Accordion,
  Typography,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'

import { teamCrestPathLoader } from 'utilities/helpers'


import { Team } from 'types'

type Props = {
  team?: Team,
  teamId: string,
  fetchTeam: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    crest: {
      marginRight: theme.spacing(0.5),
      maxHeight: theme.spacing(6)
    },
    wrapper: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center'
    }
  })
)

const TeamDetails = (props: Props) => {
  const { team, teamId, fetchTeam } = props

  const classes = useStyles()

  useEffect(
    () => {
      fetchTeam(teamId)
    }, [fetchTeam, teamId]
  )

  if (!team) return null

  const { name, shortName } = team

  return (
    <div className={classes.wrapper}>
      <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
      <Typography variant='h4'>
        {name}
      </Typography>
    </div>
  )
}

export default TeamDetails
