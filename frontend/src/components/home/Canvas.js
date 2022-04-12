import { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { useCountdown } from "./Timer";
import * as ph from "./PoseHelper";

var allowedAngleDeviation = 10; // maximum allowed angle deviation in degrees before printing angle with red text

// squat counter and recording stuff
var hipMargin = 1.05; // considered being in upright standing position
var squatMargin = 1.1; // considered being in squatted position
let timer

const Canvas = ({ isLeftLeg, isStarted, getSquatData, onClick }) => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const record = useRef(null)
  const isLeft = useRef(isLeftLeg)
  const isRunning = useRef(isStarted)  
  const alreadyRan = useRef(false)
  const squatted = useRef(false)  
  const counter = useRef(0)
  const endTime = useRef()
  const hipAtStart = useRef()

  timer = useCountdown();

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        //return `./mediapipe/pose/${file}`; possibly local
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 1280,
        height: 720,
        facingMode: "environment"
      });
      camera.start();
    }
    pose.onResults(onResults);
  }, [])

  const onResults = (results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
    canvasCtx.translate(videoWidth, 0);
    canvasCtx.scale(-1, 1);
    canvasCtx.font = "40px Verdana";
    canvasCtx.fillStyle = "#00FF00";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    switch (isLeft.current) {
      case true:  // left knee      
        if (results.poseLandmarks) {
          ph.updatePoseHelperLeft(results)
        }
        drawConnectors(canvasCtx, ph.getLeftLeg(), POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });
        drawLandmarks(canvasCtx, ph.getLeftLeg(), {
          color: "#FF0000",
          lineWidth: 2,
        });
        canvasCtx.save();
        canvasCtx.translate(
          videoWidth * ph.getLeftKneeX() + 100,
          videoHeight * ph.getLeftKneeY()
        );
        canvasCtx.scale(-1, 1);
        if (
          ph.getLeftAngle() <= 0 - allowedAngleDeviation ||
          ph.getLeftAngle() >= 0 + allowedAngleDeviation
        ) {
          canvasCtx.fillStyle = "#FF0000";
        }
        canvasCtx.fillText(Math.round(ph.getLeftAngle()), 0, 0);
        canvasCtx.restore();
        break;

      case false: // right knee        
        if (results.poseLandmarks) {
          ph.updatePoseHelperRight(results)
        }
        drawConnectors(canvasCtx, ph.getRightLeg(), POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });
        drawLandmarks(canvasCtx, ph.getRightLeg(), {
          color: "#FF0000",
          lineWidth: 2,
        });
        canvasCtx.save();
        canvasCtx.translate(
          videoWidth * ph.getRightKneeX() - 50,
          videoHeight * ph.getRightKneeY()
        );
        canvasCtx.scale(-1, 1);
        if (
          ph.getRightAngle() <= 0 - allowedAngleDeviation ||
          ph.getRightAngle() >= 0 + allowedAngleDeviation
        ) {
          canvasCtx.fillStyle = "#FF0000";
        }
        canvasCtx.fillText(Math.round(ph.getRightAngle()), 0, 0);
        canvasCtx.restore()
        break;

      default:
        console.log('no leg selected')
    }

    // squat counter and data capture
    canvasCtx.scale(-1, 1);
    if (isRunning.current) {
      if (!alreadyRan.current) {
        isLeft.current ? hipAtStart.current = ph.getLeftHipY() * hipMargin : hipAtStart.current = ph.getRightHipY() * hipMargin
        endTime.current = timer + 120; // timeout in seconds to automatically stop recording
        record.current = []
        counter.current = 0;
        alreadyRan.current = true;
      }
      isLeft.current ? record.current.push({ leg: 'left', counter: counter, angle: ph.getLeftAngle(), data: ph.getLeftLeg() }) : record.current.push({ leg: 'right', counter: counter, angle: ph.getRightAngle(), data: ph.getRightLeg() })

      if (
        (isLeft.current && ph.getLeftHipY() >= hipAtStart * squatMargin) || // check if squatted, left leg
        (!isLeft.current && ph.getRightHipY() >= hipAtStart * squatMargin)  // right leg
      ) {
        squatted.current = true;
      }
      if (
        (isLeft.current && ph.getLeftHipY() <= hipAtStart && squatted) || // check if back standing up after a squat, left leg
        (!isLeft.current && ph.getRightHipY() <= hipAtStart && squatted)  // right leg
      ) {
        counter.current++;
        squatted.current = false;
      }
      canvasCtx.fillText(counter, -40, 40);
    }
    if ((!isRunning.current && alreadyRan.current) || timer === endTime.current) { // recording stops     
      console.log(record.current);
      getSquatData(record.current);
      alreadyRan.current = false;
      squatted.current = false;
    }
    canvasCtx.restore();
  };
  return (
    <>      
      <Webcam
        ref={webcamRef}
        style={{ display: "none" }}
      />
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Canvas;
