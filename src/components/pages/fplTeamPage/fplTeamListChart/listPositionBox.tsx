import { useRef } from 'react'
import { Box } from '@mui/material'

import { colors } from 'utilities/colors'
import { teamCrestPathLoader } from 'utilities/helpers'
import type { ListPositionChartDisplay} from 'types'

type Props = {
  fplTeamListId: string,
  listPosition: ListPositionChartDisplay,
  fetchValidSubstitutions: Function,
  selectedListPositionId?: string,
  setSelectedListPositionId: Function,
  canSubstitute: boolean,
  validSubstitutions: string[],
  substitute?: boolean,
  fetching: boolean,
  submitting: boolean,
  processSubstitution: Function,
  clearValidSubstitutions: Function
}

const crestSx = (theme) => ({ maxHeight: theme.spacing(4) })

const playerSx = { zIndex: 2 }

const playerInfoSx = (theme) => ({
  border: `1px solid ${colors.black}`,
  borderRadius: theme.spacing(0.5),
  backgroundColor: colors.black,
  fontSize: 12
})

const ListPositionBox = (props: Props) => {
  const {
    fplTeamListId,
    listPosition: {
      id,
      player: { lastName },
      totalPoints,
      team: { shortName },
      opponents,
      legs
    },
    canSubstitute,
    substitute,
    fetchValidSubstitutions,
    selectedListPositionId,
    setSelectedListPositionId,
    validSubstitutions = [],
    fetching,
    submitting,
    processSubstitution,
    clearValidSubstitutions
  } = props

  const playerRef = useRef<null | HTMLDivElement>(null)

  const isSelected = selectedListPositionId === id
  const validSubstitution = validSubstitutions.includes(id)

  const handleSubstitution = () => {
    if (!selectedListPositionId) return
    processSubstitution(fplTeamListId, selectedListPositionId, id)
    setSelectedListPositionId(null)
  }

  const handleClick = () => {
    if (submitting) return
    if (!canSubstitute) return
    if (Boolean(selectedListPositionId) && Boolean(!isSelected) && Boolean(!validSubstitution)) return

    if (validSubstitution) {
      handleSubstitution()
    } else {
      setSelectedListPositionId(selectedListPositionId ? null : id)
    }

    if (selectedListPositionId) {
      clearValidSubstitutions()
    } else {
      fetchValidSubstitutions(id)
    }

    if (!selectedListPositionId) playerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const isValidSubstitution = Boolean(!fetching && selectedListPositionId && validSubstitution)
  const canSelect = Boolean(canSubstitute && (!selectedListPositionId || isSelected || validSubstitution))

  return (
    <Box
      data-testid='ListPositionBox'
      onClick={handleClick}
      sx={[
        (theme) => ({
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          width: theme.spacing(20),
          height: theme.spacing(12),
          color: colors.white,
          [theme.breakpoints.up('md')]: {
            height: theme.spacing(22)
          }
        }),
        Boolean(substitute) && {
          backgroundColor: colors.grey700,
          border: `1px solid ${colors.white}`
        },
        isSelected && {
          backgroundColor: colors.red,
          border: `1px solid ${colors.white}`
        },
        isValidSubstitution && {
          backgroundColor: colors.blue700,
          border: `1px solid ${colors.white}`
        },
        canSelect && { cursor: 'pointer' }
      ]}
    >
      <Box sx={playerSx}>
        <Box
          component='img'
          src={teamCrestPathLoader(shortName)}
          alt={shortName}
          sx={crestSx}
        />
        <Box sx={playerInfoSx}>
          <div>
            {lastName}
          </div>
          <div>
            {opponents.map(({ shortName }, k) => `${shortName} (${legs[k]})`)}
          </div>
          {
            totalPoints &&
            <div>
              {totalPoints}
            </div>
          }
        </Box>
        <div ref={playerRef} />
      </Box>
    </Box>
  );
}

export default ListPositionBox
