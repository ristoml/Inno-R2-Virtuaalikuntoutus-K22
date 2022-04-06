import { useEffect, useRef } from 'react'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'

const Playback = ({ data }) => {
  const canvasRef = useRef(null)

  const updateLandmarks = () => {

  }
  
  const renderLandmarks = () => {
    const ctx = canvasRef.current.getContext('2d')
    updateLandmarks()
  }

  const step = () => {
    if (!canvasRef.current) {
      return
    }
    renderLandmarks()
    requestAnimationFrame(step)
  }

  useEffect(() => {
    requestAnimationFrame(step)
  })

  return (
    <div>
      <canvas 
        ref={canvasRef}
      ></canvas>
    </div>
  )
}

export default Playback
