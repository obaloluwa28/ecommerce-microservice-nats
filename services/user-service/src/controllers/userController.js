const { getJetStream } = require("../natsClient");
const User = require("../models/userModel");
const { StringCodec } = require("nats");

const registerUser = async (req, res) => {
  const js = getJetStream();
  const userData = req.body;

  try {
    const user = await User.create(userData);
    await js.publish(
      "users.registered",
      StringCodec.encode(JSON.stringify(user))
    );
    res.status(201).send({ message: "User registered", data: user });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error registering user", error: error.message });
  }
};

module.exports = { registerUser };
