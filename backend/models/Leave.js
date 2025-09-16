const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    leaveType: { 
        type: String, 
        required: true,
        enum: ['Sick', 'Casual', 'Earned', 'Maternity', 'Paternity', 'Unpaid'] // Added enum for leaveType
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leave', LeaveSchema);
