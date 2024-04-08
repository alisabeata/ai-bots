import React, { useEffect, useState } from 'react'
import { Loading } from 'src/components/Loading'

interface TypeMessageProps {
  strings: string[]
  delay: number
}

export const TypeMessage: React.FC<TypeMessageProps> = ({ strings, delay }) => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < strings.length) {
        setText((prevText) => `${prevText} ${strings[index]}`)
        setIndex((prevIndex) => prevIndex + 1)
      } else {
        clearInterval(intervalId)
      }
    }, delay)

    return () => clearInterval(intervalId)
  }, [strings, delay, index])

  return (
    <div>
      {text ? (
        text
      ) : (
        <Loading style={{ right: 'auto', left: '4.5rem', top: '1rem' }} />
      )}
    </div>
  )
}
