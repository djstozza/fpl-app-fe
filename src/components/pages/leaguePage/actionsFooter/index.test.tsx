import { createMount } from '@material-ui/core/test-utils'

import ActionsFooter from '.'

import { MockedRouter, blank__ } from 'test/helpers'
import { LIVE_LEAGUE, INITIALIZED_LEAGUE } from 'test/fixtures'

describe('ActionsFooter', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <ActionsFooter
        league={{ ...LIVE_LEAGUE, canGoToDraft: true }}
        generateDraftPicks={blank__}
        createDraft={blank__}
        detailsPage
        {...props}
      />
    </MockedRouter>
  )

  const buttonLink = wrapper => wrapper.find('WithStyles(ForwardRef(ButtonBase))')
  const button = (wrapper, i) => buttonLink(wrapper).at(i).find('button')

  it('renders all button links', () => {
    const generateDraftPicks = jest.fn()
    const createDraft = jest.fn()
    const wrapper = render({ generateDraftPicks, createDraft })

    expect(buttonLink(wrapper)).toHaveLength(5)
    button(wrapper, 1).simulate('click')

    expect(generateDraftPicks).toHaveBeenCalledWith(LIVE_LEAGUE.id)

    button(wrapper, 2).simulate('click')
    expect(createDraft).toHaveBeenCalledWith(LIVE_LEAGUE.id)
  })

  it('disables buttons when submitting = true', () => {
    const wrapper = render({ submitting: true })

    expect(button(wrapper, 1).props().disabled).toEqual(true)
    expect(button(wrapper, 2).props().disabled).toEqual(true)
  })

  it('renders no buttons if not the owner and league is only initialized', () => {
    const wrapper = render({
      league: { ...INITIALIZED_LEAGUE, isOwner: false },
      generateDraftPicks: false,
      createDraft: false,
      submitting: false,
      detailsPage: false
    })

    expect(buttonLink(wrapper)).toHaveLength(0)
  })
})
