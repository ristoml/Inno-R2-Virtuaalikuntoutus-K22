import ResultPanel from './ResultPanel'
import Button from '../home/Button'
import Stats from "./Stats"
import Datatable from "./Datatable"
import Playback from './Playback'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'


const Datapanel = ({ onClick, squatData }) => {
    const [resultId, setResultId] = useState(null)
    const [data, setCurrentData] = useState(null)                 
    const saved = useRef(false)
    const newData = useRef(false) 
    Object.keys(squatData).length >= 2 ? newData.current = true : newData.current = false    

    useEffect(() => {
        console.log(squatData)
        switch (newData.current) {
            case true:
                if (!saved.current) {
                    saveAndGetResult(squatData)                    
                    saved.current = true
                    newData.current = false
                }
                break
            default:
                switch (resultId) {
                    case null:
                        getLatestResult()
                        break
                    default:
                        getResult(resultId)
                }
                break
        }
    }, [])

    const saveAndGetResult = (results) => {
        console.log('save and get result')
        const resultObject = {
            date: new Date().toISOString(),
            data: results,
            client: ''
        }
        const promise = axios.post('http://localhost:3001/api/addResult', resultObject)

        promise.then(response => {
            setCurrentData(response.data)            
        })
    }
    const updateResult = (resultId, clientName) => {
        console.log('get result id: ' + resultId)
        setResultId(resultId)

        const client = {
            client: clientName
        }

        const promise = axios.put(`http://localhost:3001/api/update/${resultId}`, client)
        promise.then(response => {
            setCurrentData(response.data)
        })
    }
    const getLatestResult = () => {
        console.log('get latest')
        const promise = axios.get('http://localhost:3001/api/getLatest')
        promise.then(response => {
            setCurrentData(response.data)
        })
    }
    const getResult = (resultId) => {
        console.log('get result id: ' + resultId)
        setResultId(resultId)
        const promise = axios.get(`http://localhost:3001/api/results/${resultId}`)
        promise.then(response => {
            setCurrentData(response.data)
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
