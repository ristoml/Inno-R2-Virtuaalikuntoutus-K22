import Button from './Button'
import Stats from "./Stats";
import Datatable from "./Datatable";
import Playback from './Playback';
import axios from 'axios';
import { useEffect, useState } from 'react'


const Datapanel = ({ onClick, squatData }) => {

    const [data, setCurrentdata] = useState(null)

    useEffect(() => {
        //viimeisin haku
        const promise = axios.get('http://localhost:3001/api/getlatest')
        promise.then(response => {
            setCurrentdata(response.data.data)
        })
    }, [squatData])


    if (squatData !== null) {
        //lisääminen tietokantaan
        /* const resultObject = {
             date: new Date().toISOString(),
             data: squatData
         }
         axios
             .post('http://localhost:3001/api/addResult', resultObject)
             .then(response => {
                 console.log(response)
             }).catch(error => { console.error(error.response.data) })
             */
    }




    return (
        <>
            {data &&
                <div className='data-panel'>
                    <Stats data={data} />
                    <Datatable data={data} />
                    <Button
                        color={'gray'}
                        onClick={onClick}
                        text={'Close'}
                    />
                </div>
            }
        </>

    )
}



export default Datapanel
