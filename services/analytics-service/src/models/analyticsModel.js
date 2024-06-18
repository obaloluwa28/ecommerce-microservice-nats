const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AnalyticsEvent = sequelize.define("AnalyticsEvent", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventData: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = AnalyticsEvent;
