import { Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';
import { useEffect, useState } from "react";

let dataset = { counter: '1', x: 0.37032198905944824, y: 0.5510018467903137, z: 0.00781952962 }


const Stats = ({ data }) => {
     const [sdata, setData] = useState(data);

     useEffect( () => {
         setData(data);
     }, [data]); 

     if (sdata !== null) {
          dataset = sdata
     }

     console.log('stats', dataset)

     const gradientOffset = () => {
          const dataMax = Math.max(...dataset.map((i) => i.angle));
          const dataMin = Math.min(...dataset.map((i) => i.angle));

          if (dataMax <= 0) {
               return 0
          }
          else if (dataMin >= 0) {
               return 1
          }
          else {
               return dataMax / (dataMax - dataMin);
          }
     }


     const off = gradientOffset();


     return (
          <div>

               <AreaChart width={640} height={360} data={dataset}
                    margin={{ top: 5, right: 20, left: 20, bottom: 10 }}>
                    <XAxis dataKey="counter" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                         formatter={(value) => value.toFixed(2)}
                         wrapperStyle={{ top: -120, left: 150 }}
                    />
                    <defs>
                         <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset={off} stopColor="green" stopOpacity={1} />
                              <stop offset={off} stopColor="red" stopOpacity={1} />
                         </linearGradient>
                    </defs>
                    <Legend verticalAlign="top" height={50} />
                    <Area name="Knee angle" type="monotone" dataKey="angle" stroke="#7700bd" activeDot={{ r: 8 }} />

               </AreaChart>

          </div>

     );
}

export default Stats;