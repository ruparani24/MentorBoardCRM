// Dashboard.jsx
import React from "react";
import ActiveUsersCard from "../components/ActiveUsersCard";
import TopSessionsCard from "../components/TopSessionsCard";
import PeakSessionsCard from "../components/PeakSessionsCard";
import AverageFeedbackCard from "../components/AverageFeedbackCard";
import MentorTasksCard from "../components/MentorTasksCard";
import SessionTypeCard from "../components/SessionTypeCard"; // ⬅️ import

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveUsersCard />
        <TopSessionsCard />
        <PeakSessionsCard />
        <AverageFeedbackCard />
        <MentorTasksCard />
        <SessionTypeCard /> {/* ⬅️ new card */}
      </div>
    </div>
  );
};

export default Dashboard;
