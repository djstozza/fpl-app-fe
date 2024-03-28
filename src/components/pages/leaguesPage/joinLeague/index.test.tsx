import { fireEvent, render, screen } from '@testing-library/react'

import ConnectedJoinLeague, { JoinLeague } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'

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
  const customRender = (props = {}) => render(
    <MockedRouter>
      <JoinLeague
        initializeForm={blank__}
        joinLeague={blank__}
        errors={[]}
        {...props}
      />
    </MockedRouter>
  )

  const ConnectedRenderBase = (state = {}) => (
    <MockedRouterStore defaultState={{ leagues: { errors: undefined }, ...state }}>
      <ConnectedJoinLeague />
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) => render(ConnectedRenderBase(state))

  const header = () => screen.getByRole('heading')
  const nameInput = () => screen.getByRole<HTMLInputElement>('textbox', { name: 'Name' })
  const codeInput = () => screen.getByRole<HTMLInputElement>('textbox', { name: /code/i })
  const fplTeamNameInput = () => screen.getByRole<HTMLInputElement>('textbox', { name: /fpl team name/i })
  const submitButton = () => screen.getByRole('button', { name: /submit/i })
  const cancel = () => screen.getByText('Cancel')

  it('renders the title', () => {
    customRender()
    expect(header()).toHaveTextContent('Join a League')
  })

  it('triggers initialForm on load', () => {
    const initializeForm = jest.fn()

    customRender({ initializeForm })

    expect(initializeForm).toHaveBeenCalled()
  })

  it('triggers joinLeague with the name, username and code', () => {
    const joinLeague = jest.fn()
    customRender({ joinLeague })

    fireEvent.change(nameInput(), { target: { value: name } })

    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.change(codeInput(), { target: { value: code} })

    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.change(fplTeamNameInput(), { target: { value: fplTeamName } })

    fireEvent.click(submitButton())

    expect(joinLeague).toHaveBeenCalledWith({ league: { name, code, fplTeamName } })
  })

  it('shows errors', () => {
    const { rerender, container } = connectedRender()

    rerender(ConnectedRenderBase({ leagues: { errors } }))

    expect(screen.getByTestId('league-form-base-errors')).toHaveTextContent(errors[0].detail)
    
    const helperText = container.querySelectorAll('.MuiFormHelperText-root')

    expect(nameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(helperText[0]).toHaveTextContent(errors[1].detail)

    expect(codeInput()).toHaveAttribute('aria-invalid', 'true')
    expect(helperText[1]).toHaveTextContent(errors[2].detail)

    expect(fplTeamNameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(helperText[2]).toHaveTextContent(errors[3].detail)
  })

  it('renders the cancel button', () => {
    customRender()

    expect(cancel()).toHaveAttribute('href', `${PROFILE_URL}${LEAGUES_URL}`)
  })
})
