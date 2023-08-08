const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
} = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.delete("/:id", deleteProduct);
router.post("/", verifyToken, verifyTokenAndAdmin, createProduct);
router.patch("/:id", verifyTokenAndAuthorize, updateProduct);

module.exports = router;
