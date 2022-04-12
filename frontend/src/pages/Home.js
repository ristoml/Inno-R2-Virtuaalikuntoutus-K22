import { useState } from "react"
import Canvas from "../components/home/Canvas"
import ControlPanel from "../components/home/ControlPanel"
import Datapanel from "../components/results/Datapanel"


const Home = () => {
  const [isLeftLeg, setIsLeftLeg] = useState(true)
  const [showCanvas, setShowCanvas] = useState(true)
  const [recording, setRecording] = useState(false) 
  const [squatData, setSquadData] = useState({})    

  const startRecording = () => {
    console.log("Start recording");
    setRecording(true)
    setShowCanvas(true)
  }
  const stopRecording = () => {
    console.log("Stop recording");
    setRecording(false)
    setTimeout(function () {
      setShowCanvas(false);
    }, 1000)
  }
  const showResults = () => {
    squatData.current = {}
    setRecording(false)
    setShowCanvas(false)
  }

  const handleSquatData = (squatData) => {
    setSquadData(squatData)
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
          />          
          <ControlPanel
            onChange={() => setIsLeftLeg(!isLeftLeg)}
            onClick={recording ? stopRecording : startRecording}
            onClick2={showResults}
            isRecording={recording}     
            isLeft={isLeftLeg}       
          />
        </>
      ) : (
        <Datapanel
          onClick={() => setShowCanvas(!showCanvas)}
          squatData={squatData}
        />
      )}
    </div>
  )
}

export default Home
