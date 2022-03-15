import Button from './Button'
import Stats from "./Stats";
import Datatable from "./Datatable";

const Datapanel = ({ onClick }) => {

    return (
        <div>
        <Stats/>
        <Datatable/>
        <Button
            color={'gray'}
            onClick={onClick}
            text={'Close'}
        />
        </div>

    )
}

export default Datapanel
