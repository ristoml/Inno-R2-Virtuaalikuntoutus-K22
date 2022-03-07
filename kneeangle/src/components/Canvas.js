import { useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { Camera } from '@mediapipe/camera_utils'

const Canvas = ({ isLeftLeg }) => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  let leftLeg, rightLeg
  let leftX1, leftY1, leftX2, leftY2, leftX3, leftY3, leftAngle
  let rightX1, rightY1, rightX2, rightY2, rightX3, rightY3, rightAngle
  var allowedAngleVariation = 10 // maximum allowed variation from 180 degrees before printing angle with red text

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
      }
    })

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })

    pose.onResults(onResults)

    if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video })
        },
        width: 1280,
        height: 720,
      })
      camera.start()
    }
  })

  const onResults = (results) => {
    const videoWidth = webcamRef.current.video.videoWidth
    const videoHeight = webcamRef.current.video.videoHeight
    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight
    const canvasElement = canvasRef.current
    const canvasCtx = canvasElement.getContext('2d')
    canvasCtx.save()
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight)
    canvasCtx.translate(videoWidth, 0)
    canvasCtx.scale(-1, 1)
    canvasCtx.font = '40px Verdana'
    canvasCtx.fillStyle = '#00FF00'
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    )

    // left knee
    if (isLeftLeg) {
      if (results.poseLandmarks) {
        leftLeg = [
          results.poseLandmarks[23],
          results.poseLandmarks[25],
          results.poseLandmarks[27],
        ]
        // coordinates for kneeangle calculation
        leftX1 = results.poseLandmarks[23].x
        leftY1 = results.poseLandmarks[23].y
        leftX2 = results.poseLandmarks[25].x
        leftY2 = results.poseLandmarks[25].y
        leftX3 = results.poseLandmarks[27].x
        leftY3 = results.poseLandmarks[27].y
        // calculate kneeangle
        leftAngle = Math.atan2(leftY3 - leftY2, leftX3 - leftX2) - Math.atan2(leftY1 - leftY2, leftX1 - leftX2)
        leftAngle = leftAngle * (180 / Math.PI)
      }
      drawConnectors(canvasCtx, leftLeg, POSE_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 4
      })
      drawLandmarks(canvasCtx, leftLeg, {
        color: '#FF0000',
        lineWidth: 2
      })
      canvasCtx.save()
      canvasCtx.translate(videoWidth * leftX2 + 120, videoHeight * leftY2)
      canvasCtx.scale(-1, 1)
      if (leftAngle <= 180 - allowedAngleVariation || leftAngle >= 180 + allowedAngleVariation) {
        canvasCtx.fillStyle = 'FF0000'
      }
      canvasCtx.fillText(Math.round(leftAngle), 0, 0)
      canvasCtx.restore()

    } else { // right knee
      if (results.poseLandmarks) {
        rightLeg = [
          results.poseLandmarks[24],
          results.poseLandmarks[26],
          results.poseLandmarks[28]
        ]

        rightX1 = results.poseLandmarks[24].x
        rightY1 = results.poseLandmarks[24].y
        rightX2 = results.poseLandmarks[26].x
        rightY2 = results.poseLandmarks[26].y
        rightX3 = results.poseLandmarks[28].x
        rightY3 = results.poseLandmarks[28].y

        rightAngle = Math.atan2(rightY3 - rightY2, rightX3 - rightX2) - Math.atan2(rightY1 - rightY2, rightX1 - rightX2)
        rightAngle = rightAngle * (180 / Math.PI)
      }
      drawConnectors(canvasCtx, rightLeg, POSE_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 4
      })
      drawLandmarks(canvasCtx, rightLeg, {
        color: '#FF0000',
        lineWidth: 2
      })
      canvasCtx.save()
      canvasCtx.translate(videoWidth * rightX2 - 50, videoHeight * rightY2)
      canvasCtx.scale(-1, 1)
      if (rightAngle <= 180 - allowedAngleVariation || rightAngle >= 180 + allowedAngleVariation) {
        canvasCtx.fillStyle = 'red'
      }
      canvasCtx.fillText(Math.round(rightAngle), 0, 0)
      // canvasCtx.restore()
    }  
  canvasCtx.restore()
  }
  return (
    <div className="Canvas">
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          left: '0',
          right: '0',
          display: 'none'
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          left: '0',
          right: '0',
          zIndex: 1,
        }}
      ></canvas>
    </div>
  )
}

export default Canvas
