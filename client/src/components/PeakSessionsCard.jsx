// src/components/PeakSessionsCard.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PeakSessionsCard = () => {
  // Fake data: total sessions per day
  const data = [
    { day: "Mon", sessions: 8 },
    { day: "Tue", sessions: 12 },
    { day: "Wed", sessions: 5 },
    { day: "Thu", sessions: 15 },
    { day: "Fri", sessions: 10 },
    { day: "Sat", sessions: 7 },
    { day: "Sun", sessions: 3 },
  ];

  return (
    <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-semibold mb-4">Peak Days & Hours</h3>

      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis dataKey="day" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip contentStyle={{ backgroundColor: "#333", borderRadius: "5px", color: "#fff" }} />
            <Bar dataKey="sessions" fill="#ffffff" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeakSessionsCard;
