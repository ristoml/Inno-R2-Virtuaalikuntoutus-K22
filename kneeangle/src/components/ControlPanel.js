import Button from './Button'
import { Link } from 'react-router-dom'
import Toggle from './Toggle'

const ControlPanel = ({ onChange, onClick, onClick2, isRecording }) => {
  return (
    <div className='control-panel'>
      <Toggle
        onChange={onChange}
      />
      <Button
        color={isRecording ? 'red' : 'green'}
        onClick={onClick}
        text={isRecording ? 'Stop' : 'Start'}
      />
      <Link to='/info' target={'_blank'}>
        <Button
          color={'gray'}
          text={'?'}
        />
      </Link>
      <Button
        color='grey'
        onClick={onClick2}
        text='Results'
        />
    </div>
  )
}

export default ControlPanel
