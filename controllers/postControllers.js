const Post = require('../models/Post');
const Tag = require('../models/Tag');

exports.createPost = async (req, res) => {
    const {title, content, image, tags, fullContent} = req.body;
    console.log(req.body)
    try {
        const post = await Post.create({title, content, image, fullContent});
        console.log(post)
        if (tags && tags.length > 0) {
            const tagIds = await Promise.all(
                tags.map(async (tagName) => {
                    const [tag] = await Tag.findOrCreate({where: {name: tagName.name}})
                    return tag.id
                })
            )
            console.log('TagsID' + tagIds)
            //  await post.update({ tags: tagIds });
            // await post.save();
              await post.addTags(tagIds);
        }
        res.status(201).json(post)
    } catch (err) {
        console.error("eee",err)
        res.status(500).json({error: 'Failed to create post'})
    }
}

exports.getPosts = async (req, res) => {
    try{
        const posts = await Post.findAll({

            include: [{model: Tag, as: 'tags'}]
        })


        res.status(200).json(posts)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Failed to get posts'})
    }
}

exports.getPostByTagName = async (req, res) => {
    const {tagName} = req.params;
    try{
        const posts = await Post.findAll({
            include: [{model: Tag, where: {name: tagName}, attributes: ['name']}]
        })
        res.status(200).json(posts)
    }catch(error){
        res.status(500).json({error: 'Failed to get PostByTagName'})
    }
}
exports.getTags = async (req, res) => {
    try{
        const tags = await Tag.findAll();
        res.status(200).json(tags)
    }catch(error){
        res.status(500).json({error: 'Failed to get tags'})
    }

}

exports.getPostById = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findByPk(id, {
            include:[Tag]
        })
        res.status(200).json(post)
    }catch (err){
        console.error(err)
        res.status(500).json({error: 'Failed to get post'})
    }

}