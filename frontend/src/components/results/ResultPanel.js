/* Component used for displaying the drop-down menu showing the entries from the DB. 
   It also calls the API to get all of the data from the DB. */

import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button from '../home/Button'

let APIURL = 'http://localhost:3001/' //Url which is used in api calls

const makeOptions = (data) => { // form the initial array of labels and Ids which is passed on to the react-select drop-down menu component
    const rdata = data.map(x => ({
        value: x.id,
        label: new Date(x.date).toLocaleString('en-GB') + ': ' + x.client
    }))
    return rdata.reverse()
}

const updateOptions = (data, value, newName) => { // after deleting an entry we need to form the array again.    
    for (let i = 0; i < data.length; i++) {
        if (data[i].value === value) {
            data[i].label = data[i].label.slice(0, 22) + newName // label includes both the date and the client name, so we slice it a little
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

    useEffect(() => {
        setAllData(sdata)
        switch (isLoaded.current) {
            case false: // when we render this component for the first time
                getAllData().then(response => {
                    options = makeOptions(response.data)
                    setLabel(options[0].label)
                    setResultId(options[0].value)
                    setTempName(options[0].label.slice(22))
                    setListOptions(options)
                    isLoaded.current = true
                })
                break
            default:

        }
    }, [sdata])

    const getAllData = () => {
        return axios.get(APIURL + 'api/results')
    }

    return (<>
        {options && // dont render before we have the array ready
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
                <Button
                    className={'btn2'}
                    text='Edit'
                    color='#8300d4'
                    onClick={() => {
                        setShowEdit(true)
                    }
                    }
                />
                <Button
                    className={'btn2'}
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
        } {showEdit && // show a pop-up box for editing the name
            <div className='popup-box'>
                <div className='editBox'>
                    <p><strong>Edit client name</strong><br /></p>
                    <label>New name: </label>
                    <input type="text" value={tempName} onChange={(e) => { setTempName(e.target.value) }} /><br /><br />
                    <Button
                        className={'btn2'}
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
                    <Button
                        className={'btn2'}
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
