import Button from './Button'
import Stats from "./Stats";
import Datatable from "./Datatable";
import Playback from './Playback';

let data = []
const Datapanel = ({ onClick, squatData }) => {
    if (squatData !== null) {
        data = squatData
    }    
    return (
        <div className='data-panel'>
        <Stats data={data}/>
        <Datatable data={data}/>
        <Button
            color={'gray'}
            onClick={onClick}
            text={'Close'}
        />
        </div>

    )
}

export default Datapanel
