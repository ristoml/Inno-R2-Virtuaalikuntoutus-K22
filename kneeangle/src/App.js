import { useState } from 'react'
import Canvas from './components/Canvas'
import ControlPanel from './components/ControlPanel'
import Datapanel from './components/Datapanel'

const App = () => {
  const [isLeftLeg, setIsLeftLeg] = useState(true)
  const [showStart, setShowStart] = useState(true)
  

  const startRecording = () => {
    console.log('Start')
    setShowStart(!showStart)
  }
  const stopRecording = ({dataobject}) => {
    console.log('Stop')
    setShowStart(!showStart)

  }

  return (
    <div>
    <div className='container'>
      <Canvas
        isLeftLeg={isLeftLeg}
        isStarted={!showStart}
      />
      <ControlPanel
        onChange={() => setIsLeftLeg(!isLeftLeg)}
        onClick={showStart ? startRecording : stopRecording}
        showStart={showStart}
      /> 
    </div>
    <div>
    <Datapanel/>
    </div>
    </div>
  )
}

export default App
