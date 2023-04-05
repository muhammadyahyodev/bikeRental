const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Shopinfo = sequelize.define(
  "shopinfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    shop_name: { type: DataTypes.STRING, unique: true },
    owner_name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING, allowNull: false },
    email_address: { type: DataTypes.STRING, unique: true },
    contact_no: { type: DataTypes.STRING, unique: true },
    website: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.INTEGER },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Shopinfo;
