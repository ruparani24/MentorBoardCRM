// AverageFeedbackCard.jsx
import React from "react";

const AverageFeedbackCard = () => {
  // fake static ratings
  const mentorRating = 4.5;
  const menteeRating = 3.2;

  // helper to convert rating (out of 5) to percentage
  const getPercent = (rating) => (rating / 5) * 100;

  return (
    <div className="p-6 rounded-2xl shadow-md text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 
      transition-transform duration-300 hover:scale-105">
      <h2 className="text-lg font-semibold mb-6">Average Feedback Score</h2>

      {/* Mentors */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Mentors</span>
          <span>{mentorRating} / 5</span>
        </div>
        <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"
            style={{ width: `${getPercent(mentorRating)}%` }}
          />
        </div>
      </div>

      {/* Mentees */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Mentees</span>
          <span>{menteeRating} / 5</span>
        </div>
        <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
            style={{ width: `${getPercent(menteeRating)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AverageFeedbackCard;
