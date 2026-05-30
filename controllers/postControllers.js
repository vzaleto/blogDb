// const Post = require('../models/Post');
// const Tag = require('../models/Tag');
const {Post, Tag, sequelize, Category} = require('../models');
const {Op} = require("sequelize");
const multer = require("multer");


exports.createPost = async (req, res) => {
    console.log(req.body)
    const {title, content, tags, fullContent, categoryId} = req.body;
    console.log(req.files)
    const image = req.files?.image?.[0]?.filename || null;
    const cardImages = req.files?.cardImage || [];

    const tagsParsed = tags ? JSON.parse(tags) : [];
    const uniqTags = [...new Map(tagsParsed.map(tag => [tag.name, tag])).values()]
    const fullContentParsed = fullContent ? JSON.parse(fullContent) : [];
    const fullContentWithImage = fullContentParsed.map((item, index) => ({
        ...item,
        image: cardImages[index]?.filename || null
    }))

    try {
        const post = await Post.create({title, content, image, categoryId, fullContent: fullContentWithImage});

        if (tagsParsed && tagsParsed.length > 0) {

            const tagIds = await Promise.all(
                uniqTags.map(async (tagName) => {
                    const [tag] = await Tag.findOrCreate({where: {name: tagName.name}})
                    return tag.id
                })
            )
            await post.addTags(tagIds);
        }
        res.status(201).json(post)
    } catch (err) {
        console.error("eee", err)
        res.status(500).json({error: 'Failed to create postCard'})
    }
}


exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({

            include: [
                {model: Tag, as: 'tags'},
                {model: Category, as: 'category'}
            ]
        })

        res.status(200).json(posts)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to get posts'})
    }
}

exports.getPostByTagName = async (req, res) => {
    const {tagName} = req.params;
    console.log(tagName)
    try {
        const posts = await Post.findAll({
            include: [{model: Tag, as: 'tags', where: {name: tagName}, required: true}]
        })
        if (posts.length === 0) {
            return res.status(404).json({error: 'Post not found'})
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error: 'Failed to get PostByTagName'})
    }
}

exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json({error: 'Failed to get tags'})
    }

}

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Tag,
                    as: 'tags'
                },
                {
                    model: Category,
                    as: 'category'
                }
            ]
        })
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.status(200).json(post)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to get postCard'})
    }

}


exports.searchPosts = async (req, res) => {
    console.log('Received query:', req.query);
    const {query} = req.query;
    console.log('Received query:', query);

    if (!query) {
        return res.status(400).json({error: 'Query is empty'});
    }

    try {
        const posts = await Post.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${query}%`,
                        },
                    },
                    {
                        content: {
                            [Op.like]: `%${query}%`,
                        },
                    },
                ],
            },
            include: [{model: Tag, as: 'tags'}],
        });

        if (posts.length === 0) {
            // return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error in searchPosts:', err);
        res.status(500).json({error: 'Failed to search posts'});
    }
};

exports.deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const deletePost = await Post.destroy({where: {id}});
        await Tag.destroy({
            where: {
                id: {
                    [Op.notIn]: sequelize.literal(
                        '(SELECT DISTINCT tagId FROM PostTag)'
                    )
                }
            }
        });
        if (deletePost) {
            res.json({id})
        } else {
            res.status(404).send("Post or Tag not found");
        }

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
exports.updatePost = async (req, res) => {
    console.log(req.body)
    const {id} = req.params;
    console.log(req.params)
    const {title, content, tags, fullContent, categoryId} = req.body;
    const tagParsed = tags ? JSON.parse(tags) : [];
    const uniqTags = [...new Map(tagParsed.map(tag => [tag.name, tag])).values()];
    const image = req.files?.image?.[0]?.filename || null;
    const cardImages = req.files?.cardImage || [];

    const fullContentParsed = fullContent ? JSON.parse(fullContent) : [];

    let imageIndex = 0;
    const fullContentWithImage = fullContentParsed.map((elem)=>{
        if(elem.image === "_NEW_IMAGE_"){
            const newImage = cardImages[imageIndex]?.filename || null;
            imageIndex++;
            return{
                ...elem,
                image:newImage
            }
        }
        return elem;
    })


    const tagInstances = await Promise.all(
        uniqTags.map(async (tag) => {
                const [tagItem] = await Tag.findOrCreate({
                    where: {name: tag.name},
                })
                return tagItem
            }
        )
    )

    const post = await Post.findByPk(id, {
        include: [{model: Tag, as: 'tags'}]
    });
    if (!post) {
        return res.status(404).json({error: 'Post not found'});
    }


    post.title = title;
    if (image) {
        post.image = image;
    }
    post.content = content;
    post.categoryId = categoryId;
    post.fullContent = fullContentWithImage;

    await post.setTags(tagInstances);
    await post.save();
res.json({post})
}