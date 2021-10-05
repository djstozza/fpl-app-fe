import { createMount } from '@material-ui/core/test-utils'
import timezoneMock from 'timezone-mock'

import StatusIconMapper from '.'

describe('StatusIconMapper', () => {
  const render = (props = {}) => createMount()(
    <StatusIconMapper
      status='a'
      {...props}
    />
  )

  const checkCircleIcon = wrapper => wrapper.find('ForwardRef(CheckCircleIcon)')
  const helpIcon = wrapper => wrapper.find('ForwardRef(HelpIcon)')
  const gavelIcon = wrapper => wrapper.find('ForwardRef(GavelIcon)')
  const flightIcon = wrapper => wrapper.find('ForwardRef(FlightIcon)')
  const cancelIcon = wrapper => wrapper.find('ForwardRef(CancelIcon)')
  const localHospitalIcon = wrapper => wrapper.find('ForwardRef(LocalHospitalIcon)')
  const tooltip = wrapper => wrapper.find('WithStyles(ForwardRef(Tooltip))')

  it('renders the CheckCircleIcon when status = a', () => {
    const wrapper = render({ chance: 100 })
    expect(checkCircleIcon(wrapper)).toHaveLength(1)
  })

  it('renders the HelpIcon when status = d', () => {
    const wrapper = render({ status: 'd' })
    expect(helpIcon(wrapper)).toHaveLength(1)
  })

  it('renders the GavelIcon when status = s', () => {
    const wrapper = render({ status: 's' })
    expect(gavelIcon(wrapper)).toHaveLength(1)
  })

  it('renders the FlightIcon when status = s', () => {
    const wrapper = render({ status: 'n' })
    expect(flightIcon(wrapper)).toHaveLength(1)
  })

  it('renders the CancelIcon when status = u', () => {
    const wrapper = render({ status: 'u' })
    expect(cancelIcon(wrapper)).toHaveLength(1)
  })

  it('renders the LocalHospitalIcon when status = i', () => {
    const wrapper = render({ status: 'i' })
    expect(localHospitalIcon(wrapper)).toHaveLength(1)
  })

  it('renders chance percentage if present', () => {
    const wrapper = render({ status: 'd', chance: 25 })

    expect(helpIcon(wrapper)).toHaveLength(0)
    expect(wrapper.text()).toEqual('25%')
  })

  it('renders the news and the newsAdded if both present', () => {
    timezoneMock.register('Australia/Adelaide')

    const news = 'Calf injury. 75% chance of playing'
    const newsAdded = '2021-08-29T23:00:12.36461'
    const wrapper = render({ status: 'd', news, newsAdded })

    expect(tooltip(wrapper).props().title).toEqual(`${news}. News added: 29/08/21 23:00`)
  })

  it('only the news if no newsAdded is present', () => {
    const news = 'Calf injury. 75% chance of playing'
    const wrapper = render({ status: 'd', news })

    expect(tooltip(wrapper).props().title).toEqual(news)
  })
})
