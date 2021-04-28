import Link from '../link'
import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'

import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'

import type { TeamBase } from 'types'

type Props = {
  team: TeamBase
  tab?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    crest: {
      maxHeight: theme.spacing(3),
      marginRight: theme.spacing(1)
    }
  })
)

const TeamCrestLink = (props: Props) => {
  const {
    team: { id, shortName },
    tab
  } = props

  const classes = useStyles()

  return (
    <Link to={`${TEAMS_URL}/${id}/${tab ? tab : ''}`} image>
      <img src={teamCrestPathLoader(shortName)} alt={shortName} className={classes.crest} />
      <div>
        {shortName}
      </div>
    </Link>
  )
}

export default TeamCrestLink
