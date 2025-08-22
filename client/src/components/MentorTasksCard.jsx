// src/components/MentorTasksCard.jsx
import React from "react";

const MentorTasksCard = () => {
  // fake data
  const totalTasks = 20;
  const completedTasks = 14;
  const percent = (completedTasks / totalTasks) * 100;

  return (
    <div className="p-6 rounded-2xl shadow-md text-white bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 
      transition-transform duration-300 hover:scale-105">
      <h2 className="text-lg font-semibold mb-6">Mentor-Assigned Tasks Completed</h2>

      <div className="flex flex-col items-center">
        {/* Circular progress */}
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="url(#grad)"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 54}
              strokeDashoffset={
                2 * Math.PI * 54 - (2 * Math.PI * 54 * percent) / 100
              }
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#00FF88" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {completedTasks}/{totalTasks}
          </div>
        </div>

        {/* Text below */}
        <p className="text-sm">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>
    </div>
  );
};

export default MentorTasksCard;
