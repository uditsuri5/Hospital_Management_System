require('dotenv').config(); // Load environment variables
require("./config/db.js"); // Ensure database connection setup

const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const hospitalRouter = require('./routes/hospitalRoutes.js');
const verifyToken = require('./middlewares/verifyToken.js');

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Allow all origins, adjust as needed

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hospitals", hospitalRouter);

app.use(verifyToken);

app.get("/", (req, res) => {
    res.send("App is running.........");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});