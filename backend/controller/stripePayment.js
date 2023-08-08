const stripe = require("stripe")(process.env.STRIPE_KEY);

const makePayment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeResp) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeResp);
      }
    }
  );
};

module.exports = makePayment;
