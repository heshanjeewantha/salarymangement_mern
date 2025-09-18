import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Leaveform = () => {
  const [leave, setleave] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason:""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setleave({
      ...leave,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/leaves/create", leave);
      alert("Successfully submitted!");
      setTimeout(() => navigate('/'), 3000);

      setleave({
        employeeId: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason:""
      });
    } catch (e) {
      alert("Submission failed!");
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <div className="w-full bg-blue-600 text-white p-3 rounded-md mb-6">
            <h2 className="text-center text-2xl font-bold">Employee Leave Application</h2>
            <h6 className="text-center text-sm">Submit your leave request for approval</h6>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-black">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={leave.employeeId}
                  onChange={handleChange}
                  placeholder="Enter the employee ID"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-black">
                  Leave Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="leaveType"
                  value={leave.leaveType}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick">Sick</option>
                  <option value="Casual">Casual</option>
                  <option value="Earned">Earned</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Paternity">Paternity</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-black">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={leave.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-black">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={leave.endDate}
                  onChange={handleChange}
                  min={leave.startDate || new Date().toISOString().split("T")[0]}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                name="reason"
                value={leave.reason}
                onChange={handleChange}
                placeholder="Please provide the reason for leave"
                rows={4}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <p className='text-sm text-black'>0/500 characters</p>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md mt-4 transition"
            >
              Submit
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Leaveform;
