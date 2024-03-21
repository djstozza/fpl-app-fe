import { useRef } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'
import classNames from 'classnames'

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

const useStyles = makeStyles()((theme: Theme) => ({
  crest: {
    maxHeight: theme.spacing(4)
  },

  large: {
    maxHeight: theme.spacing(4)
  },

  startingContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center'
  },

  substitutesContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column'
    }
  },

  playerContainer: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(20),
    height: theme.spacing(12),
    color: colors.white
  },

  substitute: {
    backgroundColor: colors.grey700,
    border: `1px solid ${colors.white}`,
  },

  selected: {
    backgroundColor: colors.red,
    border: `1px solid ${colors.white}`,
  },

  validSubstitution: {
    backgroundColor: colors.blue700,
    border: `1px solid ${colors.white}`
  },

  canSelect: {
    cursor: 'pointer'
  },

  player: {
    zIndex: 2
  },

  playerInfo: {
    border: `1px solid ${colors.black}`,
    borderRadius: theme.spacing(0.5),
    backgroundColor: colors.black,
    fontSize: 12
  }
}))

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

  const { classes } = useStyles()
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

    validSubstitution
      ? handleSubstitution()
      : setSelectedListPositionId(selectedListPositionId ? null : id)

    selectedListPositionId ? clearValidSubstitutions() : fetchValidSubstitutions(id)
    !selectedListPositionId && playerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      data-testid='ListPositionBox'
      onClick={handleClick}
      className={
        classNames(
          classes.playerContainer,
          {
            [classes.substitute]: substitute,
            [classes.selected]: isSelected,
            [classes.validSubstitution]: !fetching && selectedListPositionId && validSubstitution,
            [classes.canSelect]: canSubstitute && (!selectedListPositionId || isSelected || validSubstitution)
          }
        )
      }
    >
      <div className={classes.player}>
        <img
          src={teamCrestPathLoader(shortName)}
          alt={shortName}
          className={classes.crest}
        />
        <div className={classes.playerInfo}>
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
        </div>
        <div ref={playerRef} />
      </div>
    </div>
  );
}

export default ListPositionBox
