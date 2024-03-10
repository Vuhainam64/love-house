import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getProject } from "../../../../constants/apiStatistic";

function ProjectBarChart() {
  const [data, setData] = useState([]);
  const [timePeriod, setTimePeriod] = useState(1); // Default to "this week"
  const [year, setYear] = useState(2024);

  const fetchData = async () => {
    try {
      const res = await getProject({ timePeriod, year });

      if (res.isSuccess && res.result && res.result.data) {
        const apiData = res.result.data;
        const allMonths = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const formattedData = allMonths.map((month) => ({
          label: month,
          projects: apiData[month] || 0, // Use 0 as the default value if data is missing
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
    setYear(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <div className="text-right mr-6 mt-2">
        <select
          value={year}
          onChange={handleSelectChange}
          style={{ border: "1px solid gray", borderRadius: "5px" }}
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>

      <div className="">
        {data.length !== 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={700}
              height={220}
              data={data}
              margin={{
                top: 25,
                right: 40,
                bottom: 5,
              }}
              barSize={18}
            >
              <XAxis
                dataKey="label"
                scale="point"
                tickCount={data.length}
                interval={0}
                margin={{ right: 4 }}
                fontSize={10}
              />
              <YAxis tickCount={5} interval={0} />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="projects"
                fill="#a7d5ed"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectBarChart;
