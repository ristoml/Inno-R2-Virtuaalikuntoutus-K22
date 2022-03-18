import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



const Stats = ({squatData}) => {

     let dataset = squatData
     if (dataset === null) {
          dataset = {name: '1', x: 0.37032198905944824, y: 0.5510018467903137, z: 0.00781952962}
     }
     //  {name: '1', x: 0.37032198905944824, y: 0.5510018467903137, z: 0.00781952962},
     //  {name: '2', x: 0.37032198905944824, y: 0.5452685952186584, z: -0.00752845034},
     //  {name: '3', x: 0.4978991448879242, y: 0.5854683518409729, z: 0.608402669429779},
     //  {name: '4', x: 0.4865882992744446, y: 0.8281182646751404, z: -0.34381905198},
     //     ];

    console.log(dataset)

   
  
    return (

       <LineChart width={640} height={360} data={dataset}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey="data.0.x" stroke="#CDB4D8" activeDot={{r: 8}}/>
         <Line type="monotone" dataKey="data.0.y" stroke="#FFAFCC" />
         <Line type="monotone" dataKey="data.0.z" stroke="#BDE0FE" />
        </LineChart>
      
      );
}

export default Stats;