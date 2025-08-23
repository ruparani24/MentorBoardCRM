// src/pages/Mentees.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MenteeView from "../components/MenteeView"; // Can reuse same view component if generic

const API = `${import.meta.env.VITE_API_URL}/api/mentees`;

const Mentees = () => {
  const [mentees, setMentees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    mentorAssigned: "",
    yearLevel: "",
    interests: "",
    availability: "",
  });
  const [selectedMentee, setSelectedMentee] = useState(null);

  // When clicking View button in table
  const handleView = (mentee) => {
    setSelectedMentee(mentee);
  };

  // fetch mentees
  const fetchMentees = async () => {
    try {
      const res = await axios.get(API);
      setMentees(res.data || []);
      // keep header checkbox in sync
      setSelectAll(res.data?.length > 0 && selected.length === res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMentees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // input change
  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // save (add)
  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.post(API, formData);
      setShowModal(false);
      setFormData({
        fullName: "",
        email: "",
        department: "",
        mentorAssigned: "",
        yearLevel: "",
        interests: "",
        availability: "",
      });
      await fetchMentees(); // refresh from DB
    } catch (err) {
      console.error(err);
      alert("Failed to add mentee");
    } finally {
      setSaving(false);
    }
  };

  // select single
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected(mentees.map((m) => m._id || m.id));
      setSelectAll(true);
    }
  };

  // DELETE selected
  const handleDelete = async () => {
    if (selected.length === 0) {
      window.alert("⚠️ Please select at least one mentee to delete.");
      return;
    }

    const ok = window.confirm(
      `Are you sure you want to delete ${selected.length} mentee(s)?`
    );
    if (!ok) return;

    try {
      await axios.delete(API, { data: { ids: selected } });

      setMentees((prev) =>
        prev.filter((m) => !selected.includes(m._id || m.id))
      );

      setSelected([]);
      setSelectAll(false);

      await fetchMentees();
    } catch (err) {
      console.error(err);
      alert("Delete failed. Check the server logs and try again.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Mentees List</h1>
        <div className="space-x-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Email ID</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Mentor Assigned</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Interests</th>
              <th className="px-4 py-2 text-left">Availability</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mentees.map((mentee) => {
              const key = mentee._id || mentee.id || mentee.email;
              const id = mentee._id || mentee.id;
              return (
                <tr key={key}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(id)}
                      onChange={() => handleSelect(id)}
                    />
                  </td>
                  <td className="px-4 py-2">{mentee.fullName || mentee.name}</td>
                  <td className="px-4 py-2">{mentee.email}</td>
                  <td className="px-4 py-2">{mentee.department}</td>
                  <td className="px-4 py-2">{mentee.mentorAssigned}</td>
                  <td className="px-4 py-2">{mentee.yearLevel}</td>
                  <td className="px-4 py-2">{mentee.interests}</td>
                  <td className="px-4 py-2">{mentee.availability}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleView(mentee)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
            <MenteeView
              mentor={selectedMentee}
              onClose={() => setSelectedMentee(null)}
            />
          </tbody>
        </table>
      </div>

      {/* Add Mentee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Add New Mentee</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
                disabled={saving}
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Mentor Assigned</label>
                <input
                  type="text"
                  name="mentorAssigned"
                  value={formData.mentorAssigned}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Year</label>
                <input
                  type="text"
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="1st Year"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Interests</label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="AI / Web / Cloud"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  <option>Morning</option>
                  <option>Evening</option>
                  <option>Weekends</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination (static for now) */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Rows per page:
          <select className="ml-2 border rounded px-2 py-1" defaultValue="10">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded">‹</button>
          <button className="px-3 py-1 border rounded">›</button>
        </div>
      </div>
    </div>
  );
};

export default Mentees;
