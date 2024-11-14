const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')


const Tag = sequelize.define('Tag', {
    name:{
        type: DataTypes.STRING,
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})



module.exports = Tag

