const { connect } = require("nats");

let nc;
let js;

const connectNATS = async () => {
  nc = await connect({ servers: "nats://localhost:4222" });
  js = nc.jetstream();
};

const getJetStream = () => js;

module.exports = { connectNATS, getJetStream };
