import { renderHook, act, cleanup } from '@testing-library/react'

import { useActionCableSubscription } from './useActionCableSubscription'

const unsubscribe = vi.fn()
const create = vi.fn((_channelParams: object, _handlers: { received: (received: object) => void }) => ({ unsubscribe }))

vi.mock('@rails/actioncable', () => ({
  createConsumer: () => ({
    subscriptions: {
      create: (channelParams, handlers) => create(channelParams, handlers)
    }
  })
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('useActionCableSubscription', () => {
  it('creates a subscription with the given channel params', () => {
    const channelParams = { channel: 'DraftPicksChannel', league_id: '1' }
    const onReceived = vi.fn()

    renderHook(() => useActionCableSubscription(channelParams, onReceived))

    expect(create).toHaveBeenCalledTimes(1)
    expect(create).toHaveBeenCalledWith(channelParams, { received: expect.any(Function) })
  })

  it('does not create a subscription when channelParams is undefined', () => {
    renderHook(() => useActionCableSubscription(undefined, vi.fn()))

    expect(create).not.toHaveBeenCalled()
  })

  it('calls onReceived with the received payload', () => {
    const channelParams = { channel: 'DraftPicksChannel', league_id: '1' }
    const onReceived = vi.fn()

    renderHook(() => useActionCableSubscription(channelParams, onReceived))

    const { received } = create.mock.calls[0][1]
    const payload = { updatedAt: 1, message: 'hello' }

    act(() => received(payload))

    expect(onReceived).toHaveBeenCalledWith(payload)
  })

  it('calls the latest onReceived without recreating the subscription when it changes', () => {
    const channelParams = { channel: 'DraftPicksChannel', league_id: '1' }
    const firstOnReceived = vi.fn()
    const secondOnReceived = vi.fn()

    const { rerender } = renderHook(
      ({ onReceived }) => useActionCableSubscription(channelParams, onReceived),
      { initialProps: { onReceived: firstOnReceived } }
    )

    rerender({ onReceived: secondOnReceived })

    expect(create).toHaveBeenCalledTimes(1)

    const { received } = create.mock.calls[0][1]
    const payload = { updatedAt: 1, message: 'hello' }

    act(() => received(payload))

    expect(firstOnReceived).not.toHaveBeenCalled()
    expect(secondOnReceived).toHaveBeenCalledWith(payload)
  })

  it('unsubscribes and resubscribes when channelParams changes', () => {
    const onReceived = vi.fn()

    const { rerender } = renderHook(
      ({ channelParams }) => useActionCableSubscription(channelParams, onReceived),
      { initialProps: { channelParams: { channel: 'DraftPicksChannel', league_id: '1' } } }
    )

    expect(create).toHaveBeenCalledTimes(1)
    expect(unsubscribe).not.toHaveBeenCalled()

    rerender({ channelParams: { channel: 'DraftPicksChannel', league_id: '2' } })

    expect(unsubscribe).toHaveBeenCalledTimes(1)
    expect(create).toHaveBeenCalledTimes(2)
    expect(create).toHaveBeenLastCalledWith(
      { channel: 'DraftPicksChannel', league_id: '2' }, { received: expect.any(Function) }
    )
  })

  it('unsubscribes on unmount', () => {
    const channelParams = { channel: 'DraftPicksChannel', league_id: '1' }

    const { unmount } = renderHook(() => useActionCableSubscription(channelParams, vi.fn()))

    unmount()

    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })

  it('does not call onReceived after unmount', () => {
    const channelParams = { channel: 'DraftPicksChannel', league_id: '1' }
    const onReceived = vi.fn()

    const { unmount } = renderHook(() => useActionCableSubscription(channelParams, onReceived))

    const { received } = create.mock.calls[0][1]

    unmount()
    received({ updatedAt: 1 })

    expect(onReceived).not.toHaveBeenCalled()
  })
})
