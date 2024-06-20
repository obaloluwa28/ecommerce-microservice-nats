const express = require("express");
const app = express();
const orderRoutes = require("./src/routes/orderRoutes");
const { connectNATS } = require("./src/natsClient");
const sequelize = require("./src/config/database");

app.use(express.json());
app.use("/orders", orderRoutes);

connectNATS().then(() => {
  const PORT = process.env.PORT || 3003;

  sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`User service listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
