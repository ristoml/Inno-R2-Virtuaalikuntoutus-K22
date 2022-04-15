import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ReferenceLine } from 'recharts';
import { useEffect, useState, useRef } from 'react';
import { resampleData } from './Resample';

// let squats = 3 // number of performed squats
let samples = 15 // resample target

const Stats = ({ data }) => {
  const [sdata, setData] = useState(data);
  const squats = useRef(0)
  const sindexArray = useRef(null) // array for storing individual squats to theiry own indexes and then resampled
  const rechartsArray = useRef(null) // array which is built from sindexArray and passed to recharts

  useEffect(() => {   
    setData(data)
    console.log(sdata)
    
    for (let i = 0; i < sdata.length; i++) { // find the number of squats      
      if (sdata[i].counter > squats.current) {
        squats.current = sdata[i].counter
      }
    }
    console.log(squats.current)

    // for (let i = 0; i < squats; i++) { // form new 2d array based on no. of squats
    //   record2[i] = []
    // }

    // for (let i = 0; i < squats; i++) { // assign and resample the data of individual squats to their own indexes
    //   for (let j = 0; j < data.length; j++) {
    //     if (data[j].counter === i)
    //       record2[i].push(data[j].angle)
    //   }
    //   record2[i] = resampleData(record2[i], samples)
    // }    
    // console.log(record2)

    // for (let i = 0; i < samples; i++) { // create recharts-dataset, only works with three squats for now
    //   record3.push({ name: i, first: record2[0][i], second: record2[1][i], third: record2[2][i] })
    // }
    // setData(record3)
  }, [data]);



  return (
    <div>
      <LineChart width={600} height={500} data={sdata}
        margin={{ top: 5, right: 2, left: 2, bottom: 10 }}>
        <XAxis dataKey='name' />
        <YAxis domain={[-30, 30]} allowDataOverflow={true} ticks={[-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30]} />
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
        <Line
          name='1st'
          type='monotone'
          dataKey='first'
          dot={false}
          stroke='#a340d9'
          activeDot={{ r: 5 }}
        />
        <Line
          name='2nd'
          type='monotone'
          dataKey='second'
          dot={false}
          stroke='#2ba14b'
          activeDot={{ r: 5 }}
        />
        <Line
          name='3rd'
          type='monotone'
          dataKey='third'
          dot={false}
          stroke='#0800ff'
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </div>
  )
}

export default Stats;