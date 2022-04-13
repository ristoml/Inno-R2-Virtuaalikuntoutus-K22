import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button2 from '../home/Button2'

const makeOptions = (data) => {
    const rdata = data.map(x => ({
        value: x.id,
        label: new Date(x.date).toLocaleString('fi-FI') + ': ' + x.client
    }))
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
                    setLabel(options[0].label)
                    isLoaded.current = true
                })
                break
            default:
                getId(resultId)
        }
    }, [resultId]);
    let d = new Date()
    console.log(d.toLocaleString('fi-FI'))


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
            <div className='result-panel'>
                <Select className='select-single'
                    onChange={e => {
                        setResultId(e.value)
                        setLabel(e.label)
                    }}
                    options={options}
                    defaultValue={{ label: options[0].label }}
                />
                <Button2
                    text='Save'
                    color='#bd77ff'                    
                />
                <Button2
                    text='Delete'
                    color='#bdffff'
                />
            </div>
        }
    </>)
}


export default ResultPanel
