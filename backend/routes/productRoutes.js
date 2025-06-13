const express = require("express");
const { getAllProducts, getProductById, addProduct, deleteProduct } = require("../controllers/productController");
const upload = require("../middleware/multer");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", adminAuth, upload.single("image"), addProduct);
router.delete("/:id", adminAuth, deleteProduct);

module.exports = router;
