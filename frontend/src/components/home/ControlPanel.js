import Button from './Button'
import Button2 from './Button2'
import { Link } from 'react-router-dom'
import Toggle from './Toggle'

const ControlPanel = ({ onChange, onClick, onClick2, isRecording, isLeft }) => {
  return (
    <div className='control-panel'>
      <div>L
        <Toggle
          onChange={onChange}
          isLeft={isLeft}
        />
        R</div>
      <Button
        color={isRecording ? 'red' : 'lawngreen'}
        onClick={onClick}
        text={isRecording ? 'Stop' : 'Start'}
      />
      <div className='control-panel2'>
        <Button2
          color='grey'
          onClick={onClick2}
          text='Load'
        />
        <br></br>
        <Link to='/info' target={'_blank'}>
          <Button2
            color={'gray'}
            text={'Help'}
          />
        </Link>
      </div>
    </div>
  )
}

export default ControlPanel
