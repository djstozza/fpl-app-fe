import { useEffect, Fragment } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import FixturesTable from './fixturesTable'
import PlayersTable from './playersTable'
import { teamCrestPathLoader } from 'utilities/helpers'

import { Team } from 'types'

type Props = {
  team?: Team,
  teamId: string,
  fetchTeam: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center'
    },
    crest: {
      marginRight: theme.spacing(0.5),
      maxHeight: theme.spacing(6)
    },
    summary: {
      textAlign: 'center',
      backgroundColor: '#eeeeee',
      border: '0.5px solid #e0e0e0'
    },
    container: {
      height: '100vh',
      overflowX: 'auto',
      padding: 0,
      margin: 'auto'
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

  const { name, shortName, fixtures, players } = team

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
        <Typography variant='h4'>
          {name}
        </Typography>
      </div>
      <Accordion>
        <AccordionSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
        >
          Fixtures
        </AccordionSummary>
        <AccordionDetails className={classes.container}>
          <FixturesTable fixtures={fixtures} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
        >
          Players
        </AccordionSummary>
        <AccordionDetails className={classes.container}>
          <PlayersTable players={players} />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  )
}

export default TeamDetails