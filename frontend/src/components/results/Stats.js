/* This component processes the recorded data and then draws it in to a Recharts line chart.
*/
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ReferenceLine } from 'recharts'
import { useEffect, useState, useRef } from 'react'
import { resampleData } from './Resample'

let samples = 15 // resample target
let maxSquats = 9 // squat numbering starts at 0, so maximum number of allowed squats is this + 1
let sIndexArray = []
const lineNames = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']
const dataNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']
const lineColours = ['#a340d9', '#2ba14b', '#0800ff', '#f5a742', '#00fffb', '#a340d9', '#2ba14b', '#0800ff', '#f5a742', '#00fffb'] // fix last 5 colours

const Stats = ({ data }) => {
  const [sdata, setData] = useState(data)
  const [rdata, setRdata] = useState({})
  const squats = useRef(0)
  const rechartsData = useRef([]) // this array contains the final results 

  useEffect(() => {
    setData(data)
    rechartsData.current = []
    squats.current = 0
    sIndexArray = []

    for (let i = 0; i < 10; i++) { // create arrays
      sIndexArray[i] = []
    }

    for (let i = 0; i < sdata.length; i++) { // find the number of total squats      
      if (sdata[i].counter > squats.current) {
        squats.current = sdata[i].counter - 1 //discard the last index because its not a full squat
      }
    }

    if (squats.current > maxSquats) squats.current = maxSquats // discard excessive squats

    for (let i = 0; i <= squats.current; i++) { // assign and resample the data of individual squats to their own indexes
      for (let j = 0; j < sdata.length; j++) {
        if (sdata[j].counter === i)
          sIndexArray[i].push(sdata[j].angle)
      }
      sIndexArray[i] = resampleData(sIndexArray[i], samples)
    }

    for (let i = squats.current + 1; i < maxSquats; i++) { // fill remaining empty indexes to prevent null pointer
      sIndexArray[i] = sIndexArray[0]
    }

    for (let i = 0; i < samples; i++) { // create recharts-dataset
      rechartsData.current.push({ sample: i, first: sIndexArray[0][i], second: sIndexArray[1][i], third: sIndexArray[2][i], fourth: sIndexArray[3][i], fifth: sIndexArray[4][i], sixth: sIndexArray[5][i], seventh: sIndexArray[6][i], eighth: sIndexArray[7][i], ninth: sIndexArray[8][i], tenth: sIndexArray[9][i] })
    }

    setRdata(rechartsData.current)
  }, [data, sdata])

  return (
    <div>
      {rechartsData.current && (<>
        <LineChart width={590} height={380} data={rdata}
          margin={{ top: 5, right: 2, left: 2, bottom: 10 }}>
          <XAxis dataKey='sample' />
          <YAxis domain={[-25, 25]} allowDataOverflow={true} ticks={[-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25]} />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip
            formatter={(value) => value.toFixed(2)}
            wrapperStyle={{ top: -120, left: 150 }}
          />
          <ReferenceLine
            stroke='red'
            strokeWidth={2}
            y={-10}
          />
          <ReferenceLine
            stroke='red'
            strokeWidth={2}
            y={10}
          />
          <Legend verticalAlign='top' height={50} />
          {(() => {
            let rows = []
            for (let i = 0; i <= squats.current; i++) { // form the LineCharts-elements based on the number of performed squats
              rows.push(<Line key={lineNames[i]}
                name={lineNames[i]}
                type='monotone'
                dataKey={dataNames[i]}
                dot={false}
                stroke={lineColours[i]}
                activeDot={{ r: 5 }} />)
            }
            return rows
          })()}
        </LineChart>
      </>)}
    </div>
  )
}

export default Stats