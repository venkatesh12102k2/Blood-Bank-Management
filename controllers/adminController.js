const userModel = require('../models/userModel')

const getDonarsListController = async (req, res) => {
    try {
        const donarList = await userModel.find({ role: "donar" }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            totalCount: donarList.length,
            message: "Donars List fetched successfully",
            donarList
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Admin / Get Donars List  API",
            error
        })
    }
}

const getHospitalListController = async (req, res) => {
    try {
        const hosList = await userModel.find({ role: "hospital" }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            totalCount: hosList.length,
            message: "Hoapital List fetched successfully",
            hosList
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Admin / Get Hospital List  API",
            error
        })
    }
}

const getOrgListController = async (req, res) => {
    try {
        const orgList = await userModel.find({ role: "organisation" }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            totalCount: orgList.length,
            message: "Organisation List fetched successfully",
            orgList
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Admin / Get Organisation List  API",
            error
        })
    }
}

// ========================================================================================================

const deleteDonarController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Donar Record Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Delete Donar API",
            error
        })
    }
}

const deleteHospitalController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Hospital Record Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Delete Hospital API",
            error
        })
    }
}

const deleteOrgController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Organisation Record Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Delete Organisation API",
            error
        })
    }
}

module.exports = { getDonarsListController, getOrgListController, getHospitalListController , deleteDonarController, deleteHospitalController, deleteOrgController}