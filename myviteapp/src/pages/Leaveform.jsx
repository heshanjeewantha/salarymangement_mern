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

    const formdata = new FormData();
    formdata.append("employeeId", leave.employeeId);
    formdata.append("leaveType", leave.leaveType);
    formdata.append("startDate", leave.startDate);
    formdata.append("endDate", leave.endDate);
    formdata.append("reason", leave.reason);

    try {
      await axios.post("http://localhost:5000/api/leaves/create", leave);

      alert("successfully submitted!");

    

      setTimeout(() => {
        navigate('/leavestatus');
      }, 3000);

      setleave({
        employeeId: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason:""
      });

    } catch (e) {
      alert("unsuccessfully!");
    }
  };

  return (

    <Layout>

    <div className="bg-white h-screen overflow-y-auto">
      
          <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">

            <div className='w-full bg-gradient-to-r from-blue-700 to-purple-500 hover:from-blue-800 hover:to-purple-600 text-white p-2 rounded-md"'>
              <h2 className="text-center text-2xl font-bold">Employee Leave Application</h2>
              <h6 className="text-center ">submit your leave request for approvel</h6>
            </div>
            

              <form onSubmit={handleSubmit} className="space-y-4 mt-12 " encType="multipart/form-data">

<div className="flex gap-10">
 
  <div className="w-1/2">
    <label className="block text-sm font-medium text-gray-700">
  Employee Id <span className="text-red-500">*</span>
</label>
    <input
      type="text"
      name="employeeId"
      value={leave.employeeId}
      onChange={handleChange}
      className="w-full mt-1 p-2 border rounded-md bg-blue-50"
      placeholder="Enter the employee Id"
      required
    />
  </div>


  <div className="w-1/2">
  <label className="block text-sm font-medium text-gray-700">
    Leave Type <span className="text-red-500">*</span>
  </label>
  <select
    name="leaveType"
    value={leave.leaveType}
    onChange={handleChange}
    className="w-full mt-1 p-2 border rounded-md bg-blue-50"
    required
  >
    <option value=""> Leave Type </option>
    <option value="Sick">Sick</option>
    <option value="Casual">Casual</option>
    <option value="Earned">Earned</option>
    <option value="Maternity">Maternity</option>
    <option value="Paternity">Paternity</option>
    <option value="Unpaid">Unpaid</option>
  </select>
</div>

</div>



<div className="flex gap-10">
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700">Start Date <span className="text-red-500">*</span></label>
    <input
      type="date"
      name="startDate"
      value={leave.startDate}
      onChange={handleChange}
      className="w-full mt-1 p-2 border rounded-md bg-blue-50"
      min={new Date().toISOString().split("T")[0]}
      required
    />
  </div>

 
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700">End Date <span className="text-red-500">*</span></label>
    <input
      type="date"
      name="endDate"
      value={leave.endDate}
      onChange={handleChange}
      className="w-full mt-1 p-2 border rounded-md bg-blue-50"
      min={leave.startDate || new Date().toISOString().split("T")[0]}
      required
    />
  </div>
</div>



 <div>
  <label className="block text-sm font-medium text-gray-700">Reason <span className="text-red-500">*</span></label>
  <textarea
    name="reason"
    value={leave.reason}
    onChange={handleChange}
    className="w-full mt-1 p-2 border rounded-md bg-blue-50"
    placeholder="please provide the reason for leave"
    rows={4} 
    required
  />
</div>

<p className='block text-sm font-small text-gray-700'> 0/500 characters</p>


                <button
  type="submit"
  className="w-full bg-gradient-to-r from-blue-700 to-purple-500 hover:from-blue-800 hover:to-purple-600 text-white p-2 rounded-md mt-8"
>
  Submit 

</button>

              </form>
            </div>
          </div>
        
    </div>

    </Layout>

  );
};

export default Leaveform;
