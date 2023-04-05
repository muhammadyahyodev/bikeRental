const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Bike_category = sequelize.define(
  "bike_category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    category_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
  },
  {timestamps: false, freezeTableName: true }
);

module.exports = Bike_category