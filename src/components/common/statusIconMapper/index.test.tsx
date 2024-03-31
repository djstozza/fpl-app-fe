import { render, screen } from '@testing-library/react'
import timezoneMock from 'timezone-mock'

import StatusIconMapper from '.'

describe('StatusIconMapper', () => {
  const customRender = (props = {}) => render(
    <StatusIconMapper
      status='a'
      {...props}
    />
  )

  it('renders the CheckCircleIcon when status = a', () => {
    customRender({ chance: 100 })
    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument()
  })

  it('renders the HelpIcon when status = d', () => {
    customRender({ status: 'd' })
    expect(screen.getByTestId('HelpIcon')).toBeInTheDocument()
  })

  it('renders the GavelIcon when status = s', () => {
    customRender({ status: 's' })
    expect(screen.getByTestId('GavelIcon')).toBeInTheDocument()
  })

  it('renders the FlightIcon when status = s', () => {
    customRender({ status: 'n' })
    expect(screen.getByTestId('FlightIcon')).toBeInTheDocument()
  })

  it('renders the CancelIcon when status = u', () => {
    customRender({ status: 'u' })
    expect(screen.getByTestId('CancelIcon')).toBeInTheDocument()
  })

  it('renders the LocalHospitalIcon when status = i', () => {
    customRender({ status: 'i' })
    expect(screen.getByTestId('LocalHospitalIcon')).toBeInTheDocument()
  })

  it('renders chance percentage if present', () => {
    customRender({ status: 'd', chance: 25 })
    expect(screen.queryByTestId('HelpIcon')).not.toBeInTheDocument()
    expect(screen.getByText('25%')).toBeInTheDocument()
  })

  it('renders the news and the newsAdded if both present', () => {
    timezoneMock.register('Australia/Adelaide')

    const news = 'Calf injury. 75% chance of playing'
    const newsAdded = '2021-08-29T23:00:12.36461'
    customRender({ status: 'd', news, newsAdded })

    expect(screen.getByLabelText(`${news}. News added: 29/08/21 23:00`)).toBeInTheDocument()
  })

  it('only the news if no newsAdded is present', () => {
    const news = 'Calf injury. 75% chance of playing'
    customRender({ status: 'd', news })

    expect(screen.getByLabelText(news)).toBeInTheDocument()
  })
})
