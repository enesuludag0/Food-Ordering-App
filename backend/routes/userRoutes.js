const express = require("express");
const {
  signupUser,
  loginUser,
  adminLogin,
  getUserInfo,
  updateUser,
  updatePassword
} = require("../controllers/userController");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/admin", adminLogin);

router.get("/profile", userAuth, getUserInfo);
router.put("/update", userAuth, updateUser);
router.put("/update-password", userAuth, updatePassword);

module.exports = router;
