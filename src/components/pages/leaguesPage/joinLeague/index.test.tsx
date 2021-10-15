import { createMount } from '@material-ui/core/test-utils'

import ConnectedJoinLeague, { JoinLeague } from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'

import {
  PROFILE_URL,
  LEAGUES_URL
} from 'utilities/constants'

const name = 'League 1'
const code = '12345678'
const fplTeamName = 'Fpl Team Name 1'
const errors = [
  {
    code: 'is invalid',
    detail: 'You have already joined this league',
    source: 'base',
    title: 'is invalid'
  },
  {
    code: 'is invalid',
    detail: 'Name does not match with any league on record',
    source: 'name',
    title: 'Is Invalid'
  },
  {
    code: 'is invalid',
    detail: 'Code is incorrect',
    source: 'code',
    title: 'Is Invalid'
  },
  {
    code: 'is invalid',
    detail: 'Fpl team name has already been taken',
    source: 'fpl_team_name',
    title: 'Is Invalid'
  }
]

describe('JoinLeague', () => {
  const render = (props = {}) => createMount()(
    <MockedRouterStore>
      <JoinLeague
        initializeForm={blank__}
        joinLeague={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) => createMount()(
    <MockedRouterStore defaultState={{ leagues: { errors: undefined }, ...state }}>
      <ConnectedJoinLeague initializeForm={blank__} />
    </MockedRouterStore>
  )

  const typography = wrapper => wrapper.find('WithStyles(ForwardRef(Typography))')
  const nameInput = wrapper => wrapper.find({ name: 'name' }).find('input')
  const codeInput = wrapper => wrapper.find({ name: 'code' }).find('input')
  const fplTeamNameInput = wrapper => wrapper.find({ name: 'fplTeamName' }).find('input')
  const submitButton = wrapper => wrapper.find({ type: 'submit' }).find('button')
  const nameHelperText = wrapper => wrapper.find({ name: 'name' }).find('WithStyles(ForwardRef(FormHelperText))')
  const codeHelperText = wrapper => (
    wrapper.find({ name: 'code' }).find('WithStyles(ForwardRef(FormHelperText))')
  )
  const fplTeamNameHelperText = wrapper => (
    wrapper.find({ name: 'fplTeamName' }).find('WithStyles(ForwardRef(FormHelperText))')
  )

  it('renders the title', () => {
    const wrapper = render()
    expect(typography(wrapper).at(0).text()).toEqual('Join a League')
  })

  it('triggers initialForm on load', () => {
    const initializeForm = jest.fn()

    render({ initializeForm })

    expect(initializeForm).toHaveBeenCalled()
  })

  it('triggers joinLeague with the name, username and code', () => {
    const joinLeague = jest.fn()
    const wrapper = render({ joinLeague })

    nameInput(wrapper).simulate('change', { target: { value: name } })

    expect(submitButton(wrapper).props().disabled).toEqual(true)

    codeInput(wrapper).simulate('change', { target: { value: code } })

    expect(submitButton(wrapper).props().disabled).toEqual(true)

    fplTeamNameInput(wrapper).simulate('change', { target: { value: fplTeamName } })

    submitButton(wrapper).simulate('submit')

    expect(joinLeague).toHaveBeenCalledWith({ league: { name, code, fplTeamName } })
  })

  it('shows errors', () => {
    const wrapper = connectedRender({ leagues: { errors } })

    expect(typography(wrapper).at(1).props().color).toEqual('error')
    expect(typography(wrapper).at(1).text()).toEqual(errors[0].detail)

    expect(nameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(nameHelperText(wrapper).text()).toEqual(errors[1].detail)

    expect(codeInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(codeHelperText(wrapper).text()).toEqual(errors[2].detail)

    expect(fplTeamNameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(fplTeamNameHelperText(wrapper).text()).toEqual(errors[3].detail)
  })

  it('renders the cancel button', () => {
    const wrapper = render()
    expect(wrapper.find('ButtonLink').at(0).props().to).toEqual(`${PROFILE_URL}${LEAGUES_URL}`)
    expect(wrapper.find('ButtonLink').at(0).text()).toEqual('Cancel')
  })
})
