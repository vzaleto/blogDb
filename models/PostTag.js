const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')
const Post = require('./Post')
const Tag = require('./Tag')

const PostTag = sequelize.define('PostTag', {}, {timestamps: true})

Post.belongsToMany(Tag, {through: PostTag})
Tag.belongsToMany(Post, {through: PostTag})

module.exports = PostTag