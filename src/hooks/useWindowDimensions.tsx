import { useEffect, useState } from 'react'

interface WindowDimension {
  innerWidth: number
  innerHeight: number
}

const getDimensions = () => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth
})

const useWindowDimensions = (): WindowDimension => {
  const [dimensions, setDimensions] = useState(getDimensions())

  useEffect(() => {
    const resize = () => {
      setDimensions(getDimensions())
    }

    console.log('ressss')

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return dimensions
}

export default useWindowDimensions
