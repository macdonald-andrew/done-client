import React, { useEffect, useRef, useState } from 'react'


const useDebounce = (value, delay) => {

  const firstDebounce = useRef(true)
  const [debouncedValue, setDebouncedValue] = useState(null)

  useEffect(() => {

    if (value && firstDebounce.current) {
      setDebouncedValue(value)
      firstDebounce.current = false
      return
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)

  }, [value, delay])

  return debouncedValue
}

export default useDebounce