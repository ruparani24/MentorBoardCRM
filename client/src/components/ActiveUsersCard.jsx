// src/components/ActiveUsersCard.jsx
import React from "react";
import { UserCheck, UserX } from "lucide-react";

const ActiveUsersCard = () => {
  // Fake data
  const data = {
    mentors: { active: 12, inactive: 3 },
    mentees: { active: 30, inactive: 5 },
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-semibold mb-4">Active vs Inactive Users (Last Week)</h3>

      {/* Mentors */}
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Mentors</h4>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <UserCheck size={24} className="text-green-300" />
            <span>Active: {data.mentors.active}</span>
          </div>
          <div className="flex items-center space-x-2">
            <UserX size={24} className="text-red-300" />
            <span>Inactive: {data.mentors.inactive}</span>
          </div>
        </div>
      </div>

      {/* Mentees */}
      <div>
        <h4 className="font-medium text-sm mb-2">Mentees</h4>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <UserCheck size={24} className="text-green-300" />
            <span>Active: {data.mentees.active}</span>
          </div>
          <div className="flex items-center space-x-2">
            <UserX size={24} className="text-red-300" />
            <span>Inactive: {data.mentees.inactive}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersCard;
