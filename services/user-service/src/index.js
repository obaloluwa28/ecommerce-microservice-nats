const express = require("express");
const app = express();
const userRoutes = require("./src/routes/userRoutes");
const { connectNATS } = require("./src/natsClient");
const sequelize = require("./src/config/database");

app.use(express.json());
app.use("/users", userRoutes);

connectNATS().then(() => {
  const PORT = process.env.PORT || 3001;

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
