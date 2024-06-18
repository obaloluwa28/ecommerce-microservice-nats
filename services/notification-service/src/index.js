const express = require("express");
const app = express();
const { connectNATS, getJetStream } = require("./src/natsClient");
const { StringCodec } = require("nats");

app.use(express.json());

connectNATS().then(async () => {
  const js = getJetStream();
  const sc = StringCodec();
  const sub = await js.subscribe("orders.created", { deliver_policy: "all" });

  for await (const m of sub) {
    const order = JSON.parse(sc.decode(m.data));
    console.log(`Sending notification for order: ${order.orderId}`);
    // Send email/SMS logic here
    m.ack();
  }

  const PORT = process.env.PORT || 3004;
  app.listen(PORT, () => {
    console.log(`Notification service listening on port ${PORT}`);
  });
});
