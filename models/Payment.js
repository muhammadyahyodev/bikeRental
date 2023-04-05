const sequelize = require('../config/db')
const {DataTypes, NOW} = require('sequelize')
const Payment = sequelize.define("payment", {
    payment_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    }, 
    rental_id:{type: DataTypes.INTEGER, allowNull: false}, 
    payment_type:{type: DataTypes.INTEGER,allowNull: false},
    pay_by: {type: DataTypes.STRING,allowNull: false},
    payment_date:{type: DataTypes.DATE, defaultValue: NOW},
    remarks: {type: DataTypes.STRING, },
    user_id:{type: DataTypes.INTEGER, allowNull: false}
},  {timestamps: false ,freezeTableName: true})

module.exports = Payment