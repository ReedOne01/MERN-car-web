const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      throw new Error("user not authorized");
    const _token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.decode(_token, process.env.JWT_SECRET_KEY);

    if (decode === null) throw new Error("Invalid authorization");
    if (!decode.id) throw new Error("token not valid");

    const { id } = decode;
    const authenticatedUser = await User.findById(id).select("-__V");
    req.user = authenticatedUser;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyTokenAndAuthorize = async (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "You are not allowed to do this!!!",
      error: error,
    });
  }
};
const verifyTokenAndAdmin = async (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "You are not allowed to do this!!!",
      error: error,
    });
  }
};

module.exports = { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin };
