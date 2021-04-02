import { Fragment } from 'react'
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

import { TeamState } from 'state/team'
import { PlayerSummary } from 'types'

type Props = {
  team: TeamState,
  teamId: string,
  fetchTeamPlayers: Function,
  players: PlayerSummary[],
  fetchTeamFixtures: Function,
  sort: {
    players: {
      [key: string]: string
    },
    fixtures: {
      [key: string]: string
    }
  }
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
  const {
    team: { data: team, fixtures },
    teamId,
    players,
    fetchTeamPlayers,
    fetchTeamFixtures,
    sort
  } = props

  const classes = useStyles()

  if (!team) return null

  const { name, shortName } = team

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
          <FixturesTable teamId={teamId} fixtures={fixtures} fetchTeamFixtures={fetchTeamFixtures} sort={sort} />
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
          <PlayersTable players={players} fetchTeamPlayers={fetchTeamPlayers} sort={sort} teamId={teamId} />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  )
}

export default TeamDetails
