import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ReferenceLine } from 'recharts';
import { useEffect, useState, useRef } from 'react';
import { resampleData } from './Resample';

let samples = 15 // resample target
let maxSquats = 4 // squat/(array index) numbering starts at 0, so maximum number of allowed squats is this + 1
let sindexArray = []
const lineNames = ['1st', '2nd', '3rd', '4th', '5th']
const dataNames = ['first', 'second', 'third', 'fourth', 'fifth']
const lineColours = ['#a340d9', '#2ba14b', '#0800ff', '#f5a742', '#00fffb']

const Stats = ({ data }) => {
  const [sdata, setData] = useState(data)
  const [rdata, setRdata] = useState({})
  const squats = useRef(0)
  const rechartsData = useRef([]) // array which is built from sindexArray and finally set as rdata 

  useEffect(() => {
    setData(data)
    rechartsData.current = []
    squats.current = 0
    sindexArray = []

    for (let i = 0; i < 5; i++) { // create arrays
      sindexArray[i] = []
    }

    for (let i = 0; i < sdata.length; i++) { // find the number of squats      
      if (sdata[i].counter > squats.current) {
        squats.current = sdata[i].counter
        // console.log('statssquats', squats.current )
      }
    }    

    if (squats.current > maxSquats) squats.current = maxSquats // discard excessive squats

    for (let i = 0; i <= squats.current; i++) { // assign and resample the data of individual squats to their own indexes
      for (let j = 0; j < sdata.length; j++) {
        if (sdata[j].counter === i)
          sindexArray[i].push(sdata[j].angle)
      }
      // console.log('sindexArray', sindexArray)
      sindexArray[i] = resampleData(sindexArray[i], samples)
    }

    for (let i = squats.current + 1; i < 5; i++) { // fill remaining empty indexes to prevent null pointer
      sindexArray[i] = sindexArray[0]
    }

    for (let i = 0; i < samples; i++) { // create recharts-dataset
      rechartsData.current.push({ sample: i, first: sindexArray[0][i], second: sindexArray[1][i], third: sindexArray[2][i], fourth: sindexArray[3][i], fifth: sindexArray[4][i] })
    }

    setRdata(rechartsData.current)
    console.log(squats.current)
    console.log(rechartsData.current)

  }, [data, sdata]);
  

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
            let rows = [];
            for (let i = 0; i < squats.current; i++) {
              rows.push(<Line key={lineNames[i]} 
                name={lineNames[i]}
                type='monotone'
                dataKey={dataNames[i]}
                dot={false}
                stroke={lineColours[i]}
                activeDot={{ r: 5 }} />);
            }
            return rows;
          })()}         
        </LineChart>
      </>)}
    </div>
  )
}

export default Stats;