import ResultPanel from './ResultPanel'
import Button from '../home/Button'
import Stats from "./Stats"
import Datatable from "./Datatable"
import Playback from './Playback'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'


const Datapanel = ({ onClick, squatData }) => {
    const [data, setCurrentData] = useState(null)
    const saved = useRef(false)
    const newData = useRef(false)
    Object.keys(squatData).length >= 2 ? newData.current = true : newData.current = false
    console.log(Object.keys(squatData).length)

    useEffect(() => {
        console.log(squatData)
        switch (newData.current) {
            case true:
                if (!saved.current) {
                    //saveAndGetResult(squatData)                   
                    getLatestResult()
                    saved.current = true
                    newData.current = false
                }
                break
            default:
                getLatestResult()
        }
    }, [])

    const getId = (id) => {
        getResult(id)
    }

    const saveAndGetResult = (results) => {
        console.log('save and get result')
        let d = new Date()
        const resultObject = {
            date: d.toLocaleString('fi-FI'),
            data: results,
            client: ''
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
            setCurrentData(response.data)
        })
    }


    return (
        <>
            {data &&
                <div className='data-panel'>
                    <ResultPanel
                        getId={getId}
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
