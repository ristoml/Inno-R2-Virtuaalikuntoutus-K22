// import { useState, useEffect, useRef } from 'react'
import { useState, useEffect} from 'react'
import { CSVLink } from "react-csv"


const Datatable = ({ data }) => {
  const [sdata, setData] = useState(data);
  // const angleValues = useRef(null)

  useEffect(() => {
    setData(data);
  }, [data]);

  // console.log('datan koko', data.length)
  // console.log('datatablen data', data)
  // console.log('datatablen counter', data[data.length - 1].counter)
  // console.log('angle', data[0].angle)
  //console.log('leg', data[0].leg)

  // angleValues.current = []

  // SEPARATE angle values for calculation
    
  let temparray = []
  let splitAnglevalues = []

  let counterNow = 0
  
  data.map((dataobj) => {
    splitAnglevalues[dataobj.counter] = temparray
    if(counterNow === dataobj.counter-1){
      counterNow = dataobj.counter
      temparray = []
    }
    temparray.push(dataobj.angle)
    return ''
  })

console.log('splitdata', splitAnglevalues)

// CALCULATE mean and std from minimum and maximum values

 let minX = 0
 let maxX = 0
 let minvalues = []
 let maxvalues = []

  for (let i = 0; i < splitAnglevalues.length-1; i++) {
    for (let j = 0 ; j <splitAnglevalues[i].length; j++){
      minX =  Math.min.apply(Math, splitAnglevalues[i])
      maxX = Math.max.apply(Math, splitAnglevalues[i])
    }
    minvalues.push(minX)
    maxvalues.push(maxX)
  }
//  console.log('minvalues', minvalues, maxvalues)
 
  const meanMin= (minvalues.reduce((a, b) => a + b, 0) / minvalues.length).toFixed(2)
  let minvalues2 = minvalues.map((k) => {
    return (k - meanMin) ** 2
  })
  let sum = minvalues2.reduce((a, b) => a + b, 0)
  let variance = sum / minvalues2.length
  const stdMin = Math.sqrt(variance).toFixed(2)

  const meanMax = (maxvalues.reduce((a, b) => a + b, 0) / maxvalues.length).toFixed(2)
  let maxvalues2 = maxvalues.map((k) => {
    return (k - meanMax) ** 2
  })
  let sumMax = maxvalues2.reduce((a, b) => a + b, 0)
  let varianceMax = sumMax / maxvalues2.length
  const stdXMax = Math.sqrt(varianceMax).toFixed(2)

  // EXPORT DATA TO CSV

  let csvData = []
  let squatcount = data[data.length - 1].counter

  data.slice(0,squatcount).map((csvobj) => { //discard last index = not finished squat
  return csvData.push(csvobj)
  })
 
  // console.log('csvdata', csvData)

 

  const headers = [
    { label: 'Leg', key: 'leg' },
    { label: 'Squats', key: 'counter' },
    { label: 'Anglevalues', key: 'angle' }, 
    { label: 'Data0x', key: 'data.0.x' }, 
    { label: 'Data0y', key: 'data.0.y' }, 
    { label: 'Data0z', key: 'data.0.z' }, 
    { label: 'Data1x', key: 'data.1.x' }, 
    { label: 'Data1y', key: 'data.1.y' }, 
    { label: 'Data1z', key: 'data.1.z' }, 
    { label: 'Data2x', key: 'data.2.x' }, 
    { label: 'Data2y', key: 'data.2.y' }, 
    { label: 'Data2z', key: 'data.2.z' }, 
    { label: 'Data3x', key: 'data.3.x' }, 
    { label: 'Data3y', key: 'data.3.y' }, 
    { label: 'Data3z', key: 'data.3.z' }, 
  ]

  const csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: sdata
  }

  return (

    <div>
    <table className='data-table'>
    <tbody>
      <tr>
        <th scope="row">Leg</th>
        <td>{data[0].leg}</td>

      </tr>
      <tr>
        <th scope="row">Rounds</th>
        <td>{squatcount}</td>
      </tr>
      <tr>
        <th scope="row">Mean Max Valgus </th>
        <td>{meanMin}</td>
      </tr>
      <tr>
        <th scope="row">Standard deviation</th>
        <td>{stdMin}</td>
      </tr>
      <tr>
        <th scope="row">Mean Max Varus</th>
        <td>{meanMax}</td>
      </tr>
      <tr>
        <th scope="row">Standard deviation</th>
        <td>{stdXMax}</td>
      </tr>
      </tbody>
     </table>
      <div className='csv-link'>
        <CSVLink{...csvReport}>Export to CSV</CSVLink>
       </div>
    </div>
  )
}

export default Datatable
