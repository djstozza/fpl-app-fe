import { useState, useEffect, RefObject } from 'react'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

import type { QueryParam, Query } from 'types'

type HeightProps = {
  height: number
}

export const iconLoader = (iconName: string): string => (
  require(`../images/icons/${iconName}.png`).default
)

export const teamCrestPathLoader = (shortName: string): string => (
  require(`../images/crests/${shortName.toLowerCase()}.png`).default
)

export const playerPlaceHolderLoader = (): string => (
  require(`../images/player-placeholder.png`).default
)

export const stadiumCrowdLoader = (): string => (
  require(`../images/stadium-crowd.jpeg`).default
)

export const SetElHeight = (ref: RefObject<HTMLDivElement | null>): HeightProps => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref === null || ref.current === null) return
    const handleResize = () => {
      setHeight(window.innerHeight - (ref?.current?.offsetTop || 0))
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [ref])

  return { height }
}

export const GetElHeight = (ref: RefObject<HTMLDivElement | null>): HeightProps => {
  const [height, setHeight] = useState(0)

  useEffect(
    () => {
      if (!ref || !ref.current) return
      setHeight(ref?.current?.clientHeight)
    }, [ref]
  )

  return { height }
}

const commaJoinValues = (object: QueryParam) => {
  const result = {}
  Object.keys(object).forEach(key => {
    const value = object[key]
    result[key] = Array.isArray(value) ? value.join(',') : value
  })

  return result
}

export const stringify = (query: Query): string => {
  query = decamelizeKeys(query || {})

  return qs.stringify({
    ...query,
    filter: query.filter && commaJoinValues(query.filter)
  })
}

export const playerImage = (code: number): string => (
  `https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`
)
