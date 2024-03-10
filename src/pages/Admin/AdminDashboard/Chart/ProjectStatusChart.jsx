import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {getProjectStatus} from "../../../../constants/apiStatistic"
const COLORS = ['#a6d75b', '#63bff0', '#edbf33', '#FF8042'];

const ProjectStatusChart = () => {
  const [data, setData] = useState([]);
  const [timePeriod, setTimePeriod] = useState(1); // Default to "this week"
  const [year, setYear] = useState(2024);

  const fetchData = async () => {
    try {
      const res = await getProjectStatus({ timePeriod, year });

      if (res.isSuccess && res.result && res.result.data) {
        const formattedData = Object.entries(res.result.data).map(([name, value], index) => ({
          name,
          value,
        }));
        setData(formattedData);
      } else {
        console.error("Error fetching data: Invalid response structure");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timePeriod, year]);

  const handleSelectChange = (event) => {
    setTimePeriod(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <div className="text-right mx-4 mt-2">
        <select
          value={timePeriod}
          onChange={handleSelectChange}
          style={{ border: "1px solid gray", borderRadius: "5px" }}
        >
          <option value={1}>This Week</option>
          <option value={2}>This Month</option>
          <option value={4}>This Year</option>
        </select>
      </div>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            index,
          }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

           
            return (
              <text
                x={x}
                y={y}
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {`${(percent * 100).toFixed(2)}%`}
              </text>
            );
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      <div className="py-4">
        <div className="grid grid-cols-1 mt-2 mx-8 ">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div
                className="h-[10px] w-[10px]"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <div className="ml-2 text-sm">{entry.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusChart;