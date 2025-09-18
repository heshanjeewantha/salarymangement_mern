import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const initialSalary = {
  employeeId: '',
  month: '',
  year: '',
  basicSalary: '',
  allowances: { transport: '', meal: '', medical: '', other: '' },
  overtime: { normalDayHours: '', holidayHours: '' },
  deductions: { loan: '', insurance: '', other: '' }
};

const SalaryForm = () => {
  const [salary, setSalary] = useState(initialSalary);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [group, field] = name.split('.');
      setSalary({ ...salary, [group]: { ...salary[group], [field]: value } });
    } else {
      setSalary({ ...salary, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `http://localhost:5000/api/salaries/${editingId}` : 'http://localhost:5000/api/salaries';
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
      setTimeout(() => navigate('/salary-table'), 2000);
    }
  };

  const demoEmployeeIds = Array.from({ length: 10 }, (_, i) => `EMP${(i+1).toString().padStart(4, '0')}`);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl mt-10"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-black drop-shadow-sm">
          Salary CRUD Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-black">Employee ID</label>
              <select
                name="employeeId"
                value={salary.employeeId}
                onChange={e => setSalary({ ...salary, employeeId: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              >
                <option value="" disabled>Select Employee ID</option>
                {demoEmployeeIds.map(id => <option key={id} value={id}>{id}</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-black">Month</label>
              <select
                name="month"
                value={salary.month}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              >
                <option value="">Select Month</option>
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-black">Year</label>
              <select
                name="year"
                value={salary.year}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-black">Basic Salary</label>
              <input
                name="basicSalary"
                value={salary.basicSalary}
                onChange={handleChange}
                placeholder="Basic Salary"
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          {/* Allowances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-black mb-2">Allowances</h4>
              {['transport', 'meal', 'medical', 'other'].map(field => (
                <input
                  key={field}
                  name={`allowances.${field}`}
                  value={salary.allowances[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  type="number"
                  className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              ))}
            </div>

            {/* Overtime */}
            <div>
              <h4 className="font-bold text-black mb-2">Overtime</h4>
              {['normalDayHours', 'holidayHours'].map(field => (
                <input
                  key={field}
                  name={`overtime.${field}`}
                  value={salary.overtime[field]}
                  onChange={handleChange}
                  placeholder={field === 'normalDayHours' ? 'Normal Day Hours' : 'Holiday Hours'}
                  type="number"
                  className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              ))}
            </div>
          </div>

          {/* Deductions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-black mb-2">Deductions</h4>
              {['loan', 'insurance', 'other'].map(field => (
                <input
                  key={field}
                  name={`deductions.${field}`}
                  value={salary.deductions[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  type="number"
                  className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-4 justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold text-white shadow transform hover:-translate-y-1 transition-all duration-300"
            >
              {editingId ? 'Update' : 'Create'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setSalary(initialSalary); setEditingId(null); }}
                className="bg-gray-400 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold text-white shadow transform hover:-translate-y-1 transition-all duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </Layout>
  );
};

export default SalaryForm;
