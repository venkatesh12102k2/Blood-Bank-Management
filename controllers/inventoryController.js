const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('User Not Found');
        }
        if (inventoryType === 'in' && user.role !== 'donar') {
            throw new Error('Not a Donar');
        }
        if (inventoryType === 'out' && user.role !== 'hospital') {
            throw new Error('Not a Hospital');
        }

        if (req.body.inventoryType === 'out') {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId);

            const totalInOfBloodRequested = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'in',
                        bloodGroup: requestedBloodGroup,
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' },
                    }
                }
            ])
            // console.log(totalInOfBloodRequested);
            const totalIn = totalInOfBloodRequested[0]?.total || 0;
            const totalOutOfBloodRequested = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'out',
                        bloodGroup: requestedBloodGroup,
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' },
                    }
                }
            ])
            const totalOut = totalOutOfBloodRequested[0]?.total || 0;

            const availableQuantityOfBlood = totalIn - totalOut;

            if (availableQuantityOfBlood < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBlood}ML of ${requestedBloodGroup.toUpperCase()} is available`
                })
            }

            req.body.hospital = user?._id;

        }
        else {
            req.body.donar = user?._id;
        }

        const inventory = new inventoryModel(req.body);
        await inventory.save();

        return res.status(201).send({
            success: true,
            message: 'New Blood record created',
            inventory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            // message: 'Error in createInventoryController',
            message: error.message?error.message:((req.body.inventoryType === "in") ? "Enter a valid Donar Email" : "Enter a valid Hospital Email"),
            error
        })
    }
}

const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ organisation: req.body.userId })
            .populate('donar')
            .populate('hospital')
            .sort({ createdAt: -1 });
        ;
        return res.status(200).send({
            success: true,
            message: 'Successfully Got the inventory',
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in get inventory controller',
            error
        })
    }
}

const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ organisation: req.body.userId }).limit(5).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "Recent inventory record fetched successfully",
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in get recent inventoty controllert",
            error
        })
    }
}

const getInventoryForHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find(req.body.filters)
            .populate('donar')
            .populate('hospital')
            .populate('organisation')
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: 'Successfully Got the inventory for hospital',
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in get inventory for hospital controller',
            error
        })
    }
}


//get donar record
const getDonarsController = async (req, res) => {
    try {
        const organisation = req.body.userId;

        //find donars
        const donarId = await inventoryModel.distinct("donar", {
            organisation,
        })
        // console.log(donarId);

        const donars = await userModel.find({ _id: { $in: donarId } })
        return res.status(200).send({
            success: true,
            message: "Donar record fetched sucessfully",
            donars
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get donars",
            error
        })
    }
}

const getHospitalsController = async (req, res) => {
    try {
        const organisation = req.body.userId;
        const hospitalId = await inventoryModel.distinct('hospital', { organisation });
        const hospitals = await userModel.find({
            _id: { $in: hospitalId },
        })
        return res.status(200).send({
            success: true,
            message: "Hospitals Record Fetched Successfully",
            hospitals,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: true,
            message: "Error in Get Hospitals Controller",
            error
        })
    }
}

const getOrgController = async (req, res) => {
    try {
        const donar = req.body.userId;
        const orgId = await inventoryModel.distinct("organisation", { donar });
        const organisations = await userModel.find({
            _id: { $in: orgId },
        })
        return res.status(200).send({
            success: true,
            message: "Organisation record fetched successfully",
            organisations,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Get Org API",
            error
        })
    }
}

const getOrgForHospitalController = async (req, res) => {
    try {
        const hospital = req.body.userId;
        const orgId = await inventoryModel.distinct("organisation", { hospital });
        const organisations = await userModel.find({
            _id: { $in: orgId },
        })
        return res.status(200).send({
            success: true,
            message: "Organisation record For Hospital fetched successfully",
            organisations,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Get Org For hospital API",
            error
        })
    }
}

module.exports = { createInventoryController, getInventoryController, getDonarsController, getHospitalsController, getOrgController, getOrgForHospitalController, getInventoryForHospitalController, getRecentInventoryController }