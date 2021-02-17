import { useEffect, useState } from 'react'

interface WindowDimension {
  innerWidth: number
  innerHeight: number
}

const debounce = (action: any, timeout: any) => {
  let timer: any = null

  return () => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      action()
    }, timeout)
  }
}

const getDimensions = () => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
})

const useWindowDimensions = (): WindowDimension => {
  const [dimensions, setDimensions] = useState(getDimensions())

  useEffect(() => {
    const debounceResize = debounce(() => {
      setDimensions(getDimensions())
    }, 1000)

    window.addEventListener('resize', debounceResize)

    return () => window.removeEventListener('resize', debounceResize)
  })

  return dimensions
}

export default useWindowDimensions
