import express from "express";

import { roleBasedAccess, verifyUser } from "../helper/userAuth.js";

import {createNewOrder,getOrderDetails,getAllOrders,myOrders, deleteOrder,updateOrderStatus } from "../controller/orderController.js"

const router = express.Router();

//orderSideDetails
router.route("/new/order").post(verifyUser,createNewOrder)
router.get("/order/:id", verifyUser, getOrderDetails);
router.get("/orders/me", verifyUser, myOrders);
//admin
router.get("/admin/orders", verifyUser,roleBasedAccess("admin"), getAllOrders);
router.route("/admin/order/:id").delete(verifyUser,roleBasedAccess("admin"),deleteOrder).put(verifyUser,roleBasedAccess("admin"),updateOrderStatus);

export default router