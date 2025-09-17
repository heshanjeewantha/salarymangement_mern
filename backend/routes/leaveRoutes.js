const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/create', leaveController.createLeave);
router.get('/', leaveController.getLeaves);
router.get('/:id', leaveController.getLeaveById);
router.put('/:id', leaveController.updateLeave);
router.delete('/:id', leaveController.deleteLeave);

module.exports = router;
