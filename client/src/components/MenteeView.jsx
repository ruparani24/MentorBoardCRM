// src/components/MenteeViewModal.jsx
import { X } from "lucide-react";

export default function MenteeViewModal({ mentee, onClose }) {
  if (!mentee) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[450px] p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-4">{mentee.fullName}</h2>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <p><strong>Email:</strong> {mentee.email}</p>
          <p><strong>Department / Class:</strong> {mentee.department}</p>
          <p><strong>Mentor Assigned:</strong> {mentee.mentorAssigned || "N/A"}</p>
          <p><strong>Year / Level:</strong> {mentee.yearLevel || "N/A"}</p>
          <p><strong>Interests:</strong> {mentee.interests?.join(", ") || "N/A"}</p>
          <p><strong>Availability:</strong> {mentee.availability || "N/A"}</p>

          {/* Optional fields */}
          <p><strong>Contact Info:</strong> {mentee.contactInfo || "N/A"}</p>
          <p><strong>LinkedIn:</strong> {mentee.linkedIn || "N/A"}</p>
          <p><strong>Description:</strong> {mentee.description || "N/A"}</p>
          <p><strong>Languages:</strong> {mentee.languages?.join(", ") || "N/A"}</p>
          <p><strong>Meeting Mode:</strong> {mentee.meetingMode || "N/A"}</p>
          <p><strong>Date Joined:</strong> {new Date(mentee.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
