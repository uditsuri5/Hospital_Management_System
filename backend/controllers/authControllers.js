const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const getUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email });
    return user;
};

const generateJWTtoken = (obj) => {
    const token = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: obj,
        },
        process.env.JWT_SECRET_KEY
    );
    return token;
};

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid email or password",
                data: {},
            });
        }

        const user = await getUserByEmail(email);

        if (user) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists",
                data: {},
            });
        }

        const newUser = await UserModel.create({ name, email, password });
        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                }
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "fail",
            message: "Internal server error",
            data: err,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid email or password",
                data: {},
            });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid user",
                data: {},
            });
        }

        const isCorrect = await user.verifyPassword(password, user.password);

        if (!isCorrect) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid password",
                data: {},
            });
        }

        return res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token: generateJWTtoken({ id: user._id, email: user.email }),
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "fail",
            message: "Internal server error",
            data: err,
        });
    }
};

module.exports = { signUp, login };
