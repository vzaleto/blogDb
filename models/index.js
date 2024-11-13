const sequelize = require('../config/database')
const Post = require('./Post')
const Tag = require('./Tag')

Post.belongsToMany(Tag, {through: 'PostTag', as: 'tags'})
Tag.belongsToMany(Post, {through: 'PostTag', as: 'posts'})


module.exports = {
    sequelize,
    Post,
    Tag,

}