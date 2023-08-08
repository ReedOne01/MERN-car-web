const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");

// Token generation using JWT
const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

// function to validat email address
const isEmailValid = async (email) => {
  return emailValidator.validate(email);
};

// create a new user
const register = async (req, res) => {
  try {
    const { email, password, name, lastname, username } = req.body;
    if (
      !name ||
      !lastname ||
      !username ||
      !email ||
      !password
      // !confirmPassword
    )
      throw new Error("please fill in the required fields");
    // const { valid, reason, validators } = await isEmailValid(email);
    // if (!valid)
    //   return res.status(400).send({
    //     message: "please enter a valid email address",
    //     reason: validators[reason].reason,
    //   });
    // if (password === !confirmPassword)
    //   throw new Error(
    //     "Your password must be the same as your confirm password"
    //   );
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("user already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user registered successfully",
      token: await generateToken(newUser._id),
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

//login user
const login = async (req, res) => {
  try {
    console.log("login tested okay ");
  } catch (error) {
    res.status(404).json(error);
  }
};
// get all users and perfom some pagination
const getAllUsers = async (req, res) => {
  try {
    const query = req.query.new;

    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({
      length: users.length,
      users,
    });
    console.log(users);
  } catch (error) {
    res.status(404).json(error);
  }
  console.log("all users gotten");
};

// get a one user
const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error("You must provide a user ID");
    const user = await User.findOne({ id: _id });
    if (!user) throw new Error("No user found with id " + id);
    res.status(200).json({
      message: "user login successfully",
      data: user,
    });
    console.log("testing get one user ");
  } catch (error) {
    res.status(404).json(error);
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const { _id } = req.params.id;
    const data = await User.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "user updated successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//Delete user
const deleteUser = (req, res) => {
  try {
    console.log("delete tested okay ");
  } catch (error) {
    res.status(404).json(error);
  }
};

// get user stats
const userStats = async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
      { $match: { $createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "createdAT" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  userStats,
};
