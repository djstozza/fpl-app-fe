import { fireEvent, render, screen } from '@testing-library/react'
import { Navigate } from 'react-router-dom'

import EditLeagueForm from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn()
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('EditLeagueForm', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      league: LIVE_LEAGUE,
      initializeForm: blank__,
      updateLeague: blank__,
      setTab: blank__,
      setAction: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <EditLeagueForm />
      </RouteWithOutletContext>
    )
  }

  const nameInput = () => screen.getByRole('textbox', { name: /name/i })
  const submitButton = () => screen.getByRole('button', { name: /submit/i })
  const codeButton = () => screen.getByRole('button', { name: /generate code/i })
  const codeInput = () => screen.getByRole<HTMLInputElement>('textbox', { name: /code/i })
  const fplTeamNameInput = () => screen.queryByRole('textbox', { name: /fpl team name/i })

  const cancel = () => screen.getByText('Cancel')

  it('renders the title', () => {
    customRender()

    expect(screen.getByRole('heading')).toHaveTextContent('Edit details')
  })

  it('sets the tab and action', () => {
    const setTab = jest.fn()
    const setAction = jest.fn()

    customRender({ setTab, setAction })

    expect(setTab).toHaveBeenCalledWith('details')
    expect(setAction).toHaveBeenCalledWith('edit')
  })

  it('triggers initialForm on load', () => {
    const initializeForm = jest.fn()

    customRender({ initializeForm })

    expect(initializeForm).toHaveBeenCalled()
  })

  it('triggers updateLeague with the name and code', () => {
    const updateLeague = jest.fn()
    customRender({ updateLeague })

    expect(submitButton()).toHaveAttribute('disabled')

    fireEvent.change(nameInput(), { target: { value: name } })

    fireEvent.click(codeButton())
  
    const code = codeInput().value
    expect(code).toHaveLength(8)
    expect(code).not.toEqual(LIVE_LEAGUE.code)

    expect(submitButton()).not.toHaveAttribute('disabled')

    expect(fplTeamNameInput()).not.toBeInTheDocument()
  
    fireEvent.click(submitButton())
    expect(updateLeague).toHaveBeenCalledWith({ league: { name, code } })
  })

  it('shows errors', () => {
    const { container } = customRender({ errors })

    expect(nameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(container.querySelector('.MuiFormHelperText-root')).toHaveTextContent(errors[0].detail)
  })

  it('renders the cancel button', () => {
    customRender()

    expect(cancel()).toHaveAttribute('href', `${LEAGUES_URL}/${LIVE_LEAGUE.id}/details`)
  })

  it('redirects to the details page if isOwner = false', () => {
    customRender({ league: { ...LIVE_LEAGUE, isOwner: false } })
    expect(Navigate).toHaveBeenCalledWith(
      { to: `${LEAGUES_URL}/${LIVE_LEAGUE.id}/details` },
      {}
    )
  })
})
