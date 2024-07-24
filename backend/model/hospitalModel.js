const mongoose = require("mongoose");
const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cityLower: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    specialities: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});


const hospitalModel = mongoose.model("Hospitals", hospitalSchema);

module.exports = hospitalModel;