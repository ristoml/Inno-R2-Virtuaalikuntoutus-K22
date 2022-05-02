import { useState, useEffect} from 'react'
import { CSVLink } from "react-csv"

//draws the data table and exports data to CSV file

const Datatable = ({ data }) => {
  const [sdata, setData] = useState(data)

  useEffect(() => {
    setData(data)
  }, [data])

  // SEPARATE angle values for calculation

  let temparray = []
  let splitAnglevalues = []

  let counterNow = 0
  
  //map anglevalues per squat for calculation
  data.data.map((dataobj) => {
    splitAnglevalues[dataobj.counter] = temparray
    if(counterNow === dataobj.counter-1){
      counterNow = dataobj.counter
      temparray = []
    }
    temparray.push(dataobj.angle)
    return ''
  })

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
 
  //mean Valgus from neutral to inteior position
  const meanMin= (minvalues.reduce((a, b) => a + b, 0) / minvalues.length).toFixed(2)
  let minvalues2 = minvalues.map((k) => {
    return (k - meanMin) ** 2
  })

  //standard deviation valgus
  let sum = minvalues2.reduce((a, b) => a + b, 0)
  let variance = sum / minvalues2.length
  const stdValgus = Math.sqrt(variance).toFixed(2)

  // mean varus from neutral to exterior
  const meanMax = (maxvalues.reduce((a, b) => a + b, 0) / maxvalues.length).toFixed(2)
  let maxvalues2 = maxvalues.map((k) => {
    return (k - meanMax) ** 2
  })
  //standard deviation varus
  let sumMax = maxvalues2.reduce((a, b) => a + b, 0)
  let varianceMax = sumMax / maxvalues2.length
  const stdVarus = Math.sqrt(varianceMax).toFixed(2)

  // EXPORT DATA TO CSV

  let csvData = []

    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].counter < data.data[data.data.length-1].counter){
       csvData.push({id: data.id,
         name: data.client, 
         date: data.date,
         leg: data.data[i].leg,
         counter: data.data[i].counter,
         meanMaxValgus: meanMin,
         maxValgusStd: stdValgus,
         meanMaxVarus: meanMax,
         maxVarusStd: stdVarus,
         angle: data.data[i].angle, 
         hip_0_x: data.data[i].data[0].x,
         hip_0_y: data.data[i].data[0].y,
         hip_0_z: data.data[i].data[0].z,
         hip_1_x: data.data[i].data[1].x,
         hip_1_y: data.data[i].data[1].y,
         hip_1_z: data.data[i].data[1].z,
         knee_x: data.data[i].data[2].x,
         knee_y: data.data[i].data[2].y,
         knee_z: data.data[i].data[2].z,
         ankle_x: data.data[i].data[3].x,
         ankle_y: data.data[i].data[3].y,
         ankle_z: data.data[i].data[3].z,
       })
     } 
    }

  const headers = [
    { label: 'Id', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Date', key: 'date' },
    { label: 'Leg', key: 'leg' },
    { label: 'Squats', key: 'counter' },
    { label: 'Mean_Max_Valgus', key:'meanMaxValgus'},
    { label: 'std_valgus', key:'maxValgusStd'},
    { label: 'Mean_Max_Varus', key:'meanMaxVarus'},
    { label: 'std_varus', key:'maxVarusStd'},
    { label: 'Anglevalues', key: 'angle' }, 
    { label: 'Hip_0_x', key: 'hip_0_x' }, 
    { label: 'Hip_0_y', key: 'hip_0_y' }, 
    { label: 'Hip_0_z', key: 'hip_0_z' }, 
    { label: 'Hip_1_x', key: 'hip_1_x' }, 
    { label: 'Hip_1_y', key: 'hip_1_y' }, 
    { label: 'Hip_1_z', key: 'hip_1_z' },
    { label: 'Knee_x', key: 'knee_x' }, 
    { label: 'Knee_y', key: 'knee_y' }, 
    { label: 'Knee_z', key: 'knee_z' }, 
    { label: 'Ankle_x', key: 'ankle_x' }, 
    { label: 'Ankle_y', key: 'ankle_y' }, 
    { label: 'Ankle_z', key: 'ankle_z' }
  ]

  const csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: csvData
  }
 
  return (

    <div>
    <table className='data-table'>
    <tbody>
      <tr>
        <th scope="row">Leg</th>
        <td>{csvData[0].leg}</td>

      </tr>
      <tr>
        <th scope="row">Rounds</th>
        <td>{data.data[data.data.length-1].counter}</td>
      </tr>
      <tr>
        <th scope="row">Mean Max Valgus </th>
        <td>{meanMin}</td>
      </tr>
      <tr>
        <th scope="row">Standard deviation</th>
        <td>{stdValgus}</td>
      </tr>
      <tr>
        <th scope="row">Mean Max Varus</th>
        <td>{meanMax}</td>
      </tr>
      <tr>
        <th scope="row">Standard deviation</th>
        <td>{stdVarus}</td>
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
