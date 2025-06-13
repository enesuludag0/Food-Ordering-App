const express = require("express");
const {
  getUserCart,
  addToCart,
  updateCart,
  clearCart
} = require("../controllers/cartController");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.get("/", userAuth, getUserCart);
router.post("/", userAuth, addToCart);
router.put("/:id", userAuth, updateCart);
router.delete("/", userAuth, clearCart);

module.exports = router;
