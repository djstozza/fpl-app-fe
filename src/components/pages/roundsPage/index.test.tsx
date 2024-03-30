import { act, within, render, screen } from '@testing-library/react'
import WS from 'jest-websocket-mock'
import * as rrd from 'react-router-dom'

import ConnectedRoundsPage, { RoundsPage } from '.'
import {
  ROUND_1,
  ROUND_2,
  ROUND_3
} from 'test/fixtures'
import { TITLE } from 'utilities/constants'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(), // Mock the useParams hook
}))

jest.mock('@rails/actioncable', () => ({
  createConsumer: () => ({
    subscriptions: {
      create: (_, handlers) => {
        // Save the received handler so we can call it later
        global.receivedHandler = handlers.received
      }
    }
  })
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('RoundsPage', () => {
  const connectedRender = (state = {}) => render(
    <MockedRouterStore
      defaultState={{
        round: { data: ROUND_1 },
        rounds: { data: [ROUND_1, ROUND_2, ROUND_3] },
        ...state
      }}
    >
      <ConnectedRoundsPage />
    </MockedRouterStore>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <RoundsPage
        round={ROUND_1}
        rounds={[ROUND_1, ROUND_2, ROUND_3]}
        fetchRound={blank__}
        fetchRounds={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tabList = () => screen.getByRole('tablist')
  const tab = (i) => within(tabList()).getAllByRole('tab')[i]

  describe('when roundId is present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ roundId: ROUND_1.id }))

    it('renders the tab panel, round details and sets the document title', () => {
      connectedRender()

      expect(tabList()).toHaveTextContent(`${ROUND_1.name}${ROUND_2.name}${ROUND_3.name}`)

      expect(screen.getByTestId('RoundDetails')).toBeInTheDocument()

      expect(document.title).toEqual(`${TITLE} - ${ROUND_1.name}`)

      expect(tab(0)).toHaveTextContent(ROUND_1.name)
      expect(tab(0)).toHaveAttribute('aria-selected', 'true')
    })

    it('triggers the fetchRounds function on load', () => {
      const fetchRounds = jest.fn()
      customRender({ fetchRounds })

      expect(fetchRounds).toHaveBeenCalled()
    })

    describe('when a new round is picked', () => {
      beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ roundId: ROUND_2.id }))

      it('calls fetchRound with the roundId', () => {
        const fetchRound = jest.fn()
        customRender({ fetchRound })
    
        expect(fetchRound).toHaveBeenCalledWith(ROUND_2.id)
        expect(tab(1)).toHaveTextContent(ROUND_2.name)
        expect(tab(1)).toHaveAttribute('aria-selected', 'true')
      })
    })

    describe('receiving and handling WebSocket messages',  () => {
      const server = new WS("ws://localhost:1234")
      new WebSocket("ws://localhost:1234")

      const message = 'This is a test message'

      beforeEach(async () => { await server.connected })

      afterEach(() => server.close())

      it('fetches the round again updatedAt > previous updatedAt', async () => {
        const fetchRound = jest.fn()
        customRender({ fetchRound })

        act(() => global.receivedHandler({ updatedAt: 1, message }))

        expect(fetchRound).toHaveBeenNthCalledWith(2, ROUND_1.id)
      })

      it('does not fetch the round again if updatedAt < previous updatedAt', async () => {
        const fetchRound = jest.fn()
        customRender({ fetchRound })
        

        act(() => global.receivedHandler({ updatedAt: -1, message }))

        expect(fetchRound).toHaveBeenNthCalledWith(1, ROUND_1.id)
      })
    })

    it('renders nothing if there are no rounds', () => {
      const { container } = customRender({ rounds: [] })
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when roundId is undefined', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ roundId: undefined }))
    
    it('calls fetchRound with the current round', () => {
      const fetchRound = jest.fn()
      const rounds = [
        {
          ...ROUND_1,
          current: false
        },
        {
          ...ROUND_2,
          current: true
        },
        ROUND_3
      ]

      customRender({ fetchRound, rounds })

      expect(fetchRound).toHaveBeenCalledWith(ROUND_2.id)
    })

    it('calls fetchRound with the last round if there is no current round', () => {
      const fetchRound = jest.fn()
      const rounds = [
        {
          ...ROUND_1,
          current: false
        },
        ROUND_2,
        ROUND_3
      ]

      customRender({ fetchRound, rounds })

      expect(fetchRound).toHaveBeenCalledWith(ROUND_3.id)
    })

    it('renders nothing if there are no rounds', () => {
      const { container } = customRender({ rounds: [] })
      expect(container).toBeEmptyDOMElement()
    })

    it('renders the rounds tabs without the details section if there is no round', () => {
      customRender({ round: undefined })

      expect(tabList()).toHaveTextContent(`${ROUND_1.name}${ROUND_2.name}${ROUND_3.name}`)

      expect(screen.queryByTestId('RoundDetails')).not.toBeInTheDocument()
    })
  })
})
