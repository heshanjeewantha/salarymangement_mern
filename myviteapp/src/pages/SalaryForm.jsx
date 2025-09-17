import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const initialSalary = {
  employeeId: '',
  month: '',
  year: '',
  basicSalary: '',
  allowances: {
    transport: '',
    meal: '',
    medical: '',
    other: ''
  },
  overtime: {
    normalDayHours: '',
    holidayHours: ''
  },
  deductions: {
    loan: '',
    insurance: '',
    other: ''
  }
};

const SalaryForm = () => {
  const [salary, setSalary] = useState(initialSalary);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // ...existing code...

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [group, field] = name.split('.');
      setSalary({
        ...salary,
        [group]: {
          ...salary[group],
          [field]: value
        }
      });
    } else {
      setSalary({ ...salary, [name]: value });
    }
  };

  // Create or update salary
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
  const url = editingId ? `http://localhost:5000/api/salaries/${editingId}` : 'http://localhost:5000/api/salaries';
  // Convert relevant fields to numbers
  const salaryToSend = {
    ...salary,
    year: Number(salary.year),
    basicSalary: Number(salary.basicSalary),
    allowances: {
      transport: Number(salary.allowances.transport),
      meal: Number(salary.allowances.meal),
      medical: Number(salary.allowances.medical),
      other: Number(salary.allowances.other)
    },
    overtime: {
      normalDayHours: Number(salary.overtime.normalDayHours),
      holidayHours: Number(salary.overtime.holidayHours)
    },
    deductions: {
      loan: Number(salary.deductions.loan),
      insurance: Number(salary.deductions.insurance),
      other: Number(salary.deductions.other)
    }
  };
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(salaryToSend)
  });
    if (res.ok) {
      setSalary(initialSalary);
      setEditingId(null);
      
      setTimeout(() => {
        navigate('/salary-table');
      }, 3000);
    }
  };

  // Edit salary
  const handleEdit = (s) => {
  setSalary(s);
  setEditingId(s._id);
  };

  // ...existing code...

  return (
    <Layout>

      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Salary CRUD Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Employee ID</label>
              <input name="employeeId" value={salary.employeeId} onChange={handleChange} placeholder="Employee ID" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Month</label>
              <select name="month" value={salary.month} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select Month</option>
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Year</label>
              <select name="year" value={salary.year} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select Year</option>
                {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Basic Salary</label>
              <input name="basicSalary" value={salary.basicSalary} onChange={handleChange} placeholder="Basic Salary" required type="number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Allowances</h4>
              <input name="allowances.transport" value={salary.allowances.transport} onChange={handleChange} placeholder="Transport" type="number" className="w-full mb-2 px-4 py-2 border rounded-lg" />
              <input name="allowances.meal" value={salary.allowances.meal} onChange={handleChange} placeholder="Meal" type="number" className="w-full mb-2 px-4 py-2 border rounded-lg" />
              <input name="allowances.medical" value={salary.allowances.medical} onChange={handleChange} placeholder="Medical" type="number" className="w-full mb-2 px-4 py-2 border rounded-lg" />
              <input name="allowances.other" value={salary.allowances.other} onChange={handleChange} placeholder="Other" type="number" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Overtime</h4>
              <input name="overtime.normalDayHours" value={salary.overtime.normalDayHours} onChange={handleChange} placeholder="Normal Day Hours" type="number" className="w-full mb-2 px-4 py-2 border rounded-lg" />
              <input name="overtime.holidayHours" value={salary.overtime.holidayHours} onChange={handleChange} placeholder="Holiday Hours" type="number" className="w-full mb-2 px-4 py-2 border rounded-lg" />
              {/* Only normalDayHours and holidayHours needed for overtime */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Deductions</h4>
              <input name="deductions.loan" value={salary.deductions.loan} onChange={handleChange} placeholder="Loan" type="number" className="w-full mb-2 px-4 py-2 border rounded-lg" />
              {/* Only loan, insurance, other needed for deductions */}
              <input name="deductions.insurance" value={salary.deductions.insurance} onChange={handleChange} placeholder="Insurance" type="number" className="w-full mb-2 px-4 py-2 border rounded-lg" />
              <input name="deductions.other" value={salary.deductions.other} onChange={handleChange} placeholder="Other" type="number" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            {/* Net Salary is calculated in backend, no input needed */}
          </div>
          <div className="flex space-x-4 justify-center mt-6">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">{editingId ? 'Update' : 'Create'}</button>
            {editingId && <button type="button" onClick={() => { setSalary(initialSalary); setEditingId(null); }} className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500 transition">Cancel</button>}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SalaryForm;
