import { createMount } from '@material-ui/core/test-utils'

import EditLeagueForm from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'
import { LIVE_LEAGUE } from 'test/fixtures'
import { LEAGUES_URL } from 'utilities/constants'

const name = 'New League Name'

const errors = [
  {
    code: 'is invalid',
    detail: 'Name has already been taken',
    source: 'name',
    title: 'Is Invalid'
  }
]

describe('EditLeagueForm', () => {
  const render = (props = {}) => createMount()(
    <MockedRouterStore>
      <EditLeagueForm
        league={LIVE_LEAGUE}
        initializeForm={blank__}
        updateLeague={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const nameInput = wrapper => wrapper.find({ name: 'name' }).find('input')
  const codeButton = wrapper => wrapper.find({ name: 'generateCode' }).find('button')
  const codeInput = wrapper => wrapper.find({ name: 'code' }).find('input')
  const fplTeamNameInput = wrapper => wrapper.find({ name: 'fplTeamName' }).find('input')
  const submitButton = wrapper => wrapper.find({ type: 'submit' }).find('button')
  const nameHelperText = wrapper => wrapper.find({ name: 'name' }).find('WithStyles(ForwardRef(FormHelperText))')

  it('renders the title', () => {
    const wrapper = render()
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text()).toEqual('Edit details')
  })

  it('triggers initialForm on load', () => {
    const initializeForm = jest.fn()

    render({ initializeForm })

    expect(initializeForm).toHaveBeenCalled()
  })

  it('triggers updateLeague with the name, username and code', () => {
    const updateLeague = jest.fn()
    const wrapper = render({ updateLeague })

    nameInput(wrapper).simulate('change', { target: { value: name } })

    expect(submitButton(wrapper).props().disabled).toEqual(true)

    codeButton(wrapper).simulate('click')

    const code = codeInput(wrapper).props().value
    expect(code.length).toEqual(8)

    expect(fplTeamNameInput(wrapper)).toHaveLength(0)

    submitButton(wrapper).simulate('submit')

    expect(updateLeague).toHaveBeenCalledWith({ league: { name, code } })
  })

  it('shows errors', () => {
    const wrapper = render({ errors })

    expect(nameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(nameHelperText(wrapper).text()).toEqual(errors[0].detail)
  })

  it('renders the cancel button', () => {
    const wrapper = render()
    expect(wrapper.find('ButtonLink').at(0).props().to).toEqual(`${LEAGUES_URL}/${LIVE_LEAGUE.id}/details`)
    expect(wrapper.find('ButtonLink').at(0).text()).toEqual('Cancel')
  })

  it('redirects to the details page if isOwner = false', () => {
    const wrapper = render({ league: { ...LIVE_LEAGUE, isOwner: false } })
    expect(wrapper.find('Redirect').props().to).toEqual(`${LEAGUES_URL}/${LIVE_LEAGUE.id}/details`)
  })
})
