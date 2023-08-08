const Cart = require("../model/cartSchema");

const createCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(201).json({
      message: "cart created successfully",
      savedCart,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getOneCart = async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await Cart.findOne({ userId: _id });
    if (!data) throw new Error("Product not found");
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateCart = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Cart.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Cart updated successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const deleteCart = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Product.findByIdAndDelete({ _id });
    if (!data) throw new Error(`Product with id ${_id} is not found`);
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getOneCart,
  updateCart,
  deleteCart,
};
