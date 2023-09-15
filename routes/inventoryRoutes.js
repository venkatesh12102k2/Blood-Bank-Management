const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createInventoryController, getInventoryController, getDonarsController, getHospitalsController, getOrgController, getOrgForHospitalController, getInventoryForHospitalController, getRecentInventoryController } = require('../controllers/inventoryController');

const router = express.Router();

//add inventory
router.post('/create-inventory', authMiddleware, createInventoryController)

//get all blood record
router.get('/get-inventory', authMiddleware, getInventoryController);

//get recent inventory
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController);

router.post('/get-inventory-for-hospital', authMiddleware, getInventoryForHospitalController)

//get donar records
router.get('/get-donars', authMiddleware, getDonarsController);

router.get('/get-hospitals', authMiddleware, getHospitalsController);

router.get('/get-organisations', authMiddleware, getOrgController);

router.get('/get-organisations-for-hospital', authMiddleware, getOrgForHospitalController)



module.exports = router