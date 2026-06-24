import express from 'express'
import { loginUser, logout, registerUser,forgotPassword,resetPassword, profile, updatePassword, updateProfile, getUser, getSingleUser,updateUserRole,deleteUser} from '../controller/userController.js';
import {roleBasedAccess, verifyUser} from "../helper/userAuth.js"
const router = express.Router();

router.route("/registerUser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forget").post(forgotPassword);
router.route("/password/resetPassword/:token").post(resetPassword);

router.route("/profile").get(verifyUser,profile);
router.route("/password/updatePassword").put(verifyUser,updatePassword);
router.route("/password/updateProfile").put(verifyUser,updateProfile)


router.route("/admin/User").get(verifyUser,roleBasedAccess("admin"),getUser)
router.route("/admin/User/:id").get(verifyUser,roleBasedAccess("admin"),getSingleUser).put(verifyUser,roleBasedAccess("admin"),updateUserRole).delete(verifyUser,roleBasedAccess("admin"),deleteUser);


export default router;