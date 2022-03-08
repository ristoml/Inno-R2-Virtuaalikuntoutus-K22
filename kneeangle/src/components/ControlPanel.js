import Button from './Button'
import Toggle from './Toggle'

const ControlPanel = ({ onChange, onClick, showStart }) => {
  return (
    <div className='control-panel'>
      <Toggle
        onChange={onChange}
      />
      <Button
        color={showStart ? 'green' : 'red'}
        onClick={onClick}
        text={showStart ? 'Start' : 'Stop'}
      />
      <Button
        color={'gray'}
        text={'?'}
      />
    </div>
  )
}

export default ControlPanel
