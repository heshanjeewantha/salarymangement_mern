// Salary model for MongoDB (Mongoose)
const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  //employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeId: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  basicSalary: { type: Number, required: true },
  allowances: {
    transport: { type: Number, default: 0 },
    meal: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  overtime: {
    normalDayHours: { type: Number, default: 0 },
    holidayHours: { type: Number, default: 0 },
    normalDayRate: { type: Number, default: 0 },
    holidayRate: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  deductions: {
    loan: { type: Number, default: 0 },
    epf: { type: Number, default: 0 },
    etf: { type: Number, default: 0 },
    insurance: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  netSalary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Salary', SalarySchema);
