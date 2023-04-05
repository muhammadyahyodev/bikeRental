const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Client = sequelize.define(
  "client",
  {
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    otp_id: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    client_name: { type: DataTypes.STRING(30), allowNull: false },
    email_address: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
    },
    contact_number: { type: DataTypes.STRING(15), unique: true },
    complete_address: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING(30), allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Client;
