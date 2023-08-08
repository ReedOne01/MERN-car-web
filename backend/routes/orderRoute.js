const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
} = require("../middleware/authMiddleware");
const {
  stats,
  createOrder,
  updateOrder,
  getUserOrder,
  getAllOrders,
  deleteOrder,
} = require("../controller/orderController");

router.get("/", getAllOrders);
router.get("/find/:userId", verifyToken, getUserOrder);
router.delete("/find/:id", verifyToken, verifyTokenAndAuthorize, deleteOrder);
router.post("/", verifyToken, createOrder);
router.patch("/:id", verifyTokenAndAuthorize, updateOrder);
router.patch("/:id", verifyTokenAndAuthorize, stats);

module.exports = router;
