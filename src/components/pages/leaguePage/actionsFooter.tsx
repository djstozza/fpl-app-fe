import classnames from 'classnames'
import {
  Button,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'

import ButtonLink from 'components/common/buttonLink'
import { LEAGUES_URL } from 'utilities/constants'

import type { League } from 'types'

type Props = {
  league: League,
  detailsPage?: boolean,
  generateDraftPicks: Function,
  createDraft: Function,
  submitting: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    rightMargin: {
      marginRight: theme.spacing(1)
    }
  })
)


const ActionsFooter = (props: Props) => {
  const {
    league: {
      id,
      isOwner,
      canGenerateDraftPicks,
      canCreateDraft
    },
    generateDraftPicks,
    createDraft,
    submitting,
    detailsPage
  } = props

  const classes = useStyles()

  const setColor = (index) => index === 0 || index % 2 === 0 ? 'primary' : 'default'

  const buttons = [
    {
      renderCondition: isOwner && detailsPage,
      render: (index, addRightMargin) => (
        <ButtonLink
          to={`${LEAGUES_URL}/${id}/details/edit`}
          color={setColor(index)}
          rightMargin={addRightMargin}
        >
          Edit Details
        </ButtonLink>
      )
    },
    {
      renderCondition: isOwner && canGenerateDraftPicks,
      render: (index, addRightMargin) => (
        <Button
          variant='contained'
          color={setColor(index)}
          onClick={() => generateDraftPicks(id)}
          disabled={submitting}
          className={classnames({ [classes.rightMargin]: addRightMargin })}
        >
          Generate draft picks
        </Button>
      )
    },
    {
      renderCondition: isOwner && canCreateDraft,
      render: (index, addRightMargin) => (
        <Button
          variant='contained'
          color={setColor(index)}
          onClick={() => createDraft(id)}
          disabled={submitting}
          className={classnames({ [classes.rightMargin]: addRightMargin })}
        >
          Create draft
        </Button>
      )
    }
  ]

  const renderableButtons = buttons.filter(({ renderCondition }) => renderCondition)
  const renderableButtonsLength = renderableButtons.length

  return (
    <div className={classes.actions}>
      {
        renderableButtons.map(({ render }, index) => {
          const addRightMargin = renderableButtonsLength > 1 && index < renderableButtonsLength

          return render(index, addRightMargin)
        })
      }
    </div>
  )
}

export default ActionsFooter
