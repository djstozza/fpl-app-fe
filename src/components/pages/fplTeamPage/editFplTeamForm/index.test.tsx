import { createMount } from '@material-ui/core/test-utils'

import EditFplTeamForm from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'
import { FPL_TEAM_1 } from 'test/fixtures'

import { FPL_TEAMS_URL } from 'utilities/constants'

const name = 'New FplTeam Name'


const errors = [
  {
    code: 'is invalid',
    detail: 'Name has already been taken',
    source: 'name',
    title: 'Is Invalid'
  }
]

describe('EditFplTeamForm', () => {
  const render = (props = {}) => createMount()(
    <MockedRouterStore>
      <EditFplTeamForm
        fplTeam={FPL_TEAM_1}
        initializeForm={blank__}
        updateFplTeam={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const nameInput = wrapper => wrapper.find({ name: 'name' }).find('input')
  const submitButton = wrapper => wrapper.find({ type: 'submit' }).find('button')
  const nameHelperText = wrapper => wrapper.find({ name: 'name' }).find('WithStyles(ForwardRef(FormHelperText))')

  it('renders the title', () => {
    const wrapper = render()
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text()).toEqual('Edit details')
  })

  it('triggers updateFplTeam with the name', () => {
    const updateFplTeam = jest.fn()
    const wrapper = render({ updateFplTeam })

    nameInput(wrapper).simulate('change', { target: { value: name } })

    submitButton(wrapper).simulate('submit')

    expect(updateFplTeam).toHaveBeenCalledWith({ fplTeam: { name } })
  })

  it('shows errors', () => {
    const wrapper = render({ errors })

    expect(nameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(nameHelperText(wrapper).text()).toEqual(errors[0].detail)
  })

  it('renders the cancel button', () => {
    const wrapper = render()
    expect(wrapper.find('ButtonLink').at(0).props().to).toEqual(`${FPL_TEAMS_URL}/${FPL_TEAM_1.id}/details`)
    expect(wrapper.find('ButtonLink').at(0).text()).toEqual('Cancel')
  })

  it('redirects to the details page if isOwner = false', () => {
    const wrapper = render({ fplTeam: { ...FPL_TEAM_1, isOwner: false } })
    expect(wrapper.find('Redirect').props().to).toEqual(`${FPL_TEAMS_URL}/${FPL_TEAM_1.id}/details`)
  })
})
