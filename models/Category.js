const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const Category = sequelize.define('Category',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    slug:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

module.exports = Category;
