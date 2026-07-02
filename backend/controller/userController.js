import User from "../model/userModel.js";
import HandleError from "../helper/hadleError.js"
import { sendToken } from "../helper/jwtToken.js";
import { sendMail } from "../helper/sendMail.js";
import crypto from "crypto"



export const registerUser = async (req, res) => {
    try {
        const { name, email, password,avatar } = req.body;

        // ✅ Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // ✅ Create user
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: avatar.public_id,
                url: avatar.url
            }
        });

        /*  // ✅ Generate token
          const token = user.getJwtToken();
  
          res.status(201).json({
              success: true,
              user,
              token
          });
  */
        sendToken(user, 201, res)

    } catch (error) {

        // ✅ Handle duplicate key error (backup)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new HandleError("Email or password Enter", 400));


    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new HandleError("Invaild Email or Password ", 401));
    }
    const isvaildPassword = await user.verifyPassword(password);
    if (!isvaildPassword) {

        return next(new HandleError("Invaild Email or  password Enter ", 401));

    }
    const token = user.getJwtToken();
    /*
       
        res.json({ success: true, user,token })


    */


    sendToken(user, 200, res)
}


export const logout = async (req, res, next) => {

    const option = {
        expires: new Date(Date.now()),
        httpOnly: true,
    };

    res.cookie("token", null, option);
    res.status(200).json({ success: true, message: "Successfully Logout" })
}


//reset Password


export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    let user; // ✅ Declare here

    try {
        user = await User.findOne({ email });

        if (!user) {
            return next(
                new HandleError("User does not exist", 400)
            );
        }

        const resetToken = user.createPasswordResetToken();

        await user.save({
            validateBeforeSave: false,
        });

        const resetPasswordURL =
            `${req.protocol}://${req.get("host")}/reset/${resetToken}`;

        const message = `Reset your password using the link below:${resetPasswordURL}The link expires in 30 minutes.If this wasn't you, please ignore this email.
`;

        const htmlStyleEmail = `<div style="font-family: Arial, sans-serif; padding: 20px;"><h2>Password Reset Request</h2><p>Reset your password using the button below:</p>

    <a href="${resetPasswordURL}"
       style="background:#007bff;color:white;padding:10px 20px;
              text-decoration:none;border-radius:5px;">
        Reset Password
    </a>

    <p>The link expires in 30 minutes.</p>

    <p>If you didn't request this, please ignore this email.</p>
</div>
`;

        await sendMail({
            email: user.email,
            subject: "Password Reset Request",
            message,
            htmlMessage: htmlStyleEmail
        });

        return res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (err) {
        console.error(err);

        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({
                validateBeforeSave: false,
            });
        }

        return next(
            new HandleError("Some Server Issues Please Try again forgetPassword", 500)
        );
    }
};




export const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");//decode  original data convert

    console.log(resetPasswordToken);

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(
            new HandleError("Invalid or expired reset token", 400)
        );
    }

    const { password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
        return next(
            new HandleError("Passwords does not match", 400)
        );
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
};

////UserSection
export const profile = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}


export const updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword, confirmpassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const isCorrect = await user.verifyPassword(oldPassword);

    if (!isCorrect) {
        return next(new HandleError("Incorrect old Password", 400))
    }

    if (newPassword !== confirmpassword) {
        return next(new HandleError("Confirm password must be same as new password...", 400))
    }

    user.password = newPassword;
    await user.save();


    sendToken(user, 200, res);
}


export const updateProfile = async (req, res, next) => {
    const { name, email } = req.body;

    const updateUserDetails = { name, email };

    const user = await User.findByIdAndUpdate(req.user.id, updateUserDetails, { new: true, runValidators: true });
    res.status(200).json({
        success: true,
        message: "Profile update Successfully",
        user

    })


}

//adminSection
export const getUser = async (req, res) => {
    const user = await User.find();

    res.status(200).json({
        success: true,
        user
    })
}


export const getSingleUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new HandleError("User does not exist", 400));
    }

    res.status(200).json({
        success: true,
        user
    })


}

export const updateUserRole = async (req, res, next) => {
    const { role } = req.body;
    const id = req.params.id;
    const updateRole = { role };
    const user = await User.findByIdAndUpdate(id, updateRole, { new: true });
    if (!user) {
        return next(new HandleError("User does not exist :", 400));
    }

    res.status(200).json({
        success: true,
        user
    })
}

export const deleteUser = async (req, res, next) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
        return next(new HandleError("User does not exit", 400));
    }

    await User.findByIdAndDelete(user);

    res.status(200).json({
        success: true,
        message: "User details Successfully Deleted "
    })


}