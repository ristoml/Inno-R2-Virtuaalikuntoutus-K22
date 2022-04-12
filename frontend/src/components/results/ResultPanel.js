import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import axios from 'axios'

const makeOptions = (data) => {
    const rdata = data.map((data) => [{
        value: data.id,
        label: data.date + ' ' + data.client
    }])
    return rdata
}
let options

const ResultPanel = ({ getId }) => {
    const [selectOptions, setSelectOptions] = useState()
    const [resultId, setResultId] = useState(null)
    //const [allData, setAllData] = useState(null)
    const [label, setLabel] = useState('')
    const isLoaded = useRef(false)

    useEffect(() => {
        switch (isLoaded.current) {
            case false:
                getAllData().then(response => {
                    options = makeOptions(response.data)
                    setSelectOptions(options)
                    console.log(options)
                    console.log(options[0][0].label)                    
                    isLoaded.current = true
                })
                break
            default:
                getId(resultId)
        }
    }, [resultId]);


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
        return axios.get('http://localhost:3001/api/results')
        // promise.then(response => {
        //     setAllData(response.data)
        // })
    }


    return (<>
        {options &&
            <div className='resultpanel'>
                <Select className='selectsingle'
                    onChange={e => {
                        setResultId(e[0].value)
                        setLabel(e[0].label)
                    }}
                    options={options}
                    defaultValue={{ label: options[0][0].label }}
                />
            </div>
        }
    </>)
}


export default ResultPanel