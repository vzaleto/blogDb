const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')


const Post = sequelize.define('Post', {
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    fullContent:{
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})


module.exports = Post
