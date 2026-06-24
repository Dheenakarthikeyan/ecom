import express from "express"

import { addProduct, getAllproduct,singleProduct, updateProduct,deleteProduct, createProductReview, viewProductReview, getAllproductByAdmin, adminDeleteReview } from "../controller/productController.js";

import {verifyUser,roleBasedAccess} from "../helper/userAuth.js"

const router = express.Router();
//UserSide
router.route("/products").get(getAllproduct)
router.route("/products/:id").get(singleProduct)
router.route("/review").put(verifyUser,createProductReview );


//Admin
router.route("/admin/product/create").post(verifyUser,roleBasedAccess("admin"),addProduct);//function chainning
router.route("/products/:id").put(verifyUser,roleBasedAccess("admin"),updateProduct).delete(verifyUser,roleBasedAccess("admin"),deleteProduct);
//ReviewSection
router.route("/admin/products").get(verifyUser,roleBasedAccess("admin"),getAllproductByAdmin);
router.route("/admin/reviews").get(verifyUser,roleBasedAccess("admin"),viewProductReview).delete(verifyUser,roleBasedAccess("admin"),adminDeleteReview)
//DeleteReview

export default router