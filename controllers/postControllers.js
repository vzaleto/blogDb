const Post = require('../models/Post');
const Tag = require('../models/Tag');

exports.createPost = async (req, res) => {
    const {title, content, image, tags, fullContent} = req.body;
    try {
        const post = await Post.create({title, content, image, fullContent});
        if (tags && tags.length > 0) {
            const tagIds = await Promise.all(
                tags.map(async (tagName) => {
                    const [tag] = await Tag.findOrCreate({where: {name: tagName}})
                    return tag
                })
            )
            await post.addTags(tagIds)
        }
        res.status(201).json(post)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to create post'})
    }
}

exports.getPosts = async (req, res) => {
    try{
        const posts = await Post.findAll({
            include:Tag
        })
        res.status(200).json(posts)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Failed to get posts'})
    }
}

exports.getPostById = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findByPk(id, {
            include:Tag
        })
        res.status(200).json(post)
    }catch (err){
        console.error(err)
        res.status(500).json({error: 'Failed to get post'})
    }

}