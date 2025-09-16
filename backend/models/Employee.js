// Employee model for MongoDB (Mongoose)
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  department: { type: String },
  position: { type: String },
  workTime: { type: String, default: '9-5' },
  loan: {
    amount: { type: Number, default: 0 },
    monthlyDeduction: { type: Number, default: 0 },
    remainingBalance: { type: Number, default: 0 }
  },
  allowances: {
    transport: { type: Number, default: 0 },
    meal: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  deductions: {
    tax: { type: Number, default: 0 },
    epf: { type: Number, default: 0 },
    etf: { type: Number, default: 0 },
    insurance: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
