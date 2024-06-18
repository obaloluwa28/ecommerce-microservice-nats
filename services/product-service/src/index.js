const express = require("express");
const app = express();
const productRoutes = require("./src/routes/productRoutes");
const { connectNATS } = require("./src/natsClient");

app.use(express.json());
app.use("/products", productRoutes);

connectNATS().then(() => {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Product service listening on port ${PORT}`);
  });
});
