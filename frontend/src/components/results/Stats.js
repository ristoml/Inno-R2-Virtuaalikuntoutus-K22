import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ReferenceLine } from 'recharts';
import { useEffect, useState, useRef } from 'react';
import { resampleData } from './Resample';

// let squats = 3 // number of performed squats
let samples = 15 // resample target

const Stats = ({ data }) => {
  const [sdata, setData] = useState(data)
  const [rdata, setRdata] = useState({})
  const squats = useRef(0)
  const sindexArray = useRef([]) // array for storing individual squats to theiry own indexes and then resampled
  const rechartsData = useRef({}) // array which is built from sindexArray and set as rdata


  useEffect(() => {
    setData(data)
    console.log(sdata)
    rechartsData.current = {}

    for (let i = 0; i < sdata.length; i++) { // find the number of squats      
      if (sdata[i].counter > squats.current) {
        squats.current = sdata[i].counter
      }
    }

    console.log(squats.current)
    if (discardLastSquat(sdata, squats.current)) squats.current--
    console.log(squats.current)

    for (let i = 0; i < squats.current; i++) { // form new 2d array based on no. of squats
      sindexArray.current[i] = []
    }

    for (let i = 0; i < squats.current; i++) { // assign and resample the data of individual squats to their own indexes
      for (let j = 0; j < sdata.length; j++) {
        if (sdata[j].counter === i)
          sindexArray.current[i].push(sdata[j].angle)
      }
      sindexArray.current[i] = resampleData(sindexArray.current[i], samples)
    }
    console.log(sindexArray.current)
    console.log(sindexArray.current[0])

    if (squats.current === 0 && sindexArray.current[0].length>1) {
      console.log('one squat')
      rechartsData.current = sindexArray.current[0].map((x, i) => {
        let res = ({ sample: x, first: sindexArray.current[0][i]});
        return Object.assign(res);
      });
    } else if (squats.current === 1 && sindexArray.current[0].lenght>1&& sindexArray.current[1].lenght>1) {  
      console.log('two squat')
      rechartsData.current = sindexArray.current[0].map((x, i) => {
        let res = ({ sample: x, first: sindexArray.current[0][i], second: sindexArray.current[1][i]});
        return Object.assign(res);
      });
    } else if (squats.current === 2&& sindexArray.current[1].lenght>1&& sindexArray.current[2].lenght>1) {
      console.log('three squat')
      rechartsData.current = sindexArray.current[0].map((x, i) => {
        let res = ({ sample: x, first: sindexArray.current[0][i], second: sindexArray.current[1][i], third: sindexArray.current[2][i]});
        return Object.assign(res);
      });
    } else if (squats.current === 3&& sindexArray.current[0].lenght>1&& sindexArray.current[1].lenght>1&& sindexArray.current[2].lenght>1&& sindexArray.current[3].lenght>1) {
      console.log('four squat')
      rechartsData.current = sindexArray.current[0].map((x, i) => {
        let res = ({ sample: x, first: sindexArray.current[0][i], second: sindexArray.current[1][i], third: sindexArray.current[2][i], fourth: sindexArray.current[3][i]});
        return Object.assign(res);
      });
    }
    

    // rechartsData.current[0] = sindexArray.current[0].map((x, i) => ({
    //   sample: i,
    //   data: x
    // }))
    // for (let i = 1; i < squats.current; i++) {
    //   rechartsData.current[i] = sindexArray.current[i].map((x) => ({
    //    i.toString(): x
    //   }))
    // }
    // for (let i = 0; i < samples; i++) {
    //   rechartsData.current[0] = rechartsData.current[0].map((x)  => ({

    //   }))
    // }
 
      // for (let i = 0; i < samples; i++) {      
      //     rechartsData.current[0] = rechartsData.current[0].concat(rechartsData.current[j])
      //   }  

    
    console.log(rechartsData.current)
    setRdata(rechartsData.current)

    sindexArray.current = emptyArray(sindexArray.current, squats.current)

    squats.current = 0

  }, [data]);

  const emptyArray = (array, amount) => {
    let returnArray = array.slice(0)
    for (let i = 0; i < amount; i++) {
      returnArray.splice(i, 1)
    }
    returnArray = []
    return returnArray
  }

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
        <Line
          name='4th'
          type='monotone'          
          dataKey='fourth'
          dot={false}
          stroke='#0800ff'
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </div>
  )
}

export default Stats;