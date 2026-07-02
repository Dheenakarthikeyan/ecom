import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [20, "Max 20 characters only"],
      minlength: [3, "Min 3 characters only"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Min 8 characters only"],
      select: false,
    },

    // Single Avatar
 avatar: {
  public_id: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
},

    role: {
      type: String,
      default: "User",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

});

// JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Verify Password
userSchema.methods.verifyPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Reset Password Token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", userSchema);