import { within, render, screen } from '@testing-library/react'

import ContainedTeamCrestLink from './contained'
import TeamCrestLink from '.'
import { MockedRouter } from 'test/helpers'
import { TEAMS_URL } from 'utilities/constants'
import { TEAM_BASE } from 'test/fixtures'

describe('TeamCrestLink', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <TeamCrestLink
        team={TEAM_BASE}
        {...props}
      />
    </MockedRouter>
  )

  const link = () => screen.getByRole('link')

  it('renders a link wih the team crest', () => {
    customRender()

    expect(link()).toHaveTextContent(TEAM_BASE.shortName)
    expect(link().getAttribute('href')).toEqual(`${TEAMS_URL}/${TEAM_BASE.id}/`)
    expect(within(link()).getByRole('img').getAttribute('src')).toContain(`${TEAM_BASE.shortName.toLocaleLowerCase()}.png`)
  })

  it('adds a tab to the url if one is provided', () => {
    customRender({ tab: 'players' })

    expect(link().getAttribute('href')).toEqual(`${TEAMS_URL}/${TEAM_BASE.id}/players`)
  })
})

describe('ContainedTeamCrestLink', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <ContainedTeamCrestLink
        team={TEAM_BASE}
        {...props}
      />
    </MockedRouter>
  )

  const link = () => screen.getByRole('link')

  it('renders a contained version of the TeamCrestLink', () => {
    const { container } = customRender()

    if (container.firstChild && container.firstChild instanceof Element) {
      expect(container.firstChild.classList.toString()).toContain('container')
    } else {
      throw new Error('container.firstChild is either null or not an instance of Element')
    }

    expect(link()).toHaveTextContent(TEAM_BASE.shortName)
    expect(link().getAttribute('href')).toEqual(`${TEAMS_URL}/${TEAM_BASE.id}/`)
    expect(within(link()).getByRole('img').getAttribute('src')).toContain(`${TEAM_BASE.shortName.toLocaleLowerCase()}.png`)
  })
})
