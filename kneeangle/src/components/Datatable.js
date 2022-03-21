import { useState } from 'react'

let arrayx = {0: 0}
const Datatable = ({ data }) => {

 

  if (data !== null) {
    arrayx = data
  }

  let xvalues = []
  console.log('datatablen arrayx', arrayx)
  console.log('datatablen eka 0 ja 0 arvo', arrayx[0].data[0].x)
  console.log('datatablen counter', arrayx[0].counter)

  for(let i = 0; i < arrayx.lenght; i++){
      for(let j = 0; j < arrayx.lenght[i]; j++){
        for(let k= 0; k < arrayx.data.lenght[j]; k++){
           xvalues += arrayx[i].data[j].x
        }
       
      }
  }

  console.log('xvalues', xvalues)

  // let x = props.returnedData
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

  // eslint-disable-next-line no-unused-vars
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