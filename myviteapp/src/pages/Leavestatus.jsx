// LeaveList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Leavestatus = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leaves");
        setLeaves(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

 

  return (
    <Layout>
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-2xl font-bold mb-6">All Leave Requests</h2>
        {leaves.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Employee ID</th>
                  <th className="border px-4 py-2">Leave Type</th>
                  <th className="border px-4 py-2">Start Date</th>
                  <th className="border px-4 py-2">End Date</th>
                  <th className="border px-4 py-2">Reason</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{leave.employeeId}</td>
                    <td className="border px-4 py-2">{leave.leaveType}</td>
                    <td className="border px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{leave.reason}</td>
                    <td className="border px-4 py-2">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Leavestatus;
