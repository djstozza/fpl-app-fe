import { within, render, screen } from '@testing-library/react'
import timezoneMock from 'timezone-mock'

import FixtureSummary from '.'
import { MockedRouter } from 'test/helpers'
import {
  IN_PROGRESS_FIXTURE,
  UPCOMING_FIXTURE,
  FINISHED_FIXTURE,
  MANCHESTER_UNITED_TEAM_BASE,
  LEEDS_TEAM_BASE,
  ARSENAL_TEAM_BASE,
  BRENTFORD_TEAM_BASE,
  MANCHESTER_CITY_TEAM_BASE,
  SPURS_TEAM_BASE
} from 'test/fixtures'
import { TEAMS_URL } from 'utilities/constants'

describe('FixtureSummary', () => {
  timezoneMock.register('Australia/Adelaide')

  const customRender = (props = {}) => render(
    <MockedRouter>
      <FixtureSummary
        fixture={IN_PROGRESS_FIXTURE}
        {...props}
      />
    </MockedRouter>
  )

  const link = (i) => screen.getAllByRole('link')[i]
  const linkBox = (i) => link(i).querySelector('.MuiBox-root')

  const boxes = () => document.querySelectorAll('.MuiBox-root')

  const expandMoreIcon = () => within(screen.getByRole('button')).queryByTestId('ExpandMoreIcon')

  const fontWeightBold = 'font-weight: 700;'
  const fontWeightRegular = 'font-weight: 400;'

  describe('in progress fixtures', () => {
    it('shows the details in bold', () => {
      customRender()

      expect(boxes()).toHaveLength(5)

      expect(link(0)).toHaveAttribute('href', `${TEAMS_URL}/${MANCHESTER_UNITED_TEAM_BASE.id}`)
      expect(linkBox(0)).toHaveStyle(fontWeightBold)
      expect(linkBox(0)).toHaveTextContent(MANCHESTER_UNITED_TEAM_BASE.shortName)

      expect(boxes()[1]).toHaveStyle(fontWeightBold)
      expect(boxes()[1]).toHaveTextContent('21:00')

      expect(boxes()[2]).toHaveStyle(fontWeightBold)
      expect(boxes()[2])
        .toHaveTextContent(`${IN_PROGRESS_FIXTURE.homeTeamScore} - ${IN_PROGRESS_FIXTURE.awayTeamScore}`)

      expect(boxes()[3]).toHaveStyle(fontWeightBold)
      expect(boxes()[3]).toHaveTextContent(`(${IN_PROGRESS_FIXTURE.minutes})`)

      expect(link(1)).toHaveAttribute('href', `${TEAMS_URL}/${LEEDS_TEAM_BASE.id}`)
      expect(linkBox(1)).toHaveStyle(fontWeightBold)
      expect(linkBox(1)).toHaveTextContent(LEEDS_TEAM_BASE.shortName)
    })

    it('shows the expand button', () => {
      customRender()

      expect(expandMoreIcon()).toBeInTheDocument()
    })
  })

  describe('finished fixtures', () => {
    it('shows details in normal font', () => {
      customRender({ fixture: FINISHED_FIXTURE })

      expect(boxes()).toHaveLength(5)

      expect(link(0)).toHaveAttribute('href', `${TEAMS_URL}/${BRENTFORD_TEAM_BASE.id}`)
      expect(linkBox(0)).toHaveStyle(fontWeightRegular)
      expect(linkBox(0)).toHaveTextContent(BRENTFORD_TEAM_BASE.shortName)

      expect(boxes()[1]).toHaveStyle(fontWeightRegular)
      expect(boxes()[1]).toHaveTextContent('04:30')

      expect(boxes()[2]).toHaveStyle(fontWeightRegular)
      expect(boxes()[2])
        .toHaveTextContent(`${FINISHED_FIXTURE.homeTeamScore} - ${FINISHED_FIXTURE.awayTeamScore}`)

      expect(boxes()[3]).toHaveStyle(fontWeightRegular)
      expect(boxes()[3]).toHaveTextContent(`(${FINISHED_FIXTURE.minutes})`)

      expect(link(1)).toHaveAttribute('href', `${TEAMS_URL}/${ARSENAL_TEAM_BASE.id}`)
      expect(linkBox(1)).toHaveStyle(fontWeightRegular)
      expect(linkBox(1)).toHaveTextContent(ARSENAL_TEAM_BASE.shortName)
    })

    it('shows the expand button', () => {
      customRender({ fixture: FINISHED_FIXTURE })

      expect(expandMoreIcon()).toBeInTheDocument()
    })
  })

  describe('upcoming fixtures', () => {
    it('only shows the team links and times - in normal font', () => {
      customRender({ fixture: UPCOMING_FIXTURE })

      expect(boxes()).toHaveLength(3)

      expect(link(0)).toHaveAttribute('href', `${TEAMS_URL}/${SPURS_TEAM_BASE.id}`)
      expect(linkBox(0)).toHaveStyle(fontWeightRegular)
      expect(linkBox(0)).toHaveTextContent(SPURS_TEAM_BASE.shortName)

      expect(boxes()[1]).toHaveStyle(fontWeightRegular)
      expect(boxes()[1]).toHaveTextContent('01:00')

      expect(link(1)).toHaveAttribute('href', `${TEAMS_URL}/${MANCHESTER_CITY_TEAM_BASE.id}`)
      expect(linkBox(1)).toHaveStyle(fontWeightRegular)
      expect(linkBox(1)).toHaveTextContent(MANCHESTER_CITY_TEAM_BASE.shortName)
    })

    it('does not show the expand button', () => {
      customRender({ fixture: UPCOMING_FIXTURE })

      expect(expandMoreIcon()).not.toBeInTheDocument()
    })
  })
})
