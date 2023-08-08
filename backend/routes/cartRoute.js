const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
} = require("../middleware/authMiddleware");
const {
  createCart,
  getAllCarts,
  getOneCart,
  updateCart,
  deleteCart,
} = require("../controller/cartController");

router.get("/", getAllCarts);
router.get("/find/:userId", verifyToken, getOneCart);
router.delete("/find/:id", verifyToken, verifyTokenAndAuthorize, deleteCart);
router.post("/", verifyToken, createCart);
router.patch("/:id", verifyTokenAndAuthorize, updateCart);

module.exports = router;
