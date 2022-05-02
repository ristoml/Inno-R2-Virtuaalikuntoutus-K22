/* This component draws the Mediapipe landmarks on top of the webcam video feed. 
   This component also records the Landmark data for later use. */

import { useRef, useEffect } from "react"
import Webcam from "react-webcam"
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose"
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils"
import { Camera } from "@mediapipe/camera_utils"
import * as ph from "./PoseHelper"
import useSound from 'use-sound' // FIX OR REMOVE
import sound from "../../assets/sounds/squatBeep.wav" // FIX OR REMOVE

var allowedAngleDeviation = 10 // maximum allowed angle deviation in degrees before printing angle with different colour
var hipMargin = 1.05 // considered being in upright standing position
var squatMargin = 1.1 // considered being in squatted position
let maxDataSize = 1000 // maximum length of recorded data before discarding the rest
let isRunning = false
let alreadyRan = false
let squatted = false
let hipAtStart, counter, record, isLeft
let squattedText = 'Ok!'

const Canvas = ({ isLeftLeg, isStarted, getSquatData }) => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  isRunning = isStarted
  isLeft = isLeftLeg

  const [play] = useSound(sound, { // FIX OR REMOVE
    sprite: {
      true: [500, 1000],
      false: ''
    }
  });

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
      },
    });

    pose.setOptions({
      modelComplexity: 2,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    })

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video })
        },
        width: 1280,
        height: 720,
        facingMode: "environment"
      })
      camera.start()
    }
    pose.onResults(onResults)
  }, [])

  const onResults = (results) => {
    const videoWidth = webcamRef.current.video.videoWidth
    const videoHeight = webcamRef.current.video.videoHeight
    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight
    const canvasElement = canvasRef.current
    const canvasCtx = canvasElement.getContext("2d")
    canvasCtx.save()
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight)
    canvasCtx.translate(videoWidth, 0)
    canvasCtx.scale(-1, 1)
    canvasCtx.font = "40px Verdana"
    canvasCtx.fillStyle = "#bdffff"
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    switch (isLeft) {
      case true:  // left knee      
        if (results.poseLandmarks) {
          ph.updatePoseHelperLeft(results)
        }
        drawConnectors(canvasCtx, ph.getLeftLeg(), POSE_CONNECTIONS, {
          color: "#77bdff",
          lineWidth: 4,
        })
        drawLandmarks(canvasCtx, ph.getLeftLeg(), {
          color: "#bd77ff",
          lineWidth: 2,
        })
        canvasCtx.save()
        canvasCtx.translate(
          videoWidth * ph.getLeftKneeX() + 100,
          videoHeight * ph.getLeftKneeY()
        );
        canvasCtx.scale(-1, 1)
        if (
          ph.getLeftAngle() <= 0 - allowedAngleDeviation || // use warning color for angle text
          ph.getLeftAngle() >= 0 + allowedAngleDeviation
        ) {
          canvasCtx.fillStyle = "#77bdff"
        }
        canvasCtx.fillText(Math.round(ph.getLeftAngle()), 0, 0)
        canvasCtx.restore()
        break

      default: // right knee        
        if (results.poseLandmarks) {
          ph.updatePoseHelperRight(results)
        }
        drawConnectors(canvasCtx, ph.getRightLeg(), POSE_CONNECTIONS, {
          color: "#77bdff",
          lineWidth: 4,
        });
        drawLandmarks(canvasCtx, ph.getRightLeg(), {
          color: "#bd77ff",
          lineWidth: 2,
        });
        canvasCtx.save()
        canvasCtx.translate(
          videoWidth * ph.getRightKneeX() - 50,
          videoHeight * ph.getRightKneeY()
        );
        canvasCtx.scale(-1, 1)
        if (
          ph.getRightAngle() <= 0 - allowedAngleDeviation ||
          ph.getRightAngle() >= 0 + allowedAngleDeviation
        ) {
          canvasCtx.fillStyle = "#77bdff"
        }
        canvasCtx.fillText(Math.round(ph.getRightAngle()), 0, 0)
        canvasCtx.restore()
        break
    }

    // squat counter and data capture
    canvasCtx.scale(-1, 1)
    if (isRunning) {
      if (!alreadyRan) { // new recording, reset everything
        isLeft ? hipAtStart = ph.getLeftHipY() * hipMargin : hipAtStart = ph.getRightHipY() * hipMargin
        record = []
        counter = 0
        squatted = false
        alreadyRan = true
      }
      if (record.length < maxDataSize) {
        isLeft ? record.push({ leg: 'left', counter: counter, angle: ph.getLeftAngle(), data: ph.getLeftLeg() }) : record.push({ leg: 'right', counter: counter, angle: ph.getRightAngle(), data: ph.getRightLeg() })
      }

      if (
        (isLeft && ph.getLeftHipY() >= hipAtStart * squatMargin) || // check if squatted, left leg
        (!isLeft && ph.getRightHipY() >= hipAtStart * squatMargin)  // right leg
      ) {
        squatted = true
        canvasCtx.fillText(squattedText, -200, 450)
      }
      if (
        (isLeft && ph.getLeftHipY() <= hipAtStart && squatted) || // check if back standing up after a squat, left leg
        (!isLeft && ph.getRightHipY() <= hipAtStart && squatted)  // right leg
      ) {
        counter++
        squatted = false
      }
      canvasCtx.fillText(counter, -40, 40)

    }
    if (!isRunning && alreadyRan) { // recording stops      
      getSquatData(record)
      alreadyRan = false
      squatted = false
    }
    canvasCtx.restore()
  };
  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{ display: "none" }}
      />
      <div {...play({ id: squatted ? "true" : "false" })}></div> {/* FIX OR REMOVE */}
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Canvas