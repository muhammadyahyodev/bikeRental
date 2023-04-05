const sequelize = require("../config/db");
const { DataTypes, NOW } = require("sequelize");
// const Shopinfo = require('./Shopinfo')
// const User = require('./User')
const AdsManagement = sequelize.define("ads_management", {
    ads_id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true,
    },
        ad_name: {type: DataTypes.STRING, allowNull: false},
        shop_id: {type: DataTypes.INTEGER, allowNull: false},
        banner_image: {type: DataTypes.STRING, },
        description: {type: DataTypes.STRING,},
        start_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
        end_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
        ad_location: {type: DataTypes.STRING, },
        amount: {type: DataTypes.DECIMAL, allowNull: false},
        user_id: {type: DataTypes.INTEGER, allowNull: false},
    },
{timestamps: false, freezeTableName: true,})

module.exports = AdsManagement
