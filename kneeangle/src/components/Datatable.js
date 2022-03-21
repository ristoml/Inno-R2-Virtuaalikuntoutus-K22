import { useState } from 'react'

let arrayx = {0: 0}
const Datatable = ({ data }) => {

   if (data !== null) {
    arrayx = data
  }

  let xvalues = []
  console.log('eka',arrayx.length)
  console.log('datatablen arrayx', arrayx)
  console.log('datatablen eka 0 ja 0 arvo', arrayx[0].data[0].x)
  console.log('datatablen counter', arrayx[arrayx.length-1].counter)
  console.log('angle', arrayx[0].angle)
  

 
  for(let i = 0; i < arrayx.length; i++){
      for(let j = 0; j < 4; j++){
        //  xvalues.push(arrayx[i].data[2].x)
        xvalues.push(180-arrayx[0].angle)
        }   
      }
  
  
   console.log('xvalues', xvalues)

  console.log(xvalues[0], xvalues.length)
  const minX = Math.min(xvalues[0], xvalues.length)
  console.log(minX)
  const maxX = Math.max(xvalues[0], xvalues.length)
  console.log(maxX)
  const meanX = xvalues.reduce((a, b) => a + b, 0) / xvalues.length
  console.log(meanX)
  xvalues = xvalues.map((k) => {
    return (k - meanX) ** 2
  })
  let sum = xvalues.reduce((a, b) => a + b, 0)
  let variance = sum / xvalues.length
  const stdX = Math.sqrt(variance)
  console.log(stdX)

  const tabledata = [
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
    }
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