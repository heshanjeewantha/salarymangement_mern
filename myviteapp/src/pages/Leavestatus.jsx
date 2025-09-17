// LeaveList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};


const Leavestatus = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <div className="p-6 bg-gray-50 min-h-screen">
<div className='w-full bg-gradient-to-r from-blue-700 to-purple-500 hover:from-blue-800 hover:to-purple-600 text-white p-2 rounded-md"'>
              <h2 className="text-center text-2xl font-bold">All Leave Requests</h2>
              </div>
  {leaves.length === 0 ? (
    <p className="text-gray-500">No leave requests found.</p>
  ) : (
    <div className="overflow-x-auto shadow-lg rounded-lg mt-8">
      <table className="min-w-full table-auto border-separate border-spacing-0">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Employee ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Leave Type</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Start Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">End Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {leaves.map((leave) => (
            <tr key={leave._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">{leave.employeeId}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{leave.leaveType}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.startDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.endDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{leave.reason}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(leave.status)}`}>
                  {leave.status}
                </span>
              </td>
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
