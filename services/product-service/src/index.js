const express = require("express");
const app = express();
const productRoutes = require("./src/routes/productRoutes");
const { connectNATS } = require("./src/natsClient");
const sequelize = require("./src/config/database");

app.use(express.json());
app.use("/products", productRoutes);

connectNATS().then(() => {
  const PORT = process.env.PORT || 3002;

  sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Product service listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
