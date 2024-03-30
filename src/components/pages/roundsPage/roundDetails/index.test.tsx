import { within, render, screen } from '@testing-library/react'
import timezoneMock from 'timezone-mock'

import RoundDetails from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { ROUND_1 } from 'test/fixtures'

describe('RoundDetails', () => {
  timezoneMock.register('Australia/Adelaide')

  const customRender = (props = {}) => render(
    <MockedRouter>
      <RoundDetails
        roundId={ROUND_1.id}
        round={ROUND_1}
        fetchRound={blank__}
        {...props}
      />
    </MockedRouter>
  )
  
  const heading = () => screen.getAllByRole('heading')[0]
  const detailsContainer = () =>  screen.getAllByTestId('round-day-container')
  const detailsHeading = (i) => within(detailsContainer()[i]).getByRole('heading')
  const accordionButton = (i) => within(detailsContainer()[i]).getAllByRole('button')

  it('shows the round name and groups the fixtures by date', () => {
    customRender()

    expect(heading()).toHaveTextContent(ROUND_1.name)
    
    expect(detailsContainer()).toHaveLength(2)
    
    expect(detailsHeading(0)).toHaveTextContent('14th August 2021')
    expect(accordionButton(0)).toHaveLength(2)
    
    expect(detailsHeading(1)).toHaveTextContent('16th August 2021')
    expect(accordionButton(1)).toHaveLength(1)
  })

  it('fetches the round if a round id is present', () => {
    const fetchRound = jest.fn()

    customRender({ fetchRound })

    expect(fetchRound).toHaveBeenCalledWith(ROUND_1.id)
  })

  it('does not fetch the round if roundId is null', () => {
    const fetchRound = jest.fn()

    customRender({ roundId: null, fetchRound })

    expect(fetchRound).not.toHaveBeenCalled()
  })

  it('renders nothing if the round is not present', () => {
    const { container } = customRender({ round: null })
    
    expect(container).toBeEmptyDOMElement()
  })
})
