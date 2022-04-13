import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button2 from '../home/Button2'

const makeOptions = (data) => {
    const rdata = data.map(x => ({
        value: x.id,
        label: new Date(x.date).toLocaleString('fi-FI') + ': ' + x.client
    }))
    return rdata.reverse()
}
let options

const ResultPanel = ({ getId, delId, sdata }) => {
    const [resultId, setResultId] = useState(null)    
    const [allData, setAllData] = useState(sdata)
    const [label, setLabel] = useState()
    const isLoaded = useRef(false)

    useEffect(() => {
        setAllData(sdata)
        switch (isLoaded.current) {
            case false:
                getAllData().then(response => {
                    options = makeOptions(response.data)
                    setLabel(options[0].label)
                    setResultId(options[0].value)
                    console.log('options recreated')                    
                    isLoaded.current = true
                })
                break
            default:                
                
        }
    }, [sdata]);

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
    // const deleteId = (rId) => {
    //     isLoaded.current = false
    //     if (resultId === null) {
    //         delId(options[0].value)
    //     } else {
    //         delId(resultId)
    //     }
    // }


    return (<>
        {options &&
            <div className='result-panel'>
                <Select className='select-single'
                    onChange={e => {
                        setResultId(e.value)
                        getId(e.value)
                    }}
                    options={options}                    
                    value={{ label: label }}
                    
                />
                <Button2
                    text='Save'
                    color='green'                    
                />
                <Button2
                    text='Delete'
                    color='red'
                    onClick={() => {
                        isLoaded.current=false
                        delId(resultId)
                        
                    }
                    }
                />
            </div>
        }
    </>)
}


export default ResultPanel