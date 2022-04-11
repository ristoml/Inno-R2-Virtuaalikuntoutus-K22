import ResultPanel from './ResultPanel'
import Button from '../home/Button'
import Stats from "./Stats"
import Datatable from "./Datatable"
import Playback from './Playback'
import axios from 'axios'
import { useEffect, useState } from 'react'


const Datapanel = ({ onClick, squatData }) => {

    const [data, setCurrentdata] = useState(null)
    const [resultId, setResultId] = useState('')
    let saved = false

    useEffect(() => {
        console.log(squatData)
        if (Object.keys(squatData).length !== 0 && !saved) {
            saveAndGetResult()
        }
        if (Object.keys(squatData).length === 0 && resultId === '') {
            getLatestResult()
        } else if (Object.keys(squatData).length === 0 && resultId !== '') {
            getResult(resultId)
        }
    }, [resultId])

    const saveAndGetResult = async () => {
        console.log('save and get result')
        const resultObject = {
            date: new Date().toISOString(),
            data: squatData,
            client: ''
        }
        const response = await axios.post('http://localhost:3001/api/addResult', resultObject)
        setCurrentdata(response.data)
        saved = true
    }
    const updateResult = (resultId, clientName) => {
        console.log('get result id: ' + resultId)
        setResultId(resultId)

        const client = {
            client: clientName
        }

        const promise = axios.put(`http://localhost:3001/api/update/${resultId}`, client)
        promise.then(response => {
            setCurrentdata(response.data)
        })
    }
    const getLatestResult = () => {
        console.log('get latest')
        const promise = axios.get('http://localhost:3001/api/getLatest')
        promise.then(response => {
            setCurrentdata(response.data)
        })
    }
    const getResult = (resultId) => {
        console.log('get result id: ' + resultId)
        setResultId(resultId)
        const promise = axios.get(`http://localhost:3001/api/results/${resultId}`)
        promise.then(response => {
            setCurrentdata(response.data)
        })
    }

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

    return (
        <>
            {data &&
                <div className='data-panel'>
                    <ResultPanel
                        getResult={getResult}
                        deleteResult={deleteResult}
                        updateResult={updateResult}
                    />
                    <Stats data={data.data} />
                    <Datatable data={data.data} />
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
