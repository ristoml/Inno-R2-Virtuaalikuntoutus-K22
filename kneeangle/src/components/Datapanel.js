import Button from './Button'
import Stats from "./Stats";
import Datatable from "./Datatable";

const Datapanel = ({ onClick, squatData }) => {

    return (
        <div>
        <Stats squatData={squatData}/>
        <Datatable squatData={squatData}/>
        <Button
            color={'gray'}
            onClick={onClick}
            text={'Close'}
        />
        </div>

    )
}

export default Datapanel
