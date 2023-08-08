const Product = require("../model/productSchema");

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      message: "product registered successfully",
      savedProduct,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let data;
    if (qNew) {
      data = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      data = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      data = Product.find();
      res.status(200).json({
        Length: data.length,
        data,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getOneProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await Product.findById({ _id });
    if (!data) throw new Error("Product not found");
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Product.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "Product updated successfully", data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
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
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
