const express = require('express');
const {createPost, getPosts, getPostById, getPostByTagName, getTags} = require('../controllers/postControllers');

const router = express.Router();

router.post('/postCreate', createPost);
router.get('/posts', getPosts);
router.get('/post/:id', getPostById);
router.get('/post/tag/:tagName', getPostByTagName);
router.get('/tags', getTags);
module.exports = router;