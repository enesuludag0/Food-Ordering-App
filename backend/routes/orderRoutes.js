const express = require("express");
const {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  cancelOrder,
  allOrders,
  userOrders,
  getOrderDetails,
  getAdminOrderDetails,
  updateOrderStatus
} = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

// admin
router.get("/allorders", adminAuth, allOrders);
router.get("/allorders/:id", adminAuth, getAdminOrderDetails);
router.put("/status/:id", adminAuth, updateOrderStatus);

// user
router.post("/cash", userAuth, placeOrder);
router.post("/stripe", userAuth, placeOrderStripe);
router.post("/verifyStripe", userAuth, verifyStripe);
router.get("/userorders", userAuth, userOrders);
router.get("/userorders/:id", userAuth, getOrderDetails);

module.exports = router;
