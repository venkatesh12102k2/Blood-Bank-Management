const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getBloodGrpDetailsController } = require('../controllers/analyticsController');


const router = express.Router();


router.get('/get-bloodGroup-details', authMiddleware, getBloodGrpDetailsController)


module.exports = router