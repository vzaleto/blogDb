const Post = require('../models/Post');
const Tag = require('../models/Tag');
const {Op} = require("sequelize");

exports.createPost = async (req, res) => {
    const {title, content, image, tags, fullContent} = req.body;
    console.log(req.body)
    try {
        const post = await Post.create({title, content, image, fullContent});

        if (tags && tags.length > 0) {

            const tagIds = await Promise.all(
                tags.map(async (tagName) => {
                    const [tag] = await Tag.findOrCreate({where: {name: tagName.name}})
                    return tag.id
                })
            )
            //  await postCard.update({ tags: tagIds });
            // await postCard.sav-[[e();
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

            include: [{model: Tag, as: 'tags'}]
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
                }
            ]
        })
        res.status(200).json(post)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to get postCard'})
    }

}



exports.searchPosts = async (req, res) => {
    const { query } = req.query;
    console.log('Received query:', query);

    if (!query) {
        return res.status(400).json({ error: 'Query is empty' });
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
            include: [{ model: Tag, as: 'tags' }],
        });

        console.log('Filtered posts:', posts);

        if (posts.length === 0) {
            // return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error in searchPosts:', err);
        res.status(500).json({ error: 'Failed to search posts' });
    }
};
