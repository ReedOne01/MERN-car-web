const makePayment = require("../controller/stripePayment");

const router = require("express").Router();

router.post("/", makePayment);

module.exports = router;
