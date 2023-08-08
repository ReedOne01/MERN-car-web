const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middleware/authMiddleware");
const {
  register,
  login,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  userStats,
} = require("../controller/authController");

router.get("/", getAllUsers);
router.get("/stats", userStats);
router.get("/find/:id", verifyToken, verifyTokenAndAdmin, getOneUser);
router.post("/signup", register);
router.post("/login", login);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, verifyTokenAndAdmin, deleteUser);
router.get("/stats", verifyToken, verifyTokenAndAdmin, userStats);

module.exports = router;
