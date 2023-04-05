const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")

const Token = sequelize.define("token", {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    }  ,
    token_owner_id: {type: DataTypes.INTEGER, allowNull: false, },
    token: {type: DataTypes.STRING(300), allowNull: false},

}, {freezeTableName: true})

module.exports = Token