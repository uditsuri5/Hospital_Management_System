const express = require('express');
const {addHospital, getAll, search, deleteHospital, editHospital} = require("../controllers/hospitalControllers.js");
const hospitalRouter = express.Router();

hospitalRouter.post("/create", addHospital);

hospitalRouter.get("/getall", getAll);

hospitalRouter.get("/", search);

hospitalRouter.delete("/delete", deleteHospital);

hospitalRouter.put("/edit", editHospital);

module.exports = hospitalRouter;