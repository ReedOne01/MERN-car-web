const Order = require("../model/orderSchema");

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json({
      message: "order created successfully",
      savedOrder,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getUserOrder = async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await Order.find({ userId: _id });
    if (!data) throw new Error("Or der not found");
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Order.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Order updated successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Order.findByIdAndDelete({ _id });
    if (!data) throw new Error(`Order with id ${_id} is not found`);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// stats for monthly income
const stats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { $createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "createdAt" } }, sales: "$amount" },
      {
        $group: {
          _id: $month,
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getUserOrder,
  updateOrder,
  deleteOrder,
  stats,
};
