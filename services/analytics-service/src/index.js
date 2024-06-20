const express = require("express");
const app = express();
const analyticsRoutes = require("./src/routes/analyticsRoutes");
const { connectNATS, getJetStream } = require("./src/natsClient");
const { StringCodec } = require("nats");
const AnalyticsEvent = require("./src/models/analyticsModel");
const sequelize = require("./src/config/database");

app.use(express.json());
app.use("/analytics", analyticsRoutes);

connectNATS().then(async () => {
  const js = getJetStream();
  const sc = StringCodec();
  const sub = await js.subscribe("orders.created", { deliver_policy: "all" });

  for await (const m of sub) {
    const order = JSON.parse(sc.decode(m.data));
    console.log(`Tracking analytics for order: ${order.orderId}`);
    await AnalyticsEvent.create({
      eventType: "orderCreated",
      eventData: order,
    });
    m.ack();
  }

  const PORT = process.env.PORT || 3005;
  sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Analytics service listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
