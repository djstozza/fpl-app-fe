import { createMount } from '@material-ui/core/test-utils'

import ConnectedCreateLeague, { CreateLeague } from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'

import {
  PROFILE_URL,
  LEAGUES_URL
} from 'utilities/constants'

const name = 'League 1'
const fplTeamName = 'Fpl Team Name 1'
const errors = [
  {
    code: 'is invalid',
    detail: 'Name has already been taken',
    source: 'name',
    title: 'Is Invalid'
  },
  {
    code: 'is invalid',
    detail: 'Fpl team name has already been taken',
    source: 'fpl_team_name',
    title: 'Is Invalid'
  }
]

describe('CreateLeague', () => {
  const render = (props = {}, state = {}) => createMount()(
    <MockedRouterStore>
      <CreateLeague
        initializeForm={blank__}
        createLeague={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) => createMount()(
    <MockedRouterStore defaultState={{ leagues: { errors: undefined }, ...state }}>
      <ConnectedCreateLeague initializeForm={blank__} />
    </MockedRouterStore>
  )

  const nameInput = wrapper => wrapper.find({ name: 'name' }).find('input')
  const codeButton = wrapper => wrapper.find({ name: 'generateCode' }).find('button')
  const codeInput = wrapper => wrapper.find({ name: 'code' }).find('input')
  const fplTeamNameInput = wrapper => wrapper.find({ name: 'fplTeamName' }).find('input')
  const submitButton = wrapper => wrapper.find({ type: 'submit' }).find('button')
  const nameHelperText = wrapper => wrapper.find({ name: 'name' }).find('WithStyles(ForwardRef(FormHelperText))')
  const fplTeamNameHelperText = wrapper => (
    wrapper.find({ name: 'fplTeamName' }).find('WithStyles(ForwardRef(FormHelperText))')
  )

  it('renders the title', () => {
    const wrapper = render()
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text()).toEqual('Create a League')
  })

  it('triggers initialForm on load', () => {
    const initializeForm = jest.fn()

    render({ initializeForm })

    expect(initializeForm).toHaveBeenCalled()
  })

  it('triggers createLeague with the name, username and code', () => {
    const createLeague = jest.fn()
    const wrapper = render({ createLeague })

    nameInput(wrapper).simulate('change', { target: { value: name } })

    expect(submitButton(wrapper).props().disabled).toEqual(true)

    codeButton(wrapper).simulate('click')

    const code = codeInput(wrapper).props().value
    expect(code.length).toEqual(8)

    expect(submitButton(wrapper).props().disabled).toEqual(true)

    fplTeamNameInput(wrapper).simulate('change', { target: { value: fplTeamName } })

    submitButton(wrapper).simulate('submit')

    expect(createLeague).toHaveBeenCalledWith({ league: { name, code, fplTeamName } })
  })

  it('shows errors', () => {
    const wrapper = connectedRender({ leagues: { errors } })

    expect(nameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(nameHelperText(wrapper).text()).toEqual(errors[0].detail)

    expect(fplTeamNameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(fplTeamNameHelperText(wrapper).text()).toEqual(errors[1].detail)
  })

  it('renders the cancel button', () => {
    const wrapper = render()
    expect(wrapper.find('ButtonLink').at(0).props().to).toEqual(`${PROFILE_URL}${LEAGUES_URL}`)
    expect(wrapper.find('ButtonLink').at(0).text()).toEqual('Cancel')
  })
})
