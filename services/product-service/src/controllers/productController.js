const { getJetStream } = require("../natsClient");
const StringCodec = require("nats").StringCodec();

const updateInventory = async (req, res) => {
  const js = getJetStream();
  const productId = req.params.id;
  const quantity = req.body.quantity;

  // Assume inventory is updated successfully
  const inventoryUpdateEvent = { productId, quantity };
  await js.publish(
    "products.inventoryUpdated",
    StringCodec.encode(JSON.stringify(inventoryUpdateEvent))
  );
  res
    .status(200)
    .send({ message: "Inventory updated", data: inventoryUpdateEvent });
};

module.exports = { updateInventory };
