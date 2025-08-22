// src/components/SessionsByTypeCard.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SessionTypeCard = () => {
  // fake data
  const data = [
    { name: "Online", value: 45 },
    { name: "Offline", value: 30 },
    { name: "Hybrid", value: 25 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"]; // blue, green, yellow

  return (
    <div className="p-6 rounded-2xl shadow-md text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
      transition-transform duration-300 hover:scale-105">
      
      <h2 className="text-lg font-semibold mb-6">Sessions by Type</h2>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SessionTypeCard;
