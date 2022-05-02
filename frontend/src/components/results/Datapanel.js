import ResultPanel from './ResultPanel'
import Button from '../home/Button'
import Stats from "./Stats"
import Datatable from "./DataTable"
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'


const Datapanel = ({ onClick, squatData, clientName }) => {
    const [data, setCurrentData] = useState(null)
    const saved = useRef(false)

    const newData = useRef(false)
    Object.keys(squatData).length > 1 ? newData.current = true : newData.current = false


    useEffect(() => {
        console.log(data) // REMOVE
        switch (newData.current) {
            case true:
                if (!saved.current) {
                    saveAndGetResult(squatData)
                    //getLatestResult()
                    saved.current = true
                    newData.current = false
                }
                break
            default:
                getLatestResult()
        }
    }, [])


    const saveAndGetResult = (results) => {
        console.log('save and get result')
        const resultObject = {
            date: new Date().toISOString(),
            data: results,
            client: clientName
        }
        const promise = axios.post('http://localhost:3001/api/addResult', resultObject)
        promise.then(response => {
            setCurrentData(response.data)
        })
    }
    const getResult = (resultId) => {
        console.log('get result id: ' + resultId)
        const promise = axios.get(`http://localhost:3001/api/results/${resultId}`)
        promise.then(response => {
            setCurrentData(response.data)
        })
    }

    const getLatestResult = () => {
        console.log('get latest')
        const promise = axios.get('http://localhost:3001/api/getLatest')
        promise.then(response => {
            console.log(response.data.id)
            setCurrentData(response.data)
        })
    }
    const deleteResult = (resultId) => {
        console.log('delete result id: ' + resultId)
        const promise = axios.delete(`http://localhost:3001/api/results/${resultId}`)
        promise.then(response => {
            //setCurrentdata(response.data.data)
            console.log(response)
            getLatestResult()
        })
    }

    const updateResult = (resultId, clientName) => {
        console.log('update: ' + resultId)
        //setResultId(resultId)
        const client = {
            client: clientName
        }
        const promise = axios.put(`http://localhost:3001/api/update/${resultId}`, client)
        promise.then(response => {
            console.log(response)
        })
    }


    return (
        <>
            {data &&
                <div className='data-panel'>
                    <ResultPanel
                        getId={getResult}
                        delId={deleteResult}
                        sdata={data}
                        updateClient={updateResult}
                    />
                    <Stats data={data.data} />
                    <Datatable data={data} />
                    <Button
                        color={'gray'}
                        onClick={onClick}
                        text={'Home'}
                    />
                </div>
            }
        </>

    )
}

export default Datapanel
