import { useState } from 'react'
import Canvas from './components/Canvas'
import ControlPanel from './components/ControlPanel'
import Datapanel from './components/Datapanel'

const App = () => {
  const [isLeftLeg, setIsLeftLeg] = useState(true)
  const [showCanvas, setShowCanvas] = useState(true)
  const [showStart, setShowStart] = useState(true)  

  const startRecording = () => {
    console.log('Start')
    setShowStart(!showStart)
  }
  const stopRecording = ({dataobject}) => {
    console.log('Stop')
    setShowCanvas(!showCanvas)
    setShowStart(!showStart)
  }

  return (
    <div className='container'>
      {showCanvas ? (
        <>
        <Canvas
          isLeftLeg={isLeftLeg}
          isStarted={!showStart} 
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
        />
      )}
    </div>
  )
}

export default App
