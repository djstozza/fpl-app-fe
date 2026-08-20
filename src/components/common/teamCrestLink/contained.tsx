import { Box } from '@mui/material'

import TeamCrestLink from '.'
import type { Props } from '.'

const ContainedTeamCrestLink = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={(theme) => ({ width: theme.spacing(8.5) })}>
        <TeamCrestLink {...props} />
      </Box>
    </Box>
  )
}

export default ContainedTeamCrestLink
