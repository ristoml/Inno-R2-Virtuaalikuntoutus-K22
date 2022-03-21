import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let dataset = { counter: '1', x: 0.37032198905944824, y: 0.5510018467903137, z: 0.00781952962 }

const Stats = ({ data }) => {

    
     if (data !== null) {
          dataset = data
     }

     console.log('stats', dataset)

     
    

 
     
     return (
          <div>
          <LineChart width={320} height={180} data={dataset}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <XAxis dataKey="counter" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend verticalAlign="top" height={36}/>
               <Line name="hip 0 x" type="monotone" dataKey="data.1.x" stroke="#CDB4D8" activeDot={{ r: 8 }} />
               <Line name="hip 0 y" type="monotone" dataKey="data.1.y" stroke="#FFAFCC" />
               <Line name="hip  0 z" type="monotone" dataKey="data.1.z" stroke="#BDE0FE" />
          </LineChart>
          <LineChart width={320} height={180} data={dataset}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <XAxis dataKey="counter" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend verticalAlign="top" height={36}/>
               <Line name="hip 1 x" type="monotone" dataKey="data.1.x" stroke="#CDB4D8" activeDot={{ r: 8 }} />
               <Line name="hip 1 y" type="monotone" dataKey="data.1.y" stroke="#FFAFCC" />
               <Line name="hip 1 z" type="monotone" dataKey="data.1.z" stroke="#BDE0FE" />
          </LineChart>
          <LineChart width={320} height={180} data={dataset}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <XAxis dataKey="counter" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend verticalAlign="top" height={36}/>
               <Line name="knee x" type="monotone" dataKey="data.2.x" stroke="#CDB4D8" activeDot={{ r: 8 }} />
               <Line name="knee y" type="monotone" dataKey="data.2.y" stroke="#FFAFCC" />
               <Line name="knee z" type="monotone" dataKey="data.2.z" stroke="#BDE0FE" />
          </LineChart>
          <LineChart width={320} height={180} data={dataset}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <XAxis dataKey="counter" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend verticalAlign="top" height={36}/>
               <Line name="angle x" type="monotone" dataKey="data.3.x" stroke="#CDB4D8" activeDot={{ r: 8 }}/>
               <Line name="angle y" type="monotone" dataKey="data.3.y" stroke="#FFAFCC" />
               <Line name="angle z" type="monotone" dataKey="data.3.z" stroke="#BDE0FE" />
          </LineChart>
           <LineChart width={640} height={360} data={dataset}
               margin={{ top: 5, right: 20, left: 20, bottom: 10 }}>
               <XAxis dataKey="counter" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend verticalAlign="top" height={50}/>
               <Line name="knee angle" type="monotone" dataKey="angle" stroke="#E040FB" activeDot={{ r: 8 }}/>
               {/* <Line name="ancle y" type="monotone" dataKey="data.3.y" stroke="#FFAFCC" />
               <Line name="ancle z" type="monotone" dataKey="data.3.z" stroke="#BDE0FE" /> */}
          </LineChart>
          
         </div>

     );
}

export default Stats;