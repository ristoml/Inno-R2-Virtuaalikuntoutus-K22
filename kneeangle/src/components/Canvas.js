import { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { useCountdown } from "./Timer";
import { updatePoseHelperLeft, getLeftLeg, getLeftKneeX, getLeftKneeY, getLeftHipY, getLeftAngle, updatePoseHelperRight, getRightLeg, getRightKneeX, getRightKneeY, getRightHipY, getRightAngle } from "./PoseHelper";

let isLeft, isRunning;
let record = [];
var allowedAngleDeviation = 10; // maximum allowed angle deviation in degrees before printing angle with red text

// squat counter and recording stuff
var hipMargin = 1.05; // considered being in upright standing position
var squatMargin = 1.1; // considered being in squatted position
var hipAtStart, counter;
let alreadyRan = false;
let squatted = false;
let timer, endTime;

const Canvas = ({ isLeftLeg, isStarted, getSquatData }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  isLeft = isLeftLeg;
  isRunning = isStarted;
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

    switch (isLeft) {
      case true:  // left knee      
        if (results.poseLandmarks) {
          updatePoseHelperLeft(results)
        }
        drawConnectors(canvasCtx, getLeftLeg(), POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });
        drawLandmarks(canvasCtx, getLeftLeg(), {
          color: "#FF0000",
          lineWidth: 2,
        });
        canvasCtx.save();
        canvasCtx.translate(
          videoWidth * getLeftKneeX() + 100,
          videoHeight * getLeftKneeY()
        );
        canvasCtx.scale(-1, 1);
        if (
          getLeftAngle() <= 0 - allowedAngleDeviation ||
          getLeftAngle() >= 0 + allowedAngleDeviation
        ) {
          canvasCtx.fillStyle = "#FF0000";
        }
        canvasCtx.fillText(Math.round(getLeftAngle()), 0, 0);
        canvasCtx.restore();
        break;

      case false: // right knee        
        if (results.poseLandmarks) {
          updatePoseHelperRight(results)
        }
        drawConnectors(canvasCtx, getRightLeg(), POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });
        drawLandmarks(canvasCtx, getRightLeg(), {
          color: "#FF0000",
          lineWidth: 2,
        });
        canvasCtx.save();
        canvasCtx.translate(
          videoWidth * getRightKneeX() - 50,
          videoHeight * getRightKneeY()
        );
        canvasCtx.scale(-1, 1);
        if (
          getRightAngle() <= 0 - allowedAngleDeviation ||
          getRightAngle() >= 0 + allowedAngleDeviation
        ) {
          canvasCtx.fillStyle = "#FF0000";
        }
        canvasCtx.fillText(Math.round(getRightAngle()), 0, 0);
        canvasCtx.restore()
        break;

      default:
        console.log('no leg selected')
    }

    // squat counter and data capture
    canvasCtx.scale(-1, 1);
    if (isRunning) {
      if (!alreadyRan) {
        isLeft ? hipAtStart = getLeftHipY() * hipMargin : hipAtStart = getRightHipY() * hipMargin
        endTime = timer + 120; // timeout in seconds to automatically stop recording
        record = [];
        alreadyRan = true;
        counter = 0;
      }
      isLeft ? record.push({ leg: 'left', counter: counter, angle: getLeftAngle(), data: getLeftLeg() }) : record.push({ leg: 'right', counter: counter, angle: getRightAngle(), data: getRightLeg() })

      if (
        (isLeft && getLeftHipY() >= hipAtStart * squatMargin) ||
        (!isLeft && getRightHipY() >= hipAtStart * squatMargin)
      ) {
        squatted = true;
      }
      if (
        (isLeft && getLeftHipY() <= hipAtStart && squatted) ||
        (!isLeft && getRightHipY() <= hipAtStart && squatted)
      ) {
        counter++;
        squatted = false;
      }
      canvasCtx.fillText(counter, -40, 40);
    }
    if ((!isRunning && alreadyRan) || timer === endTime) { //recording stops     
      console.log(record);
      getSquatData(record);
      alreadyRan = false;
      squatted = false;
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
