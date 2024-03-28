import { within, render, screen, fireEvent } from '@testing-library/react'

import UserCanPickAlert from '.'
import { LEAGUES_URL } from 'utilities/constants'
import { initialState } from 'state/miniDraftPicks/reducer'
import { MINI_DRAFT_PICK_STATUS } from 'test/fixtures'
import { MockedRouter, blank__ } from 'test/helpers'

const leagueId = '4'

describe('UserCanPickAlert', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <UserCanPickAlert
        leagueId={leagueId}
        miniDraftPicks={{ ...initialState, ...MINI_DRAFT_PICK_STATUS }}
        passMiniDraftPick={blank__}
        deadline={new Date()}
        {...props}
      />
    </MockedRouter>
  )

  const alert = () => screen.getByRole('alert')
  const draftLink = () => within(alert()).getByRole('link', { name: /draft a player/i })
  const passButton = () => within(alert()).getByRole('button', { name: /pass/i })

  const presentation = () => screen.queryAllByRole('presentation')
  const dialog = () => presentation()[1]

  const confirm = () => within(dialog()).getByRole('button', { name: /confirm/i })
  const cancel = () => within(dialog()).getByRole('button', { name: /cancel/i })
  const backdrop = () => document.querySelector('.MuiBackdrop-root') as HTMLElement

  // const draftLink = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))').find('Link')
  // const passButton = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))').find('button')
  // const dialog = wrapper => wrapper.find('WithStyles(ForwardRef(Dialog))')

  it('returns nothing if canMakeMiniDraftPick = false', () => {
    const { container } = customRender({ miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, canMakeMiniDraftPick: false } })

    expect(container).toBeEmptyDOMElement()
  })

  it('returns nothing if deadline is not defined', () => {
    const { container } = customRender({ deadline: undefined })

    expect(container).toBeEmptyDOMElement()
  })

  it('shows both the draftLink and passButton if canMakeMiniDraftPick = true', () => {
    customRender()

    expect(draftLink()).toHaveAttribute('href', `${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions`)
    expect(passButton()).toBeInTheDocument()
  })

  it('allows the user to pass if canMakeMiniDraftPick = true', () => {
    const passMiniDraftPick = jest.fn()
    customRender({ passMiniDraftPick })

    expect(presentation()).toHaveLength(0)

    fireEvent.click(passButton())

    expect(dialog().style.opacity).toEqual('1')

    expect(dialog()).toHaveTextContent(
      `Are you wish to pass? You will not be allowed to draft more players after two passes.`
    )

    fireEvent.click(confirm())
    expect(dialog().style.opacity).toEqual('0')

    expect(passMiniDraftPick).toHaveBeenCalled()
  })

  it('closes the pass mini draft dialog when cancel is clicked', () => {
    const passMiniDraftPick = jest.fn()
    customRender({ passMiniDraftPick })

    expect(presentation()).toHaveLength(0)

    fireEvent.click(passButton())

    expect(dialog().style.opacity).toEqual('1')

    fireEvent.click(cancel())
    expect(dialog().style.opacity).toEqual('0')

    expect(passMiniDraftPick).not.toHaveBeenCalled()
  })

  it('closes the pass mini draft dialog when clicking out of the dialog', () => {
    const passMiniDraftPick = jest.fn()
    customRender({ passMiniDraftPick })

    expect(presentation()).toHaveLength(0)

    fireEvent.click(passButton())
    expect(dialog().style.opacity).toEqual('1')
    
    fireEvent.click(backdrop())

    expect(dialog().style.opacity).toEqual('0')

    expect(passMiniDraftPick).not.toHaveBeenCalled()
  })
})
