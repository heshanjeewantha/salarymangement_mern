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
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState({});
  const [error, setError] = useState(null);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/leaves/");
      setLeaves(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch leaves: " + err.message);
      console.error("Error fetching leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      setUpdateLoading(prev => ({ ...prev, [leaveId]: true }));
      setError(null);
      
      console.log('Attempting to update leave:', leaveId, 'to status:', newStatus);
      
      const response = await axios.patch(`http://localhost:5000/api/leaves/${leaveId}`, {
        status: newStatus
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Update response:', response.data);

      // Update the leave in the state immediately
      setLeaves(prevLeaves => 
        prevLeaves.map(leave => 
          leave._id === leaveId ? { ...leave, status: response.data.status } : leave
        )
      );
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      
      if (err.response) {
        // Server responded with error status
        setError(`Failed to update status: ${err.response.status} - ${err.response.data?.error || err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response
        setError("Failed to update status: No response from server. Make sure the backend is running on http://localhost:5000");
      } else {
        // Something else happened
        setError("Failed to update status: " + err.message);
      }
      
      // Refresh the list to ensure consistency
      fetchLeaves();
    } finally {
      setUpdateLoading(prev => ({ ...prev, [leaveId]: false }));
    }
  };

 

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className='w-full bg-gradient-to-r from-blue-700 to-purple-500 hover:from-blue-800 hover:to-purple-600 text-white p-2 rounded-md'>
          <h2 className="text-center text-2xl font-bold">All Leave Requests</h2>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-4 text-center text-gray-600">Loading leave requests...</div>
        ) : leaves.length === 0 ? (
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
                <div className="relative">
                  <select
                    value={leave.status}
                    onChange={(e) => handleStatusChange(leave._id, e.target.value)}
                    className={`px-3 py-1 text-sm font-medium rounded border ${getStatusColor(leave.status)} ${updateLoading[leave._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={updateLoading[leave._id]}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  {updateLoading[leave._id] && (
                    <span className="absolute right-0 top-0 h-full w-6 flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </div>
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
