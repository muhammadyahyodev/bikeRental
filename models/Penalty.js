const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')
const Penalty = sequelize.define("penalty", {
    penalty_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    } ,
    rental_id: {type: DataTypes.INTEGER, allowNull: false},
    penalty_amount: {type: DataTypes.DECIMAL},
    payment_status: {type: DataTypes.BOOLEAN},
    remarks: {type: DataTypes.STRING},
    paid_by: {type: DataTypes.STRING},
    user_id: {type: DataTypes.INTEGER, allowNull: false} 
}, {timestamps: false ,freezeTableName: true})

module.exports = Penalty