import { useState, useEffect } from 'react'

export const iconLoader = (iconName: string) => (
  require(`../images/icons/${iconName}.png`).default
)

export const teamCrestPathLoader = (shortName: string) => (
  require(`../images/crests/${shortName.toLowerCase()}.png`).default
)

export const GetElHeight = (myRef) => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {

      setHeight(window.innerHeight - myRef.current.offsetTop)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [myRef])

  return { height }
}
