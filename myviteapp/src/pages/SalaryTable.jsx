import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const navigate = useNavigate();

  const handleExport = () => {
    if (!salaries.length) return;

    const headers = ["Employee ID", "Month", "Year", "Basic Salary", "Net Salary"];
    const rows = salaries.map((s) => [
      s.employeeId,
      s.month,
      s.year,
      Number(s.basicSalary).toFixed(2),
      Number(s.netSalary).toFixed(2),
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws["!cols"] = [
      { wch: 15 },
      { wch: 10 },
      { wch: 8 },
      { wch: 12 },
      { wch: 12 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salary Report");
    XLSX.writeFile(wb, "salary_report.xlsx");
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/salaries")
      .then((res) => res.json())
      .then((data) => setSalaries(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this salary record?")) {
      await fetch(`http://localhost:5000/api/salaries/${id}`, { method: "DELETE" });
      setSalaries(salaries.filter((s) => s._id !== id));
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className="max-w-5xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">
              Salary Records
            </h2>
            <div className="flex gap-3">
              <button
                className="px-5 py-2 rounded-lg font-medium text-black bg-gray-300 shadow hover:bg-gray-400 active:scale-95 transition"
                onClick={() => navigate("/salary")}
              >
                ➕ Create
              </button>
              <button
                className="px-5 py-2 rounded-lg font-medium text-black bg-gray-300 shadow hover:bg-gray-400 active:scale-95 transition"
                onClick={handleExport}
              >
                📤 Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Employee ID</th>
                  <th className="py-3 px-4 border-b text-left">Month</th>
                  <th className="py-3 px-4 border-b text-left">Year</th>
                  <th className="py-3 px-4 border-b text-left">Basic Salary</th>
                  <th className="py-3 px-4 border-b text-left">Net Salary</th>
                  <th className="py-3 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {salaries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-black"
                      >
                        No salary records found.
                      </td>
                    </tr>
                  ) : (
                    salaries.map((s) => (
                      <motion.tr
                        key={s._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="py-2 px-4 border-b text-black">{s.employeeId}</td>
                        <td className="py-2 px-4 border-b text-black">{s.month}</td>
                        <td className="py-2 px-4 border-b text-black">{s.year}</td>
                        <td className="py-2 px-4 border-b text-black">{s.basicSalary}</td>
                        <td className="py-2 px-4 border-b text-black">{Number(s.netSalary).toFixed(2)}</td>
                        <td className="py-2 px-4 border-b flex gap-2">
                          <button
                            className="px-3 py-1 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
                            onClick={() => navigate(`/salary/view/${s._id}`)}
                          >
                            View
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
                            onClick={() => navigate(`/salary/update/${s._id}`)}
                          >
                            Update
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
                            onClick={() => handleDelete(s._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SalaryTable;
