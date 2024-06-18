const { getJetStream } = require("../natsClient");
const StringCodec = require("nats").StringCodec();

const createOrder = async (req, res) => {
  const js = getJetStream();
  const orderData = req.body;

  await js.publish(
    "orders.created",
    StringCodec.encode(JSON.stringify(orderData))
  );
  res.status(201).send({ message: "Order created", data: orderData });
};

module.exports = { createOrder };
