import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leavestatus = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('#', { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.error('Error getting data',  e);
      });
  }, []);

  

  if (!data) {
    return <div>Loading or failed to load information</div>;
  }

  const {  leave } = data;

  return (
    <div style={{ padding: '20px' }}>
      
      <h3>MY Leave Requests</h3>
      {leave.length > 0 ? (
        leave.map((l, i) => (
          <div key={i}>
            <p><strong>Employee Id:</strong> {l.employeeId}</p>
            <p><strong>Leave Type:</strong> {m.leaveType}</p>
            <p><strong>Start Date:</strong> {m.startDate}</p>
            <p><strong>End Date:</strong> {m.endDate}</p>
            <p><strong>Reason:</strong> {m.reason}</p>
           <br/>
          </div>
        ))
      ) : (
        <p>No leave requests found.</p>
      )}


      <div style={{ marginTop: '20px' }}>
        <button >Delete</button>
        </div>

    </div>
  );
};

export default Leavestatus;
