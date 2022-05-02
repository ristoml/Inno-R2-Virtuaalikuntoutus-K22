/* This component contains the processing of the Mediapipe landmark-data, like calculating the kneeangles. 
   It's methods are used in the Canvas.js component. */

let leftLeg, rightLeg
let leftHipX,
    leftHipY,
    leftKneeX,
    leftKneeY,
    leftAnkleX,
    leftaAnkleY

let rightHipX,
    rightHipY,
    rightKneeX,
    rightKneeY,
    rightAnkleX,
    rightAnkleY

const updatePoseHelperLeft = (results) => { // form the array containing the Mediapipe landmark-data of both hips and left leg
    leftLeg = [
        results.poseLandmarks[24],
        results.poseLandmarks[23],
        results.poseLandmarks[25],
        results.poseLandmarks[27],
    ]
    // store the coordinates for later kneeangle calculation
    leftHipX = results.poseLandmarks[23].x
    leftHipY = results.poseLandmarks[23].y
    leftKneeX = results.poseLandmarks[25].x
    leftKneeY = results.poseLandmarks[25].y
    leftAnkleX = results.poseLandmarks[27].x
    leftaAnkleY = results.poseLandmarks[27].y
}
const getLeftLeg = () => {
    return leftLeg
}
const getLeftKneeX = () => {
    return leftKneeX
}
const getLeftKneeY = () => {
    return leftKneeY
}
const getLeftHipY = () => {
    return leftHipY
}
const getLeftAngle = () => { // angle for left knee is calculated here
    return -(180 - (Math.atan2(leftaAnkleY - leftKneeY, leftAnkleX - leftKneeX) - Math.atan2(leftHipY - leftKneeY, leftHipX - leftKneeX)) * (180 / Math.PI))
}
// Now the same for right leg
const updatePoseHelperRight = (results) => {
    rightLeg = [
        results.poseLandmarks[23],
        results.poseLandmarks[24],
        results.poseLandmarks[26],
        results.poseLandmarks[28],
    ]
    rightHipX = results.poseLandmarks[24].x
    rightHipY = results.poseLandmarks[24].y
    rightKneeX = results.poseLandmarks[26].x
    rightKneeY = results.poseLandmarks[26].y
    rightAnkleX = results.poseLandmarks[28].x
    rightAnkleY = results.poseLandmarks[28].y
}
const getRightLeg = () => {
    return rightLeg
}
const getRightKneeX = () => {
    return rightKneeX
}
const getRightKneeY = () => {
    return rightKneeY
}
const getRightHipY = () => {
    return rightHipY
}
const getRightAngle = () => {
    return 180 - (Math.atan2(rightAnkleY - rightKneeY, rightAnkleX - rightKneeX) - Math.atan2(rightHipY - rightKneeY, rightHipX - rightKneeX)) * (180 / Math.PI)
}

export { updatePoseHelperLeft, getLeftLeg, getLeftKneeX, getLeftKneeY, getLeftHipY, getLeftAngle, updatePoseHelperRight, getRightLeg, getRightKneeX, getRightKneeY, getRightHipY, getRightAngle }