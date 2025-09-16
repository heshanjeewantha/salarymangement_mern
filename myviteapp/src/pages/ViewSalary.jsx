import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewSalary = () => {
  const { id } = useParams();
  const [salary, setSalary] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/salaries/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Salary not found');
        return res.json();
      })
      .then(data => {
        setSalary(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!salary) return <div className="p-8 text-center">No data found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Salary Details</h2>
      <div className="mb-4">
        <strong>Employee ID:</strong> {salary.employeeId}<br/>
        <strong>Month:</strong> {salary.month}<br/>
        <strong>Year:</strong> {salary.year}<br/>
        <strong>Basic Salary:</strong> {salary.basicSalary}<br/>
        <strong>Net Salary:</strong> {Number(salary.netSalary).toFixed(2)}<br/>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-blue-600 mb-2">Allowances</h3>
        <ul className="list-disc pl-6">
          {salary.allowances && Object.entries(salary.allowances).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-blue-600 mb-2">Overtime</h3>
        <ul className="list-disc pl-6">
          {salary.overtime && Object.entries(salary.overtime).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-blue-600 mb-2">Deductions</h3>
        <ul className="list-disc pl-6">
          {salary.deductions && Object.entries(salary.deductions).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>
      <button className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ViewSalary;
