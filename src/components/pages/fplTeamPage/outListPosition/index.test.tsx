import { fireEvent, render, screen } from '@testing-library/react'

import OutListPosition from '.'
import history from 'state/history'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIST_POSITION_1 } from 'test/fixtures'

const pathname = 'www.example.com'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useLocation: () => ({ pathname, search: '' })
}))

describe('OutListPosition', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <OutListPosition
        outListPosition={LIST_POSITION_1}
        setOutListPosition={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const outListPosition = () => screen.queryByTestId('OutListPosition')
  const { player: { firstName, lastName }, position: { singularNameShort } } = LIST_POSITION_1

  it('shows the player name and position', () => {
    customRender()
  
    expect(outListPosition()).toHaveTextContent(`Out: ${firstName} ${lastName}(${singularNameShort})`)
  })

  it('clears the outListPosition when cancelled', () => {
    const historyReplaceSpy = vi.spyOn(history, 'replace')
    const setOutListPosition = vi.fn()
    customRender({ setOutListPosition })

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))

    expect(setOutListPosition).toHaveBeenCalledWith(undefined)
    expect(historyReplaceSpy).toHaveBeenCalledWith(pathname)
  })

  it('renders nothing if outListPosition is undefined', () => {
    customRender({ outListPosition: undefined })

    expect(outListPosition()).not.toBeInTheDocument()
  })
})
