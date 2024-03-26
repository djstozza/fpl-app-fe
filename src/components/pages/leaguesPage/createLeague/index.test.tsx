import { fireEvent, render, screen } from '@testing-library/react'

import ConnectedCreateLeague, { CreateLeague } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'

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
  const customRender = (props = {}) => render(
    <MockedRouter>
      <CreateLeague
        initializeForm={blank__}
        createLeague={blank__}
        errors={[]}
        {...props}
      />
    </MockedRouter>
  )

  const ConnectedRenderBase = (state = {}) => (
    <MockedRouterStore defaultState={{ leagues: { errors: undefined }, ...state }}>
      <ConnectedCreateLeague />
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) => render(ConnectedRenderBase(state))

  const header = () => screen.getByRole('heading')
  const nameInput = () => screen.getByRole('textbox', { name: 'Name' })
  const codeButton = () => screen.getByRole('button', { name: /generate code/i })
  const codeInput = () => screen.getByRole<HTMLInputElement>('textbox', { name: /code/i })
  const fplTeamNameInput = () => screen.getByRole('textbox', { name: /fpl team name/i })
  const submitButton = () => screen.getByRole('button', { name: /submit/i })
  const cancel = () => screen.getByText('Cancel')

  it('renders the title', () => {
    customRender()
    expect(header()).toHaveTextContent('Create a League')
  })

  it('triggers initialForm on load', () => {
    const initializeForm = jest.fn()

    customRender({ initializeForm })

    expect(initializeForm).toHaveBeenCalled()
  })

  it('triggers createLeague with the name, username and code', () => {
    const createLeague = jest.fn()
    customRender({ createLeague })

    fireEvent.change(nameInput(), { target: { value: name } })

    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.click(codeButton())
  
    const code = codeInput().value
    expect(code).toHaveLength(8)

    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.change(fplTeamNameInput(), { target: { value: fplTeamName } })

    fireEvent.click(submitButton())

    expect(createLeague).toHaveBeenCalledWith({ league: { name, code, fplTeamName } })
  })

  it('shows errors', () => {
    const { rerender, container } = connectedRender()

    rerender(ConnectedRenderBase({ leagues: { errors } }))

    const helperText = container.querySelectorAll('.MuiFormHelperText-root')

    expect(nameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(helperText[0]).toHaveTextContent(errors[0].detail)

    expect(fplTeamNameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(helperText[1]).toHaveTextContent(errors[1].detail)
  })

  it('renders the cancel button', () => {
    customRender()

    expect(cancel()).toHaveAttribute('href', `${PROFILE_URL}${LEAGUES_URL}`)
  })
})
