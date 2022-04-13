import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ReferenceLine } from 'recharts';
import { useEffect, useState } from 'react';

let dataset = { counter: '1', x: 0.37032198905944824, y: 0.5510018467903137, z: 0.00781952962 }

const Stats = ({ data }) => {
  const [sdata, setData] = useState(data);
  useEffect(() => {
    setData(data);
  }, [data]);

  if (sdata !== null) {
    dataset = sdata
  }

  console.log('stats', data)

  return (
    <div>
      <LineChart width={600} height={700} data={dataset}
        margin={{ top: 5, right: 20, left: 20, bottom: 10 }}>
        <XAxis dataKey='counter' />
        <YAxis domain={[-50, 50]} allowDataOverflow={true} ticks={[-50, -45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]} />
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
          name='knee angle'
          type='monotone'
          dataKey='angle'
          dot={false}
          stroke='#a340d9'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  )
}

export default Stats;