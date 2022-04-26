import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button2 from '../home/Button2'

const makeOptions = (data) => {
    const rdata = data.map(x => ({
        value: x.id,
        label: new Date(x.date).toLocaleString('en-GB') + ': ' + x.client
    }))
    return rdata.reverse()
}

const updateOptions = (data, value, newName) => {
    console.log("update options")
    for (let i = 0; i < data.length; i++) {
        if (data[i].value === value) {
            data[i].label = data[i].label.slice(0, 22) + newName
        }
    }
    return data
}
let options

const ResultPanel = ({ getId, delId, sdata, updateClient }) => {
    const [resultId, setResultId] = useState(null)
    const [allData, setAllData] = useState(sdata)
    const [label, setLabel] = useState()
    const [showEdit, setShowEdit] = useState(false)
    const isLoaded = useRef(false)
    const [tempName, setTempName] = useState('')
    const [listOptions, setListOptions] = useState('')

    //console.log(sdata)

    useEffect(() => {
        setAllData(sdata)
        switch (isLoaded.current) {
            case false:
                getAllData().then(response => {
                    options = makeOptions(response.data)
                    setLabel(options[0].label)
                    setResultId(options[0].value)
                    console.log('options created')
                    setTempName(options[0].label.slice(22))
                    setListOptions(options)
                    isLoaded.current = true
                })
                break
            default:

        }
    }, [sdata]);


    const getAllData = () => {
        console.log('get all data')
        return axios.get('http://localhost:3001/api/results')
    }

    return (<>
        {options &&
            <div className='result-panel'>
                <Select className='select-single'
                    onChange={e => {
                        console.log(e)
                        setResultId(e.value)
                        setLabel(e.label)
                        getId(e.value)
                        setTempName(e.label.slice(22))
                    }}
                    options={listOptions}
                    value={{ label: label }}

                />
                <Button2
                    text='Edit'
                    color='#8300d4'
                    onClick={() => {
                        setShowEdit(true)
                    }
                    }
                />
                <Button2
                    text='Delete'
                    color='#bdffff'
                    onClick={() => {
                        window.confirm(`Do you want to delete the test result \n '${label}' ?`)
                        isLoaded.current = false
                        delId(resultId)
                    }
                    }
                />
            </div>
        } {showEdit &&
            <div className='popup-box'>
                <div className='editBox'>
                    <p><strong>Edit client name</strong><br /></p>
                    <label>New name: </label>
                    <input type="text" value={tempName} onChange={(e) => { setTempName(e.target.value) }} /><br /><br />
                    <Button2
                        color='grey'
                        text='Ok'
                        onClick={() => {
                            console.log("update: ", tempName)
                            setLabel(label.slice(0, 22) + tempName)
                            updateClient(resultId, tempName)
                            setListOptions(updateOptions(options, resultId, tempName))
                            console.log(listOptions)
                            setShowEdit(false)
                        }} />
                    <Button2
                        color='grey'
                        text='Cancel'
                        onClick={() => {
                            setShowEdit(false)
                        }} />
                </div>
            </div>
        }
    </>)
}


export default ResultPanel
