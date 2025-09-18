import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const UpdateSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/salaries/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          employeeId: data.employeeId,
          month: data.month,
          year: data.year,
          basicSalary: data.basicSalary,
          allowances: { ...data.allowances },
          overtime: { ...data.overtime },
          deductions: { ...data.deductions }
        });
      });
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [group, field] = name.split('.');
      setForm({
        ...form,
        [group]: {
          ...form[group],
          [field]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      year: Number(form.year),
      basicSalary: Number(form.basicSalary),
      allowances: {
        transport: Number(form.allowances.transport),
        meal: Number(form.allowances.meal),
        medical: Number(form.allowances.medical),
        other: Number(form.allowances.other)
      },
      overtime: {
        normalDayHours: Number(form.overtime.normalDayHours),
        holidayHours: Number(form.overtime.holidayHours)
      },
      deductions: {
        loan: Number(form.deductions.loan),
        insurance: Number(form.deductions.insurance),
        other: Number(form.deductions.other)
      }
    };
    await fetch(`http://localhost:5000/api/salaries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    navigate('/salary-table');
  };

  if (!form) return <div className="p-8 text-center text-black">Loading...</div>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Update Salary</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-black">Employee ID</label>
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-black">Month</label>
              <select
                name="month"
                value={form.month}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              >
                <option value="">Select Month</option>
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-black">Year</label>
              <select
                name="year"
                value={form.year}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              >
                <option value="">Select Year</option>
                {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-black">Basic Salary</label>
              <input
                name="basicSalary"
                value={form.basicSalary}
                onChange={handleFormChange}
                required
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>
          </div>

          {/* Allowances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-black mb-2">Allowances</h4>
              <input name="allowances.transport" value={form.allowances.transport} onChange={handleFormChange} placeholder="Transport" type="number" className="w-full mb-2 px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
              <input name="allowances.meal" value={form.allowances.meal} onChange={handleFormChange} placeholder="Meal" type="number" className="w-full mb-2 px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
              <input name="allowances.medical" value={form.allowances.medical} onChange={handleFormChange} placeholder="Medical" type="number" className="w-full mb-2 px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
              <input name="allowances.other" value={form.allowances.other} onChange={handleFormChange} placeholder="Other" type="number" className="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
            </div>

            {/* Overtime */}
            <div>
              <h4 className="font-semibold text-black mb-2">Overtime</h4>
              <input name="overtime.normalDayHours" value={form.overtime.normalDayHours} onChange={handleFormChange} placeholder="Normal Day Hours" type="number" className="w-full mb-2 px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
              <input name="overtime.holidayHours" value={form.overtime.holidayHours} onChange={handleFormChange} placeholder="Holiday Hours" type="number" className="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
            </div>
          </div>

          {/* Deductions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-black mb-2">Deductions</h4>
              <input name="deductions.loan" value={form.deductions.loan} onChange={handleFormChange} placeholder="Loan" type="number" className="w-full mb-2 px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
              <input name="deductions.insurance" value={form.deductions.insurance} onChange={handleFormChange} placeholder="Insurance" type="number" className="w-full mb-2 px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
              <input name="deductions.other" value={form.deductions.other} onChange={handleFormChange} placeholder="Other" type="number" className="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
            </div>
          </div>

          <div className="flex space-x-4 justify-center mt-6">
            <button type="submit" className="bg-blue-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold text-white transition">Update</button>
            <button type="button" onClick={() => navigate('/salary-table')} className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-white transition">Cancel</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateSalary;
