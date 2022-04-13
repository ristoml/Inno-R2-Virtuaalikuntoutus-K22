import { useState, useEffect } from 'react'


let arrayx = { 0: 0 }

const Datatable = ({ data }) => {
  const [sdata, setData] = useState(data);

  useEffect(() => {
    setData(data);
  }, [data]);

  if (sdata) {
    arrayx = sdata
  }


  console.log('datan koko', arrayx.length)
  console.log('datatablen arrayx', arrayx)
  console.log('datatablen counter', arrayx[arrayx.length - 1].counter)
  console.log('angle', arrayx[0].angle)
  console.log('leg', arrayx[0].leg)


let angleValues = []

  for (let i = 0; i < arrayx.length; i++) {
    //  xvalues.push(arrayx[i].data[2].x)        
    angleValues.push(arrayx[i].angle)
  }


  console.log('angelvalues', angleValues)



  console.log(angleValues[0], angleValues.length)
  const minX = Math.min.apply(Math, angleValues).toFixed(2)
  console.log('min', minX)
  const maxX = Math.max.apply(Math, angleValues).toFixed(2)
  console.log('max', maxX)
  const meanX = (angleValues.reduce((a, b) => a + b, 0) / angleValues.length).toFixed(2)
  console.log('mean', meanX)
  angleValues = angleValues.map((k) => {
    return (k - meanX) ** 2
  })
  let sum = angleValues.reduce((a, b) => a + b, 0)
  let variance = sum / angleValues.length
  const stdX = Math.sqrt(variance).toFixed(2)
  console.log('std', stdX)

   return (
    <table className='data-table'>
    
    <tr>
        <th scope="row">Leg</th>
        <td>{arrayx[0].leg}</td>
        
    </tr>
    <tr>
        <th scope="row">Rounds</th>
        <td>{arrayx[arrayx.length - 1].counter}</td>
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
