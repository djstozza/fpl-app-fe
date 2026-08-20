import { Button, Box } from '@mui/material'

import ButtonLink from 'components/common/buttonLink'
import { LEAGUES_URL } from 'utilities/constants'

import type { League } from 'types'

type Props = {
  league: League,
  detailsPage?: boolean,
  generateDraftPicks: (string) => void,
  createDraft: Function,
  submitting: boolean
}

const ActionsFooter = (props: Props) => {
  const {
    league: {
      id,
      isOwner,
      canGenerateDraftPicks,
      canCreateDraft,
      canGoToDraft,
      canGoToMiniDraft
    },
    generateDraftPicks,
    createDraft,
    submitting,
    detailsPage
  } = props

  const setColor = (index) => index === 0 || index % 2 === 0 ? 'primary' : 'inherit'

  const buttons = [
    {
      renderCondition: isOwner && detailsPage,
      render: (index, addRightMargin) => (
        <ButtonLink
          key={index}
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
          key={index}
          variant='contained'
          color={setColor(index)}
          onClick={() => generateDraftPicks(id)}
          disabled={submitting}
          sx={addRightMargin ? (theme) => ({ marginRight: theme.spacing(1) }) : undefined}
        >
          Generate draft picks
        </Button>
      )
    },
    {
      renderCondition: isOwner && canCreateDraft,
      render: (index, addRightMargin) => (
        <Button
          key={index}
          variant='contained'
          color={setColor(index)}
          onClick={() => createDraft(id)}
          disabled={submitting}
          sx={addRightMargin ? (theme) => ({ marginRight: theme.spacing(1) }) : undefined}
        >
          Create draft
        </Button>
      )
    },
    {
      renderCondition: canGoToDraft,
      render: (index, addRightMargin) => (
        <ButtonLink
          key={index}
          to={`${LEAGUES_URL}/${id}/draft`}
          color={setColor(index)}
          rightMargin={addRightMargin}
        >
          Draft
        </ButtonLink>
      )
    },
    {
      renderCondition: canGoToMiniDraft,
      render: (index, addRightMargin) => (
        <ButtonLink
          key={index}
          to={`${LEAGUES_URL}/${id}/miniDraft`}
          color={setColor(index)}
          rightMargin={addRightMargin}
        >
          Mini draft
        </ButtonLink>
      )
    },
  ]

  const renderableButtons = buttons.filter(({ renderCondition }) => renderCondition)
  const renderableButtonsLength = renderableButtons.length

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      {
        renderableButtons.map(({ render }, index) => {
          const addRightMargin = renderableButtonsLength > 1 && index < renderableButtonsLength

          return render(index, addRightMargin)
        })
      }
    </Box>
  )
}

export default ActionsFooter
