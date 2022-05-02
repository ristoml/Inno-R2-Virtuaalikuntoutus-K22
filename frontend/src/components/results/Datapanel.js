/* This component is used for displaying the result-components to the user. This component also contains most of the API-calls */

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

    Object.keys(squatData).length > 1 ? newData.current = true : newData.current = false // check if we are accessing this component after fresh recording

    useEffect(() => {
        switch (newData.current) {
            case true: // when we have a new recording
                if (!saved.current) {
                    saveAndGetResult(squatData)
                    saved.current = true
                    newData.current = false
                }
                break
            default:
                getLatestResult() // in case of no new recording, just get the latest entry from the database
        }
    }, [])

    const saveAndGetResult = (results) => { // called when we access this component with newly recorded data and we need to save it to DB        
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
    const getResult = (resultId) => { // get specific result by ID
        const promise = axios.get(`http://localhost:3001/api/results/${resultId}`)
        promise.then(response => {
            setCurrentData(response.data)
        })
    }
    const getLatestResult = () => { // get latest entry from the DB        
        const promise = axios.get('http://localhost:3001/api/getLatest')
        promise.then(response => {
            setCurrentData(response.data)
        })
    }
    const deleteResult = (resultId) => { // delete entry from DB by using a Id        
        const promise = axios.delete(`http://localhost:3001/api/results/${resultId}`)
        promise.then(response => {
            console.log(response)
            getLatestResult()
        })
    }

    const updateResult = (resultId, clientName) => { // called when we want to edit the Clients name on a DB entry with specific Id              
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
            {data && // dont try to render before we have the data needed by the child-components
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
