import { useState, useEffect } from "react";
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

const data = [
  {
    name: "Jan",
    restoration: 12000,
    cleaning: 8500,
    damageRepair: 6000,
  },
  {
    name: "Feb",
    restoration: 15000,
    cleaning: 10000,
    damageRepair: 7500,
  },
  {
    name: "Mar",
    restoration: 18000,
    cleaning: 12000,
    damageRepair: 9000,
  },
  {
    name: "Apr",
    restoration: 21000,
    cleaning: 14000,
    damageRepair: 10500,
  },
  {
    name: "May",
    restoration: 24000,
    cleaning: 16000,
    damageRepair: 12000,
  },
  {
    name: "Jun",
    restoration: 27000,
    cleaning: 18000,
    damageRepair: 13500,
  },
];

export default function SalesChart() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={width}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="restoration" fill="#8884d8" />
        <Bar dataKey="cleaning" fill="#82ca9d" />
        <Bar dataKey="damageRepair" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
}
