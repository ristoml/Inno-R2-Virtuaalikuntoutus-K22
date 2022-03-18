import { useState } from 'react'

const Datatable = ({ squatData }) => {

  // leta x = [dataset.name[0], dataset.name[1], dataset.name[2], dataset.name[3]]
  let arrayx = squatData
  if (squatData === null) {
   arrayx = [0, 1, 2]
  }

  // let x = props.returnedData
  console.log(arrayx[0], arrayx.length)
  const minX = Math.min(arrayx[0], arrayx.length)
  console.log(minX)
  const maxX = Math.max(arrayx[0], arrayx.length)
  console.log(maxX)
  const meanX = arrayx.reduce((a, b) => a + b, 0) / arrayx.length
  console.log(meanX)
  arrayx = arrayx.map((k) => {
    return (k - meanX) ** 2
  })
  let sum = arrayx.reduce((a, b) => a + b, 0)
  let variance = sum / arrayx.length
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
        {Object.keys(state[0]).map((key) => (
          <th>{key}</th>
        ))}
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