import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const navigate = useNavigate();

  // Export salaries as Excel
  const handleExport = () => {
    if (!salaries.length) return;
    
    // Prepare the data
    const headers = [
      'Employee ID',
      'Month',
      'Year',
      'Basic Salary',
      // Allowances
      'Transport Allowance',
      'Meal Allowance',
      'Medical Allowance',
      'Other Allowance',
      'Total Allowances',
      // Overtime
      'Normal Day Hours',
      'Holiday Hours',
      'Total Overtime',
      // Deductions
      'Loan Deduction',
      'Insurance Deduction',
      'Other Deduction',
      'Total Deductions',
      'Net Salary'
    ];

    const rows = salaries.map(s => {
      const allowances = s.allowances || {};
      const overtime = s.overtime || {};
      const deductions = s.deductions || {};
      
      const totalAllowances = Object.values(allowances).reduce((sum, val) => sum + (Number(val) || 0), 0);
      const totalOvertime = Object.values(overtime).reduce((sum, val) => sum + (Number(val) || 0), 0);
      const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + (Number(val) || 0), 0);
      
      return [
        s.employeeId,
        s.month,
        s.year,
        Number(s.basicSalary).toFixed(2),
        // Allowances
        Number(allowances.transport || 0).toFixed(2),
        Number(allowances.meal || 0).toFixed(2),
        Number(allowances.medical || 0).toFixed(2),
        Number(allowances.other || 0).toFixed(2),
        totalAllowances.toFixed(2),
        // Overtime
        Number(overtime.normalDayHours || 0).toFixed(2),
        Number(overtime.holidayHours || 0).toFixed(2),
        totalOvertime.toFixed(2),
        // Deductions
        Number(deductions.loan || 0).toFixed(2),
        Number(deductions.insurance || 0).toFixed(2),
        Number(deductions.other || 0).toFixed(2),
        totalDeductions.toFixed(2),
        Number(s.netSalary).toFixed(2)
      ];
    });

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // Set column widths
    const colWidths = [
      { wch: 15 }, // Employee ID
      { wch: 10 }, // Month
      { wch: 8 },  // Year
      { wch: 12 }, // Basic Salary
      // Allowances
      { wch: 15 }, // Transport
      { wch: 15 }, // Meal
      { wch: 15 }, // Medical
      { wch: 15 }, // Other Allowance
      { wch: 15 }, // Total Allowances
      // Overtime
      { wch: 15 }, // Normal Day Hours
      { wch: 15 }, // Holiday Hours
      { wch: 15 }, // Total Overtime
      // Deductions
      { wch: 15 }, // Loan
      { wch: 15 }, // Insurance
      { wch: 15 }, // Other Deduction
      { wch: 15 }, // Total Deductions
      { wch: 12 }  // Net Salary
    ];
    ws['!cols'] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Salary Report');

    // Generate Excel file
    XLSX.writeFile(wb, 'salary_report.xlsx');
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/salaries')
      .then(res => res.json())
      .then(data => setSalaries(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this salary record?')) {
      await fetch(`http://localhost:5000/api/salaries/${id}`, { method: 'DELETE' });
      setSalaries(salaries.filter(s => s._id !== id));
    }
  };

  const handleEdit = (salary) => {
    navigate(`/salary/update/${salary._id}`);
  };

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
    await fetch(`http://localhost:5000/api/salaries/${editingSalary}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setEditingSalary(null);
    setForm(null);
    // Refresh list
    fetch('http://localhost:5000/api/salaries')
      .then(res => res.json())
      .then(data => setSalaries(data));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Salary Records</h2>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition" onClick={() => navigate('/salary')}>Create</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition" onClick={handleExport}>Export Report</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4 border-b text-left">Employee ID</th>
              <th className="py-3 px-4 border-b text-left">Month</th>
              <th className="py-3 px-4 border-b text-left">Year</th>
              <th className="py-3 px-4 border-b text-left">Basic Salary</th>
              <th className="py-3 px-4 border-b text-left">Net Salary</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">No salary records found.</td>
              </tr>
            ) : (
              salaries.map(s => (
                <tr key={s._id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-4 border-b">{s.employeeId}</td>
                  <td className="py-2 px-4 border-b">{s.month}</td>
                  <td className="py-2 px-4 border-b">{s.year}</td>
                  <td className="py-2 px-4 border-b">{s.basicSalary}</td>
                  <td className="py-2 px-4 border-b">{Number(s.netSalary).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => navigate(`/salary/view/${s._id}`)}>View</button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(s)}>Update</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
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
