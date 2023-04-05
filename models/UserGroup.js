const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const UserGroup = sequelize.define("user_group", {
    group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true, 
        autoIncrement: true,
    },
    group_name: {type: DataTypes.STRING(30),allowNull:false},
    description: {type: DataTypes.STRING, },
    allow_add: {type: DataTypes.BOOLEAN, defaultValue: false},
    allow_edit: {type: DataTypes.BOOLEAN, defaultValue: false},
    allow_delete: {type: DataTypes.BOOLEAN, defaultValue: false},
    allow_import: {type: DataTypes.BOOLEAN, defaultValue: false},
    allow_export: {type: DataTypes.BOOLEAN, defaultValue: false}   

}, {timestamps: false ,freezeTableName: true})

module.exports = UserGroup