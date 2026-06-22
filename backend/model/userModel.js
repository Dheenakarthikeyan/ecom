import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [20, "Max 20 characters only"],
        minLength: [3, "Min 3 characters only"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false,
        minLength: [8, "Min 8 characters only"]
    },
    avatar: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    role: {
        type: String,
        default: "User"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });


// ✅ Hash password
userScheme.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});


// ✅ JWT Token userScheme.methods customer model
userScheme.methods.getJwtToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};


userScheme.methods.verifyPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}



userScheme.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");//ligthsecurly

    this.resetPasswordToken = crypto
        .createHash("sha256")//algorithm encryresttoken convert algorthm
        .update(resetToken)
        .digest("hex");//this format use morethan securly unique encode store

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;//30min

    return resetToken;
};

export default mongoose.model("User", userScheme);