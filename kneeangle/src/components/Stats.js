import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let dataset = { name: '1', x: 0.37032198905944824, y: 0.5510018467903137, z: 0.00781952962 }

const Stats = ({ data }) => {

     if (data !== null) {
          dataset = data
     }
    
     console.log(dataset)

     return (

          <LineChart width={640} height={360} data={dataset}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <XAxis dataKey="name" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend />
               <Line type="monotone" dataKey="data.0.x" stroke="#CDB4D8" activeDot={{ r: 8 }} />
               <Line type="monotone" dataKey="data.0.y" stroke="#FFAFCC" />
               <Line type="monotone" dataKey="data.0.z" stroke="#BDE0FE" />
          </LineChart>

     );
}

export default Stats;