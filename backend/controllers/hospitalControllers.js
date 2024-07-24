const hospitalModel = require("../model/hospitalModel.js");


const addHospital = async (req, res) => {
    try {
        const { name, cityLower, imageUrl, specialities, rating } = req.body;
        if (!name || !cityLower || !specialities || !rating) {
            res.status(400).json({
                status: "fail",
                message: "All fields are required",
                data: {},
            });
            return;
        }

        const newHospital = await hospitalModel.create({
            name,
            cityLower,
            imageUrl,
            specialities,
            rating,
        });
        res.status(201).json({
            status: "success",
            message: "Hospital added successfully",
            data: {
                hospital: newHospital,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Internal server error",
            data: err,
        });
    }
};

const getAll = async (req, res) => {
    try {
        const hospitals = await hospitalModel.find();
        res.status(200).json({
            status: "success",
            message: "Hospitals fetched successfully",
            data: {
                hospitals,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Internal server error",
            data: err,
        });
    }
};

const search = async (req, res) => {
    try {
        const { city } = req.query;
        const hospitals = await hospitalModel.find({ cityLower: city });
        res.status(200).json({
            status: "success",
            message: "Hospitals fetched successfully",
            data: {
                hospitals,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Internal server error",
            data: err,
        });
    }
};

const deleteHospital = async (req, res) => {
    try {

        console.log("deleteHospital")
        const { id } = req.query;
        console.log(id);

        const deletedHospital = await hospitalModel.findByIdAndDelete(id);

        if (!deletedHospital) {
            return res.status(404).json({
                status: "fail",
                message: "Hospital not found",
            });
        }

        console.log(deletedHospital);
        res.status(200).json({
            status: "success",
            message: "Hospital deleted successfully",
            data: {
                hospital: deletedHospital,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Internal server error",
            data: err.message,
        });
    }
};


const editHospital = async (req, res) => {
    try {
        let { name, cityLower, imageUrl, specialities, rating, id } = req.body;

        if (imageUrl.length == 0 || imageUrl == "") {
            imageUrl = "https://res.cloudinary.com/dxecoctrm/image/upload/v1721512038/wrxlpqozimsuy4nftvrh.png"
        }


        if (!name || !cityLower || !specialities || !rating) {
            res.status(400).json({
                status: "fail",
                message: "All fields are required",
                data: {},
            });
            return;
        }
        const newHospital = await hospitalModel.findByIdAndUpdate(id, {
            name,
            cityLower,
            imageUrl,
            specialities,
            rating
        })
        res.status(201).json({
            status: "success",
            message: "Hospital Edited successfully",
            data: {
                hospital: newHospital,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Internal server error",
            data: err,
        });
    }
};


module.exports = {
    addHospital, getAll, search, deleteHospital,
    editHospital
} 