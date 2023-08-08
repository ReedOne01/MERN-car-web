const authRoute = require("./routes/authRoute");
const productsRoutes = require("./routes/productsRoutes");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");
const paymentRoute = require("./routes/stripePaymentRoute");

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");

require("dotenv").config();
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use(mongoSanitize());
app.use("/api/auth", authRoute);
app.use("/api/product", productsRoutes);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/payment", paymentRoute);

//handling routes errors
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: ` cannot get ${req.originalUrl} on this server`,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`sever listening on ${port}`);
});
