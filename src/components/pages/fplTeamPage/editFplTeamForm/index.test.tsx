import { render, screen, fireEvent } from '@testing-library/react'
import { Navigate } from 'react-router-dom'

import EditFplTeamForm, { tab, action } from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
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

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  Navigate: vi.fn()
}))

afterEach(() => {
  vi.clearAllMocks()
})

describe('EditFplTeamForm', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      fplTeam: FPL_TEAM_1,
      initializeForm: blank__,
      updateFplTeam: blank__,
      setTab: blank__,
      setAction: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <EditFplTeamForm />
      </RouteWithOutletContext>
    )
  }

  const nameInput = () => screen.getByRole('textbox', { name: /name/i })
  const submitButton = () => screen.getByRole('button', { name: /submit/i })
  const cancel = () => screen.getByText('Cancel')

  it('renders the title', () => {
    customRender()

    expect(screen.getByRole('heading')).toHaveTextContent('Edit details')
  })

  it('triggers updateFplTeam with the name', () => {
    const updateFplTeam = vi.fn()
    
    customRender({ updateFplTeam })

    fireEvent.change(nameInput(), { target: { value: name } })
    fireEvent.click(submitButton())

    expect(updateFplTeam).toHaveBeenCalledWith({ fplTeam: { name } })
  })

  it('shows errors', () => {
   const { container } = customRender({ errors })

    expect(nameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(container.querySelector('.MuiFormHelperText-root')).toHaveTextContent(errors[0].detail)
  })

  it('renders the cancel button', () => {
    customRender()

    expect(cancel()).toHaveAttribute('href', `${FPL_TEAMS_URL}/${FPL_TEAM_1.id}/details`)
  })

  it('sets the tab and the action', () => {
    const setTab = vi.fn()
    const setAction = vi.fn()

    customRender({ setTab, setAction })

    expect(setTab).toHaveBeenCalledWith(tab)
    expect(setAction).toHaveBeenCalledWith(action)
  })

  it('redirects to the details page if isOwner = false', () => {
    customRender({ fplTeam: { ...FPL_TEAM_1, isOwner: false } })
    expect(Navigate).toHaveBeenCalledWith(
      { to: `${FPL_TEAMS_URL}/${FPL_TEAM_1.id}/details` },
      {}
    )
  })
})
