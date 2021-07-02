import classnames from 'classnames'
import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    crest: {
      maxHeight: theme.spacing(3.5)
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
      border: '1px solid #ffffff',
      width: theme.spacing(16),
      height: theme.spacing(12),
      color: '#ffffff'
    },
    substitute: {
      backgroundColor: 'grey'
    },
    selected: {
      backgroundColor: 'red'
    },
    validSubstitution: {
      backgroundColor: 'blue'
    }
  })
)

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

  const classes = useStyles()

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
  }

  return (
    <div
      onClick={handleClick}
      className={
        classnames(classes.playerContainer,
        {
          [classes.substitute]: substitute,
          [classes.selected]: isSelected,
          [classes.validSubstitution]: !fetching && selectedListPositionId && validSubstitution
        })
      }
    >
      <div>
        <img
          src={teamCrestPathLoader(shortName)}
          alt={shortName}
          className={classes.crest}
        />
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
    </div>
  )
}

export default ListPositionBox
