import { useState } from "react"
import Canvas from "../components/Canvas"
import ControlPanel from "../components/ControlPanel"
import Datapanel from "../components/Datapanel"
import axios from 'axios'

const Home = () => {
  const [isLeftLeg, setIsLeftLeg] = useState(true)
  const [showCanvas, setShowCanvas] = useState(true)
  const [showStart, setShowStart] = useState(true)
  const [squatData, setSquatData] = useState({})

  const startRecording = () => {
    console.log("Start");
    setShowStart(!showStart);
  }
  const stopRecording = () => {
    console.log("Stop");
    setShowStart(!showStart);
    setTimeout(function () {
      setShowCanvas(!showCanvas);
    }, 1000)
  }


  const handleSquatData = (squatData) => {
    setSquatData(squatData)

    //haku

    const promise = axios.get('http://localhost:3001/api/results')
    promise.then(response => {
      console.log(response.data)
    })


    //yksittäinen
    /*
    const promise = axios.get('http://localhost:3001/api/results/62470ba05a6a3c2b3ad3c01f')
    promise.then(response => {
      console.log(response.data)
    })
    /*

    //lisääminen
    const resultObject = {
      date: new Date().toISOString(),
      data: squatData
    }
    /*
        axios
          .post('http://localhost:3001/api/addResult', resultObject)
          .then(response => {
            console.log(response)
          }).catch(error => { console.error(error.response.data) })
    */
    //stopRecording()
  }

  return (
    <div className="container">
      {showCanvas ? (
        <>
          <Canvas
            isLeftLeg={isLeftLeg}
            isStarted={!showStart}
            getSquatData={handleSquatData}
          />
          <ControlPanel
            onChange={() => setIsLeftLeg(!isLeftLeg)}
            onClick={showStart ? startRecording : stopRecording}
            showStart={showStart}
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
