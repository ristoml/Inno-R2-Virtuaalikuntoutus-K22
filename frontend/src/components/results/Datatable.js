// import { useState, useEffect, useRef } from 'react'
import { useState, useEffect} from 'react'
import { CSVLink } from "react-csv"


const Datatable = ({ data }) => {
  const [sdata, setData] = useState(data);
  // const angleValues = useRef(null)

  useEffect(() => {
    setData(data);
  }, [data]);

  // console.log('datan koko', sdata.length)
  // console.log('datatablen data', sdata)
  // console.log('datatablen counter', sdata[sdata.length - 1].counter)
  // console.log('angle', sdata[0].angle)
  // console.log('leg', sdata[0].leg)

  // angleValues.current = []
  let angleValues = []

  for (let i = 0; i < sdata.length; i++) {
    // angleValues.current.push(sdata[i].angle)
    angleValues.push(sdata[i].angle)
  }

  console.log('angelvalues', angleValues)

  // console.log(angleValues.current[0], angleValues.current.length)
  // const minX = Math.min.apply(Math, angleValues.current).toFixed(2)
  const minX = Math.min.apply(Math, angleValues).toFixed(2)
  // console.log('min', minX)
  // const maxX = Math.max.apply(Math, angleValues.current).toFixed(2)
  const maxX = Math.max.apply(Math, angleValues).toFixed(2)
  // console.log('max', maxX)
  // const meanX = (angleValues.current.reduce((a, b) => a + b, 0) / angleValues.current.length).toFixed(2)
    // console.log('max', maxX)
    const meanX = (angleValues.reduce((a, b) => a + b, 0) / angleValues.length).toFixed(2)
  // console.log('mean', meanX)
  // angleValues.current = angleValues.current.map((k)
  angleValues = angleValues.map((k) => {
    return (k - meanX) ** 2
  })

  // let sum = angleValues.current.reduce((a, b) => a + b, 0)
  let sum = angleValues.reduce((a, b) => a + b, 0)
  // let variance = sum / angleValues.current.length
  let variance = sum / angleValues.length
  const stdX = Math.sqrt(variance).toFixed(2)
  // console.log('std', stdX)

  const csvData = [
    {
      leg: sdata[0].leg,
      squatted: sdata[sdata.length - 1].counter,
      maxValgus: minX,
      maxVarus: maxX,
      angle: angleValues,
    },

  ]

  const headers = [
    { label: 'Leg', key: 'leg' },
    { label: 'Squats', key: 'squatted' },
    { label: 'MaxValgus', key: 'maxValgus' },
    { label: 'MaxVarus', key: 'maxVarus' },
    { label: 'Anglevalues', key: 'angle' },
  ]

  const csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: csvData
  }

  return (
    <table className='data-table'>
      <tr>
        <th scope="row">Leg</th>
        <td>{sdata[0].leg}</td>

      </tr>
      <tr>
        <th scope="row">Rounds</th>
        <td>{sdata[sdata.length - 1].counter}</td>
      </tr>
      <tr>
        <th scope="row">Max Valgus </th>
        <td>{minX}</td>
      </tr>
      <tr>
        <th scope="row">Max Varus</th>
        <td>{maxX}</td>
      </tr>
      <tr>
        <th scope="row">Average</th>
        <td>{meanX}</td>
      </tr>
      <tr>
        <th scope="row">Standard deviation</th>
        <td>{stdX}</td>
      </tr>
      <div className='csv-link'>
        <CSVLink{...csvReport}>Export to CSV</CSVLink>
      </div>
    </table>
  )
}

export default Datatable
