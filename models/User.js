const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    fullname: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    user_category_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false},
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = User;
