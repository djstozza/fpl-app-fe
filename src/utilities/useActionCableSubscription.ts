import { useEffect, useRef } from 'react'

import { cable } from 'utilities/constants'

type ChannelParams = {
  channel: string,
  [key: string]: string | undefined
}

type Received = {
  updatedAt: number,
  message?: string
}

// Subscribes to an ActionCable channel and keeps it subscribed for the
// lifetime of channelParams (identified by its serialized value), always
// calling the latest onReceived without needing to resubscribe when
// onReceived itself changes identity. Pass undefined to skip subscribing
// (e.g. while a required id hasn't loaded yet).
export const useActionCableSubscription = (
  channelParams: ChannelParams | undefined,
  onReceived: (received: Received) => void
) => {
  const onReceivedRef = useRef(onReceived)

  useEffect(() => {
    onReceivedRef.current = onReceived
  }, [onReceived])

  useEffect(() => {
    if (!channelParams) return

    let isActive = true

    const subscription = cable.subscriptions.create(
      channelParams,
      { received: received => { if (isActive) onReceivedRef.current(received) } }
    )

    return () => {
      isActive = false
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(channelParams)])
}
