const inventoryModel = require("../models/inventoryModel");
const mongoose = require('mongoose');
const getBloodGrpDetailsController = async (req, res) => {
    try {
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        const bloodGroups = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
        const bloodGroupDetails = []

        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            //calculate total in 

            const totalIn = await inventoryModel.aggregate(
                [{
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'in',
                        organisation,
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }]
            )

            const totalOut = await inventoryModel.aggregate(
                [{
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'out',
                        organisation,
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }]
            )

            const availableQuantity = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);


            bloodGroupDetails.push({
                bloodGroup,
                totalIn : totalIn[0]?.total || 0,
                totalOut : totalOut[0]?.total || 0,
                availableQuantity
            })


        }))
        return res.status(200).send({
            success: true,
            message: "Blood Group details fetched successfully",
            bloodGroupDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in get blood group details for analytics controller',
            error,
        })
    }
}

module.exports = { getBloodGrpDetailsController };