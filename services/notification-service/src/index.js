const express = require("express");
const app = express();
const notificationRoutes = require("./src/routes/notificationRoutes");
const { connectNATS, getJetStream } = require("./src/natsClient");
const { StringCodec } = require("nats");
const Notification = require("./src/models/notificationModel");
const sequelize = require("./src/config/database");

app.use(express.json());
app.use("/notifications", notificationRoutes);

connectNATS().then(async () => {
  const js = getJetStream();
  const sc = StringCodec();
  const sub = await js.subscribe("orders.created", { deliver_policy: "all" });

  for await (const m of sub) {
    const order = JSON.parse(sc.decode(m.data));
    console.log(`Sending notification for order: ${order.orderId}`);
    await Notification.create({
      orderId: order.orderId,
      message: "Order created notification",
    });
    // Add actual notification sending logic here
    m.ack();
  }

  const PORT = process.env.PORT || 3004;
  sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Notification service listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
