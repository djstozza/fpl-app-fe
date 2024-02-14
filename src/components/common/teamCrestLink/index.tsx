import Link from '../link'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'

import type { TeamBase } from 'types'

export type Props = {
  team: TeamBase
  tab?: string,
  size?: string
}

const useStyles = makeStyles()((theme: Theme) => ({
  crest: {
    maxHeight: theme.spacing(3),
    marginRight: theme.spacing(1)
  },

  large: {
    maxHeight: theme.spacing(4)
  }
}));

const TeamCrestLink = (props: Props) => {
  const {
    team: { id, shortName },
    tab,
    size = 'small'
  } = props

  const { classes, cx } = useStyles()

  return (
    <Link to={`${TEAMS_URL}/${id}/${tab ? tab : ''}`} image>
      <img
        src={teamCrestPathLoader(shortName)}
        alt={shortName}
        className={
          cx(
            classes.crest,
            {
              [classes.large]: size === 'large'
            }
          )
        }
      />
      <div>
        {shortName}
      </div>
    </Link>
  );
}

export default TeamCrestLink
