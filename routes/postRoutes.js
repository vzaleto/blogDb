const express = require('express');
const {createPost, getPosts, getPostById, getPostByTagName, getTags, searchPosts} = require('../controllers/postControllers');
const {authAdmin} = require("../middleware/authMeddleware");
const {adminLogin} = require("../controllers/authController");

const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/postCreate', authAdmin,  createPost);
router.get('/posts', getPosts);
router.get('/post/:id', getPostById);
router.get('/post/tag/:tagName', getPostByTagName);
router.get('/tags', getTags);

router.get('/post/search', searchPosts);


// router.get('/post/search', (req, res, next) => {
//     console.log("Middleware triggered for /post/search");
//     next();
// }, searchPosts);





module.exports = router;