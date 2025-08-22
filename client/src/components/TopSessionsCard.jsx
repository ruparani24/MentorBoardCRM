// src/components/TopSessionsCard.jsx
import React from "react";
import { User, BarChart2 } from "lucide-react";

const TopSessionsCard = () => {
  // Fake data
  const topMentors = [
    { name: "Alice Johnson", sessions: 12 },
    { name: "Bob Smith", sessions: 9 },
    { name: "Charlie Lee", sessions: 7 },
  ];

  const topMentees = [
    { name: "David Kim", sessions: 8 },
    { name: "Emma Brown", sessions: 6 },
    { name: "Fiona Green", sessions: 5 },
  ];

  return (
    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-semibold mb-4">Top Sessions per Mentor/Mentee</h3>

      {/* Mentors */}
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2 flex items-center">
          <User className="mr-2" /> Mentors
        </h4>
        <div className="space-y-1">
          {topMentors.map((mentor, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span>{mentor.name}</span>
              <span className="font-semibold">{mentor.sessions}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mentees */}
      <div>
        <h4 className="font-medium text-sm mb-2 flex items-center">
          <User className="mr-2" /> Mentees
        </h4>
        <div className="space-y-1">
          {topMentees.map((mentee, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span>{mentee.name}</span>
              <span className="font-semibold">{mentee.sessions}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSessionsCard;
