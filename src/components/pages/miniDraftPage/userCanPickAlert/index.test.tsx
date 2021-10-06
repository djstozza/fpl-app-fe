import { createMount } from '@material-ui/core/test-utils'

import UserCanPickAlert from '.'
import { MINI_DRAFT_PICK_STATUS, LIST_POSITIONS } from 'test/fixtures'
import { MockedRouter, blank__ } from 'test/helpers'

const leagueId = '4'

describe('UserCanPickAlert', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <UserCanPickAlert
        leagueId={leagueId}
        miniDraftPicks={{ ...MINI_DRAFT_PICK_STATUS }}
        passMiniDraftPick={blank__}
        deadline={new Date()}
        {...props}
      />
    </MockedRouter>
  )

  const draftLink = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))').find('Link')
  const passButton = wrapper => wrapper.find('WithStyles(ForwardRef(Alert))').find('button')
  const dialog = wrapper => wrapper.find('WithStyles(ForwardRef(Dialog))')

  it('returns nothing if canMakeMiniDraftPick = false', () => {
    const wrapper = render({ miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, canMakeMiniDraftPick: false } })

    expect(wrapper.html()).toEqual('')
  })

  it('returns nothing if deadline is not defined', () => {
    const wrapper = render({ deadline: undefined })

    expect(wrapper.html()).toEqual('')
  })

  it('shows both the draftLink and passButton if canMakeMiniDraftPick = true', () => {
    const wrapper = render()

    expect(draftLink(wrapper)).toHaveLength(1)
    expect(passButton(wrapper)).toHaveLength(1)
  })

  it('allows the user to pass if canMakeMiniDraftPick = true', () => {
    const passMiniDraftPick = jest.fn()
    const wrapper = render({ passMiniDraftPick })

    expect(dialog(wrapper).props().open).toEqual(false)

    passButton(wrapper).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(true)
    expect(dialog(wrapper).text())
      .toContain('Are you wish to pass? You will not be allowed to draft more players after two passes.')

    dialog(wrapper).find('button').at(1).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(passMiniDraftPick).toHaveBeenCalled()
  })

  it('closes the pass mini draft dialog when cancel is clicked', () => {
    const passMiniDraftPick = jest.fn()
    const wrapper = render({ passMiniDraftPick, fplTeamList: { outListPosition: LIST_POSITIONS[0] } })

    expect(dialog(wrapper).props().open).toEqual(false)

    passButton(wrapper).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(true)
    dialog(wrapper).find('button').at(0).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(passMiniDraftPick).not.toHaveBeenCalled()
  })

  it('closes the pass mini draft dialog when cancel is clicked', () => {
    const passMiniDraftPick = jest.fn()
    const wrapper = render({ passMiniDraftPick })

    expect(dialog(wrapper).props().open).toEqual(false)

    passButton(wrapper).simulate('click')

    wrapper.find('WithStyles(ForwardRef(Backdrop))').simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(passMiniDraftPick).not.toHaveBeenCalled()
  })
})
