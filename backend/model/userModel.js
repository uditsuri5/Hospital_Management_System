const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
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

userSchema.methods.verifyPassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    }else{
        next();
    }
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;