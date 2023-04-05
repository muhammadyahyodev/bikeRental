const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')
const Rental = sequelize.define("rental", {
    rental_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    bike_id: {type:DataTypes.INTEGER, allowNull:false},
    client_id: {type: DataTypes.INTEGER, allowNull: false},
    rental_start_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    rental_end_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    total_amaount: {type: DataTypes.DECIMAL},
    payment_status: {type: DataTypes.BOOLEAN, defaultValue: false},
    rental_status: {type: DataTypes.BOOLEAN, defaultValue: false},
    remarks: {type: DataTypes.STRING},
    user_id: {type: DataTypes.INTEGER},
}, {timestamps: true ,freezeTableName: true})

module.exports = Rental