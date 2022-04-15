import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ReferenceLine } from 'recharts';
import { useEffect, useState, useRef } from 'react';
import { resampleData } from './Resample';

// let squats = 3 // number of performed squats
let samples = 15 // resample target
let sindexArray = []

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

    for (let i = 0; i < 5; i++) { // fill empty arrays
      sindexArray[i] = []
    }  

    for (let i = 0; i < sdata.length; i++) { // find the number of squats      
      if (sdata[i].counter > squats.current) {
        squats.current = sdata[i].counter
      }
    }
   
    if (discardLastSquat(sdata, squats.current)) squats.current-- // check the number of samples of the last squat and discard it if necessary

    for (let i = 0; i < (squats.current + 1); i++) { // assign and resample the data of individual squats to their own indexes
      for (let j = 0; j < sdata.length; j++) {
        if (sdata[j].counter === i)
          sindexArray[i].push(sdata[j].angle)
      }
      sindexArray[i] = resampleData(sindexArray[i], samples)
    }

    for (let i = squats.current + 1; i < 5; i++) { // fill remaining empty indexes to prevent null pointer
      sindexArray[i] = sindexArray[0]
    }

    for (let i = 0; i < samples; i++) { // create recharts-dataset
      rechartsData.current.push({ sample: i, first: sindexArray[0][i], second: sindexArray[1][i], third: sindexArray[2][i], fourth: sindexArray[3][i], fifth: sindexArray[4][i] })
    }
    
    setRdata(rechartsData.current)

  }, [data, sdata]);


  const discardLastSquat = (array, squat) => {
    let minSamples = 15
    let samples = 0
    for (let i = 0; i < array.length; i++) {
      if (array[i].counter === squat)
        samples++
    }
    return samples < minSamples
  }

  return (
    <div>
      <LineChart width={600} height={380} data={rdata}
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

        <Line
          name='1st'
          type='monotone'
          dataKey='first'
          dot={false}
          stroke='#a340d9'
          activeDot={{ r: 5 }}
        />
        {squats.current >= 1 && (
          <Line
            name='2nd'
            type='monotone'
            dataKey='second'
            dot={false}
            stroke='#2ba14b'
            activeDot={{ r: 5 }}
          />)}
        {squats.current >= 2 && (
          <Line
            name='3rd'
            type='monotone'
            dataKey='third'
            dot={false}
            stroke='#0800ff'
            activeDot={{ r: 5 }}
          />)}
        {squats.current >= 3 && (
          <Line
            name='4th'
            type='monotone'
            dataKey='fourth'
            dot={false}
            stroke='#f5a742'
            activeDot={{ r: 5 }}
          />)}
        {squats.current >= 4 && (
          <Line
            name='5th'
            type='monotone'
            dataKey='fifth'
            dot={false}
            stroke='#00fffb'
            activeDot={{ r: 5 }}
          />)}
      </LineChart>
    </div>
  )
}

export default Stats;