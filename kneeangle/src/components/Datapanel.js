import Button from './Button'
import Stats from "./Stats";
import Datatable from "./Datatable";

let data = []
const Datapanel = ({ onClick, squatData }) => {
    if (squatData !== null) {
        data = squatData
    }    
    return (
        <div>
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
