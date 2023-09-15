const express = require('express');
const { getDonarsListController, getHospitalListController, getOrgListController, deleteDonarController, deleteHospitalController, deleteOrgController } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


const router = express.Router();

router.get('/donar-list', authMiddleware, adminMiddleware, getDonarsListController)

router.get('/hospital-list', authMiddleware, adminMiddleware, getHospitalListController)

router.get('/org-list', authMiddleware, adminMiddleware, getOrgListController)

// ==============================================================================================

router.delete('/delete-donar/:id', authMiddleware, adminMiddleware, deleteDonarController);

router.delete('/delete-hospital/:id', authMiddleware, adminMiddleware, deleteHospitalController);

router.delete('/delete-org/:id', authMiddleware, adminMiddleware, deleteOrgController);

module.exports = router