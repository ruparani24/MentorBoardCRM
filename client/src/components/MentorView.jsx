// src/components/MentorViewModal.jsx
import { X } from "lucide-react";

export default function MentorViewModal({ mentor, onClose }) {
  if (!mentor) return null;

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
        <h2 className="text-xl font-bold mb-4">{mentor.name}</h2>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <p><strong>Email:</strong> {mentor.email}</p>
          <p><strong>Expertise:</strong> {mentor.expertise}</p>
          <p><strong>Department:</strong> {mentor.department}</p>
          <p><strong>Experience:</strong> {mentor.experience}</p>
          <p><strong>Availability:</strong> {mentor.availability}</p>
          <p><strong>Contact Info:</strong> {mentor.contactInfo || "N/A"}</p>
          <p><strong>LinkedIn:</strong> {mentor.linkedIn || "N/A"}</p>
          <p><strong>Description:</strong> {mentor.description || "N/A"}</p>
          <p><strong>Languages:</strong> {mentor.languages?.join(", ") || "N/A"}</p>
          <p><strong>Meeting Mode:</strong> {mentor.meetingMode || "N/A"}</p>
          <p><strong>Capacity:</strong> {mentor.capacityAvailable}/{mentor.capacityTotal}</p>
          <p><strong>Date Joined:</strong> {new Date(mentor.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
