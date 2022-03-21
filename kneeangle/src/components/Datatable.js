import { useState } from 'react'


let arrayx = {0: 0}

const Datatable = ({ data }) => {

   if (data !== null) {
    arrayx = data
  }

  
  console.log('datan koko',arrayx.length)
  console.log('datatablen arrayx', arrayx)
  console.log('datatablen counter', arrayx[arrayx.length-1].counter)
  console.log('angle', arrayx[0].angle)
  console.log('leg', arrayx[0].leg)

  let angleValues = []
 
  for(let i = 0; i < arrayx.length; i++){
         //  xvalues.push(arrayx[i].data[2].x)        
        angleValues.push(180-arrayx[i].angle)
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
  const stdX = Math.sqrt( variance).toFixed(2)
  console.log('std', stdX)

  const tabledata = [
    {
      name:'Leg',
      value: arrayx[0].leg
    },
    {
      name: 'Rounds',
      value: arrayx[arrayx.length-1].counter
    },
    {
      name: 'Minimum',
      value: minX
    },
    {
      name: 'Maximum',
      value: maxX
    },
    {
      name: 'Average',
      value: meanX
    },
    {
      name: 'Standard deviation',
      value: stdX
    },
  ]
  
  const [state, setState] = useState(tabledata)

  return (
      <table>
      <tr key={"header"}>
      </tr>
      {state.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </table>
  )
}

export default Datatable