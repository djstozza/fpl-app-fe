import { fireEvent, render, screen, within } from '@testing-library/react'

import UserCanPickAlert from '.'
import { DRAFT_PICK_STATUS } from 'test/fixtures'
import { MockedRouter, blank__ } from 'test/helpers'
import { initialState as draftInitialState } from 'state/draftPicks/reducer'

const leagueId = '4'

describe('UserCanPickAlert', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <UserCanPickAlert 
        leagueId={leagueId}
        draftPicks={{ ...draftInitialState,...DRAFT_PICK_STATUS }}
        updateDraftPick={blank__}
        {...props}
      />
    </MockedRouter>
  )
  
  const miniDraftText = /mini draft pick/i
  const draftText = /draft a player/i
  
  const draftLink = () => screen.getByRole('link', { name: draftText })
  const miniDraftButton = () => screen.getByRole('button', { name: miniDraftText })
  const presentation = () => screen.queryAllByRole('presentation')
  const dialog = () => presentation()[1]

  it('returns nothing if userCanPick = false', () => {
    customRender({ draftPicks: { ...DRAFT_PICK_STATUS, userCanPick: false } })

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows both the draftLink and miniDraftButton if canMakePlayerPick = true and canMakeMiniDraftPick = true', () => {
    customRender()

    expect(draftLink()).toBeInTheDocument()
    expect(miniDraftButton()).toBeInTheDocument()
  })

  it('only shows both the draftLink if canMakePlayerPick = true and canMakeMiniDraftPick = false', () => {
    customRender({ draftPicks: { ...DRAFT_PICK_STATUS, canMakeMiniDraftPick: false } })

    expect(draftLink()).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: miniDraftText })).not.toBeInTheDocument()
  })

  it('only shows the miniDraftButton if canMakePlayerPick = false and canMakeMiniDraftPick = true', () => {
    customRender({ draftPicks: { ...DRAFT_PICK_STATUS, canMakePlayerPick: false } })

    expect(screen.queryByRole('link', { name: miniDraftText })).not.toBeInTheDocument()
    expect(miniDraftButton()).toBeInTheDocument()
  })

  it('allows the user to select a mini draft pick if userCanPick = true', () => {
    const updateDraftPick = jest.fn()
    
    customRender({ updateDraftPick })

    fireEvent.click(miniDraftButton())

    expect(dialog()).toHaveTextContent('Are you wish to make a mini draft pick?')

    fireEvent.click(within(dialog()).getByText('Confirm'))
    expect(dialog().style.opacity).toEqual('0') // Dialog closed

    expect(updateDraftPick)
      .toHaveBeenCalledWith({ nextDraftPickId: DRAFT_PICK_STATUS.nextDraftPickId, miniDraft: true })
  })

  it('closes the draft dialog when cancel is clicked', () => {
    const updateDraftPick = jest.fn()
    customRender({ updateDraftPick })

    fireEvent.click(miniDraftButton())

    fireEvent.click(within(dialog()).getByText('Cancel'))
    
    expect(dialog().style.opacity).toEqual('0') // Dialog closed

    expect(updateDraftPick).not.toHaveBeenCalled()
  })

  it('closes the draft dialog when clicking out', () => {
    const updateDraftPick = jest.fn()
    
    customRender({ updateDraftPick })

    
    fireEvent.click(miniDraftButton())

    const backdrop = document.querySelector('.MuiBackdrop-root')

    if (backdrop) {
      fireEvent.click(backdrop)
    } else {
      throw new Error('.MuiBackdrop-root not found')
    }

    expect(dialog().style.opacity).toEqual('0') // Dialog closed
    expect(updateDraftPick).not.toHaveBeenCalled()
  })
})
