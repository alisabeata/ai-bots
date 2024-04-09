import { useState } from 'react'

export const useVideo = () => {
  const [isVideoActivated, setIsVideoActivated] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const activateVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log('Video access granted')
        setIsVideoActivated(true)
      })
      .catch((error) => {
        console.error('Error accessing video:', error)
        setErrorMessage(
          'Error accessing video. Please check your browser permissions.',
        )
      })
  }

  return { isVideoActivated, errorMessage, activateVideo }
}
