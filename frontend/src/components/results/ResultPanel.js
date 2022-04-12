import { useState, useEffect } from 'react'
import Select from 'react-select'
import axios from 'axios'

const makeOptions = (data) => {
    const rdata = data.map((id, date, client) => [{
        value: id,
        label: date + ' ' + client
    }])
    return rdata
}
let options

const ResultPanel = ({ getData }) => {
    const [selectOptions, setSelectOptions] = useState()
    const [resultId, setResultId] = useState(null)
    const [allData, setAllData] = useState(null)
    const [clientName, setClientName] = useState('')
    const [date, setDate] = useState()

    useEffect(() => {
        getAllData()
        options = makeOptions(allData)
        console.log(options)
    }, [resultId]);

    // const getResult = (resultId) => {
    //     console.log('get result id: ' + resultId)
    //     setResultId(resultId)
    //     const promise = axios.get(`http://localhost:3001/api/results/${resultId}`)
    //     promise.then(response => {
    //         setCurrentData(response.data)
    //     })
    // }
    // const deleteResult = (resultId) => {
    //     console.log('delete result id: ' + resultId)
    //     setResultId(resultId)
    //     const promise = axios.delete(`http://localhost:3001/api/results/${resultId}`)
    //     promise.then(response => {
    //         //setCurrentdata(response.data.data)
    //         console.log(response)
    //         getLatestResult()
    //     })
    // }
    // const updateResult = (resultId, clientName) => {
    //     console.log('get result id: ' + resultId)
    //     setResultId(resultId)
    //     const client = {
    //         client: clientName
    //     }
    //     const promise = axios.put(`http://localhost:3001/api/update/${resultId}`, client)
    //     promise.then(response => {
    //         setCurrentData(response.data)
    //     })
    // }
    const getAllData = () => {
        console.log('get all data')
        const promise = axios.get('http://localhost:3001/api/results')
        promise.then(response => {
            setAllData(response.data)            
        })
    }
    

    return (<>
        <div className='resultpanel'>
            <Select options={options} />
        </div>
    </>)
}

export default ResultPanel