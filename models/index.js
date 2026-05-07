const sequelize = require('../config/database')
const Post = require('./Post')
const Tag = require('./Tag')

 // Post.belongsToMany(Tag, {through: 'PostTag', as: 'tags'})
 // Tag.belongsToMany(Post, {through: 'PostTag', as: 'posts'})


Post.belongsToMany(Tag, {
    through: 'PostTag',
    as: 'tags',
    foreignKey: {
        name: 'postId',
        onDelete: 'CASCADE'
    }
});

Tag.belongsToMany(Post, {
    through: 'PostTag',
    as: 'posts',
    foreignKey: {
        name: 'tagId',
        onDelete: 'CASCADE'
    }
});

module.exports = {
    sequelize,
    Post,
    Tag,
}