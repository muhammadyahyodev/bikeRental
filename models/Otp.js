const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Otp = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    otp: { type: DataTypes.STRING(8), allowNull: false },
    expiration_time: { type: DataTypes.DATE, allowNull: false },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Otp;
