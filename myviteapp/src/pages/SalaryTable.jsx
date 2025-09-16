import React, { useEffect, useState } from 'react';

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/salaries')
      .then(res => res.json())
      .then(data => setSalaries(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Salary Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4 border-b text-left">Employee ID</th>
              <th className="py-3 px-4 border-b text-left">Month</th>
              <th className="py-3 px-4 border-b text-left">Year</th>
              <th className="py-3 px-4 border-b text-left">Basic Salary</th>
              <th className="py-3 px-4 border-b text-left">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {salaries.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">No salary records found.</td>
              </tr>
            ) : (
              salaries.map(s => (
                <tr key={s._id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-4 border-b">{s.employeeId}</td>
                  <td className="py-2 px-4 border-b">{s.month}</td>
                  <td className="py-2 px-4 border-b">{s.year}</td>
                  <td className="py-2 px-4 border-b">{s.basicSalary}</td>
                  <td className="py-2 px-4 border-b">{s.netSalary}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryTable;
