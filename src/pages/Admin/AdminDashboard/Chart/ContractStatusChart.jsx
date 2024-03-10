import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

import { getContractStatus } from "../../../../constants/apiStatistic";
const COLORS = ["#de6e56", "#a7d5ed", "#a4a2a8"];


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight="600">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Quantity: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function ContractStatusChart() {
    const [data, setData] = useState([]);
    const [timePeriod, setTimePeriod] = useState(1); 
    const [year, setYear] = useState(2024);
  
    const fetchData = async () => {
      try {
        const res = await getContractStatus({ timePeriod, year });
  
        if (res.isSuccess && res.result && res.result.data) {
          const formattedData = Object.entries(res.result.data).map(
            ([name, value], index) => ({
              name,
              value,
            })
          );
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
    const [activeIndex, setActiveIndex] = useState(0);
  
    const onPieEnter = (_, index) => {
      setActiveIndex(index);
    };
  
    return (
      <div>
        <div className="text-right mx-4 my-2">
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
        <PieChart width={550} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
         {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}</Pie>
        </PieChart>
      </div>
    );
  
}

export default ContractStatusChart;
