import ResultPanel from './ResultPanel'
import Button from './Button'
import Stats from "./Stats"
import Datatable from "./Datatable"
import Playback from './Playback'
import axios from 'axios'
import { useEffect, useState } from 'react'


const Datapanel = ({ onClick, squatData }) => {

    const [data, setCurrentdata] = useState(null)
    const [saved, setSaved] = useState(false)
    const [resultId, setResultId] = useState('')

    useEffect(() => {
        console.log(squatData)
        const saveAndGetResult = async () => {
            console.log('save and get result')
            const resultObject = {
                date: new Date().toISOString(),
                data: squatData,
                client: ''
            }
            const response = await axios.post('http://localhost:3001/api/addResult', resultObject)
            setCurrentdata(response.data.data)
            setSaved(true)
        }
        if (Object.keys(squatData).length !== 0 && !saved) {
            saveAndGetResult()
        }
        if (Object.keys(squatData).length === 0 && resultId === '') {
            getLatestResult()
        } else if (Object.keys(squatData).length === 0 && resultId !== '') {
            getResult(resultId)
        }
    }, [resultId])

    const getLatestResult = () => {
        console.log('get latest')
        const promise = axios.get('http://localhost:3001/api/getlatest')
        promise.then(response => {
            setCurrentdata(response.data.data)
        })
    }
    const getResult = (resultId) => {
        console.log('get result id: ' + resultId)
        setResultId(resultId)
        const promise = axios.get(`http://localhost:3001/api/results/${resultId}`)
        promise.then(response => {
            setCurrentdata(response.data.data)
        })
    }
    // const saveResult = (sdata) => {
    //     console.log('save result: ' + sdata)
    //     const resultObject = {
    //         date: new Date().toISOString(),
    //         data: sdata
    //     }
    //     axios
    //         .post('http://localhost:3001/api/addResult', resultObject)
    //         .then(response => {
    //             console.log(response)
    //         }).catch(error => { console.error(error.response.data) })

    // }
    const deleteResult = (resultId) => {
        console.log('delete result id: ' + resultId)
        setResultId(resultId)
        const promise = axios.delete(`http://localhost:3001/api/results/${resultId}`)
        promise.then(response => {
            //setCurrentdata(response.data.data)
            console.log(response)
            getLatestResult()
        })
    }
    const updateResult = (sdata, resultId, clientName) => {
        // const resultObject = {
        //     date: new Date().toISOString(),
        //     data: sdata
        // }
        // axios
        //     .post('http://localhost:3001/api/addResult', resultObject)
        //     .then(response => {
        //         console.log(response)
        //         squatData = null
        //     }).catch(error => { console.error(error.response.data) })

    }

    return (
        <>
            {data &&
                <div className='data-panel'>
                    <ResultPanel
                        getResult={getResult}
                        deleteResult={deleteResult}
                        updateResult={updateResult}
                    />
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
