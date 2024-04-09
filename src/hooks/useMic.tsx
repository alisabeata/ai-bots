import { useState } from 'react'

export const useMic = () => {
  const [isMicActivated, setIsMicActivated] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const activateMic = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log('Microphone access granted')
        setIsMicActivated(true)
      })
      .catch((error) => {
        console.error('Error accessing Microphone:', error)
        setErrorMessage(
          'Error accessing Microphone. Please check your browser permissions.',
        )
      })
  }

  return { isMicActivated, errorMessage, activateMic }
}
