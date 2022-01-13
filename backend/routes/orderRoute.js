const express = require("express");
const { newOrder, myOrders, updateOrder, getAllOrders, deleteOrder } = require("../controllers/orderController");
const { getSingleUser } = require("../controllers/userController");
const router = express.Router();

const  { isAuthenticatedUser , authorizeRoles } = require('../middleware/auth');

router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route("/order/:id").get(isAuthenticatedUser,getSingleUser);

router.route("/order/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(getAllOrders,isAuthenticatedUser,authorizeRoles("admin"));

router.route("/admin/order/:id").put(updateOrder,isAuthenticatedUser,authorizeRoles("admin"));

router.route("/admin/order/:id").get(deleteOrder,isAuthenticatedUser,authorizeRoles("admin"));

module.exports = router;