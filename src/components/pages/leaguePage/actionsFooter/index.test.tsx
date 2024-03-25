import { fireEvent, render, screen } from '@testing-library/react'

import ActionsFooter from '.'

import { MockedRouter, blank__ } from 'test/helpers'
import { LIVE_LEAGUE, INITIALIZED_LEAGUE } from 'test/fixtures'

describe('ActionsFooter', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <ActionsFooter
        league={{ ...LIVE_LEAGUE, canGoToDraft: true }}
        generateDraftPicks={blank__}
        createDraft={blank__}
        detailsPage
        submitting={false}
        {...props}
      />
    </MockedRouter>
  )

  const button = text => screen.getByText(text, { selector: 'button' })
  
  it('renders all button links', () => {
    const generateDraftPicks = jest.fn()
    const createDraft = jest.fn()
    const { container } = customRender({ generateDraftPicks, createDraft })
    
    expect(container.querySelectorAll('.MuiButtonBase-root')).toHaveLength(5)

    fireEvent.click(button('Generate draft picks'))
    expect(generateDraftPicks).toHaveBeenCalledWith(LIVE_LEAGUE.id)

    fireEvent.click(button('Create draft'))
    expect(createDraft).toHaveBeenCalledWith(LIVE_LEAGUE.id)
  })

  it('disables buttons when submitting = true', () => {
    customRender({ submitting: true })

    expect(button('Generate draft picks')).toHaveAttribute('disabled')
    expect(button('Create draft')).toHaveAttribute('disabled')
  })

  it('renders no buttons if not the owner and league is only initialized', () => {
    const { container } = customRender({
      league: { ...INITIALIZED_LEAGUE, isOwner: false },
      generateDraftPicks: false,
      createDraft: false,
      submitting: false,
      detailsPage: false
    })

    expect(container.querySelectorAll('.MuiButtonBase-root')).toHaveLength(0)
  })
})
