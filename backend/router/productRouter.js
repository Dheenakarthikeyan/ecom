import express from "express"

import { addProduct, getAllproduct,singleProduct, updateProduct,deleteProduct, createProductReview } from "../controller/productController.js";

import {verifyUser,roleBasedAccess} from "../helper/userAuth.js"

const router = express.Router();
//UserSide
router.route("/products").get(getAllproduct)
router.route("/products/:id").get(singleProduct)
//router.route("/review").put(verifyUser,createProductReview );
//User Review

//Admin
router.route("/admin/product/create").post(verifyUser,roleBasedAccess("admin"),addProduct);//function chainning

router.route("/products/:id").put(verifyUser,roleBasedAccess("admin"),updateProduct).delete(verifyUser,roleBasedAccess("admin"),deleteProduct);

//AdminViewAllProduct

//ViewReview

//DeleteReview

export default router