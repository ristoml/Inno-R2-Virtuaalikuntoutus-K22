import { useState } from 'react'
import Canvas from './components/Canvas'
import ControlPanel from './components/ControlPanel'
import Stats from './components/Stats'
import Data from './components/Datatable'

const App = () => {
  const [isLeftLeg, setIsLeftLeg] = useState(true)
  const [showStart, setShowStart] = useState(true)

  const startRecording = () => {
    console.log('Start')
    setShowStart(!showStart)
  }
  const stopRecording = () => {
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
    <Stats/>
    </div>
    <div>
    <Data/>
    </div>
    </div>
  )
}

export default App
