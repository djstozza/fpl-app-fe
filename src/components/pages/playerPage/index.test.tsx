import { render, screen } from '@testing-library/react'
import * as rrd from 'react-router-dom'

import ConnectedPlayerPage, { PlayerPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE } from 'utilities/constants'
import { PLAYER_SUMMARIES } from 'test/fixtures'
import { initialState } from 'state/players/reducer'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(), // Mock the useParams hook
}))

afterEach(() => {
  jest.clearAllMocks()
})


const player = {
  ...PLAYER_SUMMARIES[0],
  code: 1234,
  photo: '1234.jpg',
  hasHistory: true,
  hasHistoryPast: true,
  historyPast: [],
  history: []
}

describe('PlayerPage', () => {
  const connectedRender = (state = {}) => render(
    <MockedRouterStore
      defaultState={{
        player: { ...initialState, data: player },
        ...state
      }}
    >
      <ConnectedPlayerPage />
    </MockedRouterStore>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <PlayerPage
        player={{ ...initialState, data: player, history: [], historyPast: [] }}
        fetchPlayer={blank__}
        fetchPlayerHistory={blank__}
        fetchPlayerHistoryPast={blank__}
        updatePlayerHistorySort={blank__}
        updatePlayerHistoryPastSort={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tabs = () => screen.getAllByRole('tab')
  const heading = () => screen.getByRole('heading')

  describe('when playerId is present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ playerId: player.id }))

    it('renders the player details by default and sets the document title', () => {
      connectedRender()

      expect(tabs()).toHaveLength(3)
      expect(tabs()[0]).toHaveAttribute('aria-selected', 'true')
      
     
      expect(heading()).toHaveTextContent(`${player.firstName} ${player.lastName}(${player.team.shortName})`)
      expect(document.title)
        .toEqual(`${TITLE} - ${player.firstName} ${player.lastName} - Details`)
    })

    it('only renders active tabs', () => {
      const wrapper = connectedRender({ player: { data: { ...player, hasHistory: false, hasHistoryPast: false } } })

      expect(tabs()).toHaveLength(1)
      expect(tabs()[0]).toHaveTextContent('Details')
    })

    it('triggers the fetchPlayer function on load', () => {
      const fetchPlayer = jest.fn()
      customRender({ fetchPlayer })

      expect(fetchPlayer).toHaveBeenCalledWith(PLAYER_SUMMARIES[0].id)
    })

    it('renders nothing if data is not defined', () => {
      const { container } = connectedRender({ player: { data: undefined } })
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when playerId is not peresent', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ playerId: undefined }))

    it('renders nothing if data is not defined', () => {
      const { container } = connectedRender()
      expect(container).toBeEmptyDOMElement()
    })
  })
})
