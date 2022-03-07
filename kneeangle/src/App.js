import { useState } from 'react'
import Canvas from './components/Canvas'
import ControlPanel from './components/ControlPanel'

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
    <div className='container'>
      <Canvas
        isLeftLeg={isLeftLeg}
      />
      <ControlPanel
        onChange={() => setIsLeftLeg(!isLeftLeg)}
        onClick={showStart ? startRecording : stopRecording}
        showStart={showStart}
      />
    </div>
  )
}

export default App
