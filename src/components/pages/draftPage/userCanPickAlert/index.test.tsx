import { createMount } from '@material-ui/core/test-utils'

import UserCanPickAlert from '.'
import { DRAFT_PICK_STATUS } from 'test/fixtures'
import { MockedRouter, blank__ } from 'test/helpers'

const leagueId = '4'

describe('UserCanPickAlert', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <UserCanPickAlert
        leagueId={leagueId}
        draftPicks={{ ...DRAFT_PICK_STATUS }}
        updateDraftPick={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const draftLink = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))').find('Link')
  const miniDraftButton = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))').find('button')
  const dialog = wrapper => wrapper.find('WithStyles(ForwardRef(Dialog))')

  it('returns nothing if userCanPick = false', () => {
    const wrapper = render({ draftPicks: { ...DRAFT_PICK_STATUS, userCanPick: false } })

    expect(wrapper.html()).toEqual('')
  })

  it('shows both the draftLink and miniDraftButton if canMakePlayerPick = true and canMakeMiniDraftPick = true', () => {
    const wrapper = render()

    expect(draftLink(wrapper)).toHaveLength(1)
    expect(miniDraftButton(wrapper)).toHaveLength(1)
  })

  it('only shows both the draftLink if canMakePlayerPick = true and canMakeMiniDraftPick = false', () => {
    const wrapper = render({ draftPicks: { ...DRAFT_PICK_STATUS, canMakeMiniDraftPick: false } })

    expect(draftLink(wrapper)).toHaveLength(1)
    expect(miniDraftButton(wrapper)).toHaveLength(0)
  })

  it('only shows the miniDraftButton if canMakePlayerPick = false and canMakeMiniDraftPick = true', () => {
    const wrapper = render({ draftPicks: { ...DRAFT_PICK_STATUS, canMakePlayerPick: false } })

    expect(draftLink(wrapper)).toHaveLength(0)
    expect(miniDraftButton(wrapper)).toHaveLength(1)
  })

  it('allows the user to select a mini draft pick if userCanPick = true', () => {
    const updateDraftPick = jest.fn()
    const wrapper = render({ updateDraftPick })

    expect(dialog(wrapper).props().open).toEqual(false)

    miniDraftButton(wrapper).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(true)
    expect(dialog(wrapper).text())
      .toContain('Are you wish to make a mini draft pick?')

    dialog(wrapper).find('button').at(1).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(updateDraftPick)
      .toHaveBeenCalledWith({ nextDraftPickId: DRAFT_PICK_STATUS.nextDraftPickId, miniDraft: true })
  })

  it('closes the draft dialog when cancel is clicked', () => {
    const updateDraftPick = jest.fn()
    const wrapper = render({ updateDraftPick })

    expect(dialog(wrapper).props().open).toEqual(false)

    miniDraftButton(wrapper).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(true)
    dialog(wrapper).find('button').at(0).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(updateDraftPick).not.toHaveBeenCalled()
  })

  it('closes the draft dialog when cancel is clicked', () => {
    const updateDraftPick = jest.fn()
    const wrapper = render({ updateDraftPick })

    expect(dialog(wrapper).props().open).toEqual(false)

    miniDraftButton(wrapper).simulate('click')

    wrapper.find('WithStyles(ForwardRef(Backdrop))').simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(updateDraftPick).not.toHaveBeenCalled()
  })
})
