import { useState, useEffect, useRef } from 'react'

const Datatable = ({ data }) => {
  const [sdata, setData] = useState(data);
  const angleValues = useRef(null)

  useEffect(() => {
    setData(data);
  }, [data]);

  // console.log('datan koko', sdata.length)
  // console.log('datatablen data', sdata)
  // console.log('datatablen counter', sdata[sdata.length - 1].counter)
  // console.log('angle', sdata[0].angle)
  // console.log('leg', sdata[0].leg)

  angleValues.current = []

  for (let i = 0; i < sdata.length; i++) {
    angleValues.current.push(sdata[i].angle)
  }

  // console.log('angelvalues', angleValues.current)

  // console.log(angleValues.current[0], angleValues.current.length)
  const minX = Math.min.apply(Math, angleValues.current).toFixed(2)
  // console.log('min', minX)
  const maxX = Math.max.apply(Math, angleValues.current).toFixed(2)
  // console.log('max', maxX)
  const meanX = (angleValues.current.reduce((a, b) => a + b, 0) / angleValues.current.length).toFixed(2)
  // console.log('mean', meanX)
  angleValues.current = angleValues.current.map((k) => {
    return (k - meanX) ** 2
  })

  let sum = angleValues.current.reduce((a, b) => a + b, 0)
  let variance = sum / angleValues.current.length
  const stdX = Math.sqrt(variance).toFixed(2)
  // console.log('std', stdX)

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
    </table>
  )
}

export default Datatable
