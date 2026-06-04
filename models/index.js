const sequelize = require('../config/database')
const Post = require('./Post')
const Tag = require('./Tag')
const Category = require('./Category')
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

Category.hasMany(Post, {
        foreignKey: 'categoryId',
        as: 'posts',
        onDelete: 'SET NULL'
    }
);
Post.belongsTo(Category, {
        foreignKey: 'categoryId',
        onDelete: 'SET NULL',
        as: 'category'
    }
);
module.exports = {
    sequelize,
    Post,
    Tag,
    Category
}