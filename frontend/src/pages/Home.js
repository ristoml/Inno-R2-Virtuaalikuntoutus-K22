import { useState, useRef } from "react"
import Canvas from "../components/home/Canvas"
import ControlPanel from "../components/home/ControlPanel"
import Datapanel from "../components/results/Datapanel"
import Popup from "../components/home/Popup"


const Home = () => {
  const [isLeftLeg, setIsLeftLeg] = useState(true)
  const [showCanvas, setShowCanvas] = useState(true)
  const [recording, setRecording] = useState(false)
  const [squatData, setSquatData] = useState({})
  const clientName = useRef('')
  const dataOk = useRef(true)
  const [showPopup, setShowPopup] = useState(false)
  const [useTimer, setUseTimer] = useState(false)

  const startRecording = () => {
    console.log("Start recording");
    setRecording(true)
    setShowCanvas(true)
  }

  const stopRecording = () => {
    console.log("Stop recording");
    setRecording(false)
  }

  const showResults = () => {
    squatData.current = {}
    setRecording(false)
    setShowCanvas(false)
  }

  const handleSquatData = (squatData) => {
    console.log(squatData)
    if (squatData[0].data === undefined) {
      dataOk.current = false
    } else {
      setSquatData(squatData)
    }
    setShowPopup(true)
  }

  const handleTimerChange = () => {
    setUseTimer(!useTimer)
  }

  const handlePopup = (selection, name) => {
    clientName.current = name
    if (selection) {
      setShowPopup(false)
      setShowCanvas(false)
    } else {
      setSquatData({})
      setShowPopup(false)
    }
  }

  return (
    <div className="container">
      {showCanvas ? (
        <>
          <Canvas
            isLeftLeg={isLeftLeg}
            isStarted={recording}
            getSquatData={handleSquatData}
            onClick={showResults}
            useTimer={useTimer}
          />
          <ControlPanel
            onChange={() => setIsLeftLeg(!isLeftLeg)}
            onClick={recording ? stopRecording : startRecording}
            onClick2={showResults}
            isRecording={recording}
            isLeft={isLeftLeg}
            handleTimer={handleTimerChange}
            useTimer={useTimer}
          />
          {showPopup &&
            <Popup
              dataOk={dataOk.current}
              handlePopup={handlePopup}
            />
          }
        </>
      ) : (
        <Datapanel
          onClick={() => setShowCanvas(!showCanvas)}
          squatData={squatData}
          clientName={clientName.current}
        />
      )}
    </div>
  )
}

export default Home
