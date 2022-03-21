import { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { useCountdown } from "./Timer";

let isLeft, isRunning;
let record = [];
let leftLeg, rightLeg;
let leftHipX,
  leftHipY,
  leftKneeX,
  leftKneeY,
  leftAnkleX,
  leftaAnkleY,
  leftAngle;
let rightHipX,
  rightHipY,
  rightKneeX,
  rightKneeY,
  rightAnkleX,
  rightAnkleY,
  rightAngle;
var allowedAngleVariation = 10; // maximum allowed variation before printing angle with red text

// squat counter and recording stuff
var hipMargin = 1.05; // considered being in upright standing position
var squatMargin = 1.2; // considered being in squatted position
var hipAtStart, counter;
let ran = false;
let squatted = false;
let timer;
let endTime;

const Canvas = ({ isLeftLeg, isStarted, getSquatData }) => {
  isLeft = isLeftLeg;
  isRunning = isStarted;
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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

    // left knee
    if (isLeft) {
      if (results.poseLandmarks) {
        leftLeg = [
          results.poseLandmarks[24],
          results.poseLandmarks[23],
          results.poseLandmarks[25],
          results.poseLandmarks[27],
        ];
        // coordinates for kneeangle calculation
        leftHipX = results.poseLandmarks[23].x;
        leftHipY = results.poseLandmarks[23].y;
        leftKneeX = results.poseLandmarks[25].x;
        leftKneeY = results.poseLandmarks[25].y;
        leftAnkleX = results.poseLandmarks[27].x;
        leftaAnkleY = results.poseLandmarks[27].y;
        // calculate kneeangle
        leftAngle =
          Math.atan2(leftaAnkleY - leftKneeY, leftAnkleX - leftKneeX) -
          Math.atan2(leftHipY - leftKneeY, leftHipX - leftKneeX);
        leftAngle = leftAngle * (180 / Math.PI);
      }
      drawConnectors(canvasCtx, leftLeg, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, leftLeg, {
        color: "#FF0000",
        lineWidth: 2,
      });
      canvasCtx.save();
      canvasCtx.translate(
        videoWidth * leftKneeX + 100,
        videoHeight * leftKneeY
      );
      canvasCtx.scale(-1, 1);
      if (
        leftAngle <= 180 - allowedAngleVariation ||
        leftAngle >= 180 + allowedAngleVariation
      ) {
        canvasCtx.fillStyle = "FF0000";
      }
      canvasCtx.fillText(180 - Math.round(leftAngle), 0, 0);
      canvasCtx.restore();

    } else {
      // right knee
      if (results.poseLandmarks) {
        rightLeg = [
          results.poseLandmarks[23],
          results.poseLandmarks[24],
          results.poseLandmarks[26],
          results.poseLandmarks[28],
        ];

        rightHipX = results.poseLandmarks[24].x;
        rightHipY = results.poseLandmarks[24].y;
        rightKneeX = results.poseLandmarks[26].x;
        rightKneeY = results.poseLandmarks[26].y;
        rightAnkleX = results.poseLandmarks[28].x;
        rightAnkleY = results.poseLandmarks[28].y;

        rightAngle =
          Math.atan2(rightAnkleY - rightKneeY, rightAnkleX - rightKneeX) -
          Math.atan2(rightHipY - rightKneeY, rightHipX - rightKneeX);
        rightAngle = rightAngle * (180 / Math.PI);
      }
      drawConnectors(canvasCtx, rightLeg, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, rightLeg, {
        color: "#FF0000",
        lineWidth: 2,
      });
      canvasCtx.save();
      canvasCtx.translate(
        videoWidth * rightKneeX - 50,
        videoHeight * rightKneeY
      );
      canvasCtx.scale(-1, 1);
      if (
        rightAngle <= 180 - allowedAngleVariation ||
        rightAngle >= 180 + allowedAngleVariation
      ) {
        canvasCtx.fillStyle = "red";
      }
      canvasCtx.fillText(180 - Math.round(rightAngle), 0, 0);
      canvasCtx.restore()
    }   

    // squat counter and data capture
    canvasCtx.scale(-1, 1);
    if (isRunning) {
      if (!ran) {
        if (isLeft) {
          hipAtStart = leftHipY * hipMargin;
        } else {
          hipAtStart = rightHipY * hipMargin;
        }
        endTime = timer + 120; //end time
        record = [];
        ran = true;
        counter = 0;
      }
      if (isLeft) {
        record.push({ leg: 'left', counter: counter, angle: leftAngle, data: leftLeg });
      } else {
        record.push({ leg: 'right',counter: counter, angle: rightAngle, data: rightLeg });
      }
      if (
        (isLeft && leftHipY >= hipAtStart * squatMargin) ||
        (!isLeft && rightHipY >= hipAtStart * squatMargin)
      ) {
        squatted = true;
      }
      if (
        (isLeft && leftHipY <= hipAtStart && squatted) ||
        (!isLeft && rightHipY <= hipAtStart && squatted)
      ) {
        counter++;
        squatted = false;
      }
      canvasCtx.fillText(counter, -40, 40);
    }
    if (!isRunning || timer === endTime) {
      squatted = false;
      if (ran) {
        console.log(record);
        getSquatData(record);
        ran = false;
      }
      ran = false;
    }
    canvasCtx.restore();
  };
  return (
    <div className="Canvas">
      <Webcam
        ref={webcamRef}
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          left: "0",
          right: "0",
          display: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          left: "0",
          right: "0",
          zIndex: 1,
        }}
      ></canvas>
    </div>
  );
};

export default Canvas;
