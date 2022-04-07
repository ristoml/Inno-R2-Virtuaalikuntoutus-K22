import Button from './Button'
import Stats from "./Stats";
import Datatable from "./Datatable";
import Playback from './Playback';
import axios from 'axios';

let data = []

const Datapanel = ({ onClick, squatData }) => {
    if (squatData !== null) {
        //lisääminen tietokantaan
        const resultObject = {
            date: new Date().toISOString(),
            data: squatData
        }
        axios
            .post('http://localhost:3001/api/addResult', resultObject)
            .then(response => {
                console.log(response)
            }).catch(error => { console.error(error.response.data) })

    }
    //viimeisimmän haku tietokannasta
    const promise = axios.get('http://localhost:3001/api/results/latest')
    promise.then(response => {
        data = response.data.data
    })
    setTimeout(function () {
        data = {}
      }, 30000)


    return (
        <div className='data-panel'>
            <Stats data={data} />
            <Datatable data={data} />
            <Button
                color={'gray'}
                onClick={onClick}
                text={'Close'}
            />
        </div>

    )
}

export default Datapanel
