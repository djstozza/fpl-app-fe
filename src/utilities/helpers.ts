import { useState, useEffect, RefObject } from 'react'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

import type { QueryParam, Query } from 'types'

type HeightProps = {
  height: number
}

export const iconLoader = (iconName: string): string => (
  new URL(`../images/icons/${iconName}.png`, import.meta.url).href
)

export const teamCrestPathLoader = (shortName: string): string => (
  new URL(`../images/crests/${shortName.toLowerCase()}.png`, import.meta.url).href
)

export const playerPlaceHolderLoader = (): string => (
  new URL(`../images/player-placeholder.png`, import.meta.url).href
)

export const stadiumCrowdLoader = (): string => (
  new URL(`../images/stadium-crowd.jpeg`, import.meta.url).href
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

export const stringify = (query?: Query): string => {
  query = decamelizeKeys(query || {})

  return qs.stringify({
    ...query,
    filter: query?.filter && commaJoinValues(query.filter)
  })
}

export const playerImage = (code: number): string => (
  `https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`
)
