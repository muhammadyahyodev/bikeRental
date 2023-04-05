const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')
const Bike_info = sequelize.define("bike_info", {
    bike_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    bike_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,      
    },
    bike_name: {
        type: DataTypes.STRING,
        allowNull: false,    
    },
    specsification: {type: DataTypes.STRING},
    rent_price: {type: DataTypes.DECIMAL, allowNull: false},
    availibility: {type: DataTypes.BOOLEAN, allowNull:false},
    user_id: {type: DataTypes.INTEGER, allowNull: false,},

},
{timestamps: false, freezeTableName: true})

module.exports = Bike_info