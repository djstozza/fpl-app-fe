import Link from '../link'
import { Box } from '@mui/material'

import { teamCrestPathLoader } from 'utilities/helpers'
import { TEAMS_URL } from 'utilities/constants'

import type { TeamBase } from 'types'

export type Props = {
  team: TeamBase
  tab?: string,
  size?: string
}

const TeamCrestLink = (props: Props) => {
  const {
    team: { id, shortName },
    tab,
    size = 'small'
  } = props

  return (
    <Link to={`${TEAMS_URL}/${id}/${tab ? tab : ''}`} image>
      <Box
        component='img'
        src={teamCrestPathLoader(shortName)}
        alt={shortName}
        sx={(theme) => ({
          maxHeight: theme.spacing(size === 'large' ? 4 : 3),
          marginRight: theme.spacing(1)
        })}
      />
      <div>
        {shortName}
      </div>
    </Link>
  );
}

export default TeamCrestLink
