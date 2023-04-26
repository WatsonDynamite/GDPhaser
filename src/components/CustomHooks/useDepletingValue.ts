import { useState, useEffect } from 'react'

function useDepletingValue(initialValue, depletionRate) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    let interval: NodeJS.Timer | null = null

    const updateValue = async () => {
      await new Promise<void>((resolve) => {
        interval = setInterval(() => {
          setValue((prevValue) => {
            const newValue = prevValue - depletionRate

            if (newValue <= 0) {
              clearInterval(interval!)
              resolve()
              return 0
            }

            return newValue
          })
        }, 1000)
      })
    }

    updateValue()

    return () => clearInterval(interval!)
  }, [depletionRate])

  return value
}
