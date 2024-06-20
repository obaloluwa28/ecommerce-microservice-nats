const AnalyticsEvent = require("../models/analyticsModel");

const getAnalytics = async (req, res) => {
  try {
    const events = await AnalyticsEvent.findAll();
    res.status(200).send({ data: events });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error retrieving analytics events",
        error: error.message,
      });
  }
};

module.exports = { getAnalytics };
