import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let dataset = { name: '1', x: 0.37032198905944824, y: 0.5510018467903137, z: 0.00781952962 }

const Stats = ({ data }) => {

    
     if (data !== null) {
          dataset = data
     }

     console.log('stats', dataset)
     
     return (
          <div>
          <LineChart width={320} height={180} data={dataset}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <XAxis dataKey="name" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend verticalAlign="top" height={36}/>
               <Line name="hip x" type="monotone" dataKey="data.0.x" stroke="#CDB4D8" activeDot={{ r: 8 }} />
               <Line name="hip y" type="monotone" dataKey="data.0.y" stroke="#FFAFCC" />
               <Line name="hip z" type="monotone" dataKey="data.0.z" stroke="#BDE0FE" />
          </LineChart>
          <LineChart width={320} height={180} data={dataset}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <XAxis dataKey="name" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend verticalAlign="top" height={36}/>
               <Line name="hip x" type="monotone" dataKey="data.1.x" stroke="#CDB4D8" activeDot={{ r: 8 }} />
               <Line name="hip y" type="monotone" dataKey="data.1.y" stroke="#FFAFCC" />
               <Line name="hip z" type="monotone" dataKey="data.1.z" stroke="#BDE0FE" />
          </LineChart>
          <LineChart width={320} height={180} data={dataset}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <XAxis dataKey="name" />
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
               <XAxis dataKey="name" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend verticalAlign="top" height={36}/>
               <Line name="ancle x" type="monotone" dataKey="data.3.x" stroke="#CDB4D8" activeDot={{ r: 8 }}/>
               <Line name="ancle y" type="monotone" dataKey="data.3.y" stroke="#FFAFCC" />
               <Line name="ancle z" type="monotone" dataKey="data.3.z" stroke="#BDE0FE" />
          </LineChart>
          
         </div>

     );
}

export default Stats;