import { useState, useEffect } from 'react'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

export const iconLoader = (iconName: string) => (
  require(`../images/icons/${iconName}.png`).default
)

export const teamCrestPathLoader = (shortName: string) => (
  require(`../images/crests/${shortName.toLowerCase()}.png`).default
)

export const SetElHeight = (ref) => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - ref.current.offsetTop )
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [ref])

  return { height }
}

export const GetElHeight = (ref) => {
  const [height, setHeight] = useState(0)

  useEffect(
    () => {
      setHeight(ref.current.clientHeight)
    }, [ref]
  )

  return { height }
}

const commaJoinValues = (object: Object) => {
  const result = {}
  Object.keys(object).forEach(key => {
    const value = object[key]
    result[key] = Array.isArray(value) ? value.join(',') : value
  })
  return result
}

export const stringify = (query) => {
  query = decamelizeKeys(query || {})
  return qs.stringify({
    ...query,
    filter: query.filter && commaJoinValues(query.filter)
  })
}
