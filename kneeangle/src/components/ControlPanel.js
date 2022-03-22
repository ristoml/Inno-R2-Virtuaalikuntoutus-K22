import Button from './Button'
import { Link } from 'react-router-dom'
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
      <Link to='/info' target={'_blank'}>
        <Button
          color={'gray'}
          text={'?'}
        />
      </Link>
    </div>
  )
}

export default ControlPanel
