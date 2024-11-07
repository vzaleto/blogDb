const express = require('express');
const {createPost, getPosts, getPostById} = require('../controllers/postControllers');

const router = express.Router();

router.post('/postCreate', createPost);
router.get('/posts', getPosts);
router.get('/post/:id', getPostById);

module.exports = router;